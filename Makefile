# remove bootstrap & popper.js when migrated to new site
build:
	rm -rf dist
	mkdir -p dist/js dist/css
	cp node_modules/scoutstrap/dist/js/bootstrap.bundle.min.js dist/js/
	cp node_modules/popper.js/dist/umd/popper.min.js dist/js/
	cp node_modules/scoutstrap/dist/css/scoutstrap.min.css dist/css/
	cp node_modules/js-yaml/dist/js-yaml.min.js dist/js/
	cp node_modules/@fortawesome/fontawesome-free/js/fontawesome.min.js dist/js/
	cp -pR node_modules/\@fortawesome/fontawesome-free/webfonts dist/
	cp favicon.ico dist/
	cp -pR *.html js css assets dist/
	npx @tailwindcss/cli -m -i css/style.css -o dist/css/style.css

all:
	$(MAKE) prep
	$(MAKE) build

prep:
	npm ci

serve: all
	cd dist && python3 -m http.server --bind 0.0.0.0
