from node:boron-alpine as bundler

# Add native deps
#RUN apk add --update make git python gcc g++
RUN apk add --update make git python g++

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
RUN make bundle-js


from node:boron-alpine

# Add native deps
RUN apk add --update git

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV NODE_ENV=production

# Install app dependencies
COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/
RUN yarn install --production

# Add bundle and server
COPY --from=bundler /usr/src/app/build/* /usr/src/app/static/
COPY ./common /usr/src/app/common
COPY ./server /usr/src/app/server

EXPOSE 3000

CMD [ "node", "--max_old_space_size=4096", "server/index.js" ]
