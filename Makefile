bundle: install
	NODE_ENV=production ./node_modules/webpack/bin/webpack.js --progress
	cp ./static/index.html ./build/index.html

install:
	yarn install

run: install
	NODE_ENV=development WEBPACK_HOT=true DEBUG=server:* node --max_old_space_size=4096 server/index.js
