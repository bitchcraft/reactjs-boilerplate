install:
	npm set progress false && npm install -q

run: install
	NODE_ENV=development WEBPACK_HOT=true DEBUG=server:* node --max_old_space_size=4096 server/index.js
	npm set progress true
