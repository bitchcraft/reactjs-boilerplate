version:
	git describe > ./static/version

install:
	npm set progress false && npm install -q

run: version install
	NODE_ENV=development WEBPACK_HOT=true DEBUG=* node --max_old_space_size=4096 server/index.js
