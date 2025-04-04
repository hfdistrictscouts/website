# remove bootstrap & popper.js when migrated to new site
build:
	cp node_modules/scoutstrap/dist/js/bootstrap.bundle.min.js dist/js/
	cp node_modules/popper.js/dist/umd/popper.min.js dist/js/
	cp node_modules/scoutstrap/dist/css/scoutstrap.min.css dist/css/
	cp node_modules/js-yaml/dist/js-yaml.min.js dist/js/
	cp -pR *.html js assets dist/

all:
	$(MAKE) prep
	$(MAKE) build

prep:
	npm ci
	rm -rf dist
	mkdir -p dist/css dist/js

serve: all
	cd dist && python3 -m http.server --bind 0.0.0.0
