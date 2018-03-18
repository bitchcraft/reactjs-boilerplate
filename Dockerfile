# ----- Base image -----
from node:carbon-alpine as base

# Add common deps and handle SIGTERMs
RUN apk add --update git tini
ENTRYPOINT ["/sbin/tini", "--"]

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy dependencies manifests
COPY package.json /usr/src/client/
COPY yarn.lock /usr/src/client/


# ----- Create App Bundle -----
from base as bundler

# Add additional native deps required for build
RUN apk add python

# Install app dependencies
RUN yarn install

# Add app source
COPY . /usr/src/app

# Bundle app
RUN yarn run bundle-js


# ----- Create Release -----
from base

ENV NODE_ENV=production

# Add bundle and server
COPY .babelrc /usr/src/client/
COPY --from=bundler /usr/src/client/build/* /usr/src/client/static/
COPY ./common /usr/src/client/common
COPY ./server /usr/src/client/server

# Install app dependencies
RUN yarn install --production

# Expose and run
EXPOSE 3000

CMD [ "node", "--max_old_space_size=4096", "server/index.js" ]
