API_ENDPOINT = '//localhost:3000'
COMMIT_HASH = $(shell git rev-parse HEAD)
DIRNAME = $(shell basename `git rev-parse --show-toplevel`)

bundle-js: install
	NODE_ENV=production ./node_modules/webpack/bin/webpack.js --progress

bundle: bundle-js test
	cp ./static/index.html ./build/index.html

install:
	yarn install

test:
	yarn run jest

run: install test
	NODE_ENV=development WEBPACK_HOT=true API_ENDPOINT=${API_ENDPOINT} DEBUG=server:* node --max_old_space_size=4096 server/index.js

docker:
	docker build --no-cache -t ${DIRNAME}:${COMMIT_HASH} .
