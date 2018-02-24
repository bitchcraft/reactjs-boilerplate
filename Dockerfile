from node:carbon-alpine as bundler

# Add native deps
RUN apk add --update git python

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/
RUN yarn install

# Add app source
COPY . /usr/src/app

# Bundle app
RUN yarn run bundle-js


from node:boron-alpine

# Add native deps
RUN apk add --update git

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV NODE_ENV=production

# Add bundle and server
COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/
COPY .babelrc /usr/src/app/
COPY --from=bundler /usr/src/app/build/* /usr/src/app/static/
COPY ./common /usr/src/app/common
COPY ./server /usr/src/app/server

# Install app dependencies
RUN yarn install --production

# Expose and run
EXPOSE 3000

CMD [ "node", "--max_old_space_size=4096", "server/index.js" ]
