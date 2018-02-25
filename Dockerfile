# ----- Base image -----
from node:carbon-alpine as base

# Add common deps
RUN apk add --update git

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy dependencies manifests
COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/


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
COPY .babelrc /usr/src/app/
COPY --from=bundler /usr/src/app/build/* /usr/src/app/static/
COPY ./common /usr/src/app/common
COPY ./server /usr/src/app/server

# Install app dependencies
RUN yarn install --production

# Expose and run
EXPOSE 3000

CMD [ "node", "--max_old_space_size=4096", "server/index.js" ]
