build:
	rm -rf dist
	mkdir -p dist/js dist/css
	cp node_modules/jquery/dist/jquery.min.js dist/js/
	cp node_modules/js-yaml/dist/js-yaml.min.js dist/js/
	cp node_modules/@fortawesome/fontawesome-free/js/fontawesome.min.js dist/js/
	cp node_modules/@lottiefiles/lottie-player/dist/lottie-player.js dist/js/
	cp -pR node_modules/\@fortawesome/fontawesome-free/webfonts dist/
	cp -pR favicon.ico icons dist/
	cp -pR *.html ads.txt js css assets dist/
	npx @tailwindcss/cli -m -i css/style.css -o dist/css/style.css

all:
	$(MAKE) prep
	$(MAKE) build

prep:
	npm ci

serve: all
	cd dist && python3 -m http.server --bind 0.0.0.0
