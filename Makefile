all: prep
	cp node_modules/scoutstrap/dist/js/bootstrap.bundle.min.js dist/js/
	cp node_modules/popper.js/dist/umd/popper.min.js dist/js/
	cp node_modules/scoutstrap/dist/css/scoutstrap.min.css dist/css/
	cp index.html dist/

prep:
	npm ci
	rm -rf dist
	mkdir -p dist/css dist/js

serve: all
	cd dist && python3 -m http.server
