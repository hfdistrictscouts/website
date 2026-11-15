(function () {
    const GA_ID = 'G-JRRKT961MZ';
    const KEY = 'analytics-consent';

    function stored() {
	try { return localStorage.getItem(KEY); } catch (e) { return null; }
    }

    function store(value) {
	try { localStorage.setItem(KEY, value); } catch (e) {}
    }

    function loadAnalytics() {
	window.dataLayer = window.dataLayer || [];
	window.gtag = function () { dataLayer.push(arguments); };
	gtag('js', new Date());
	gtag('config', GA_ID);
	const s = document.createElement('script');
	s.async = true;
	s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
	document.head.appendChild(s);
    }

    function deleteAnalyticsCookies() {
	const domain = location.hostname.replace(/^www\./, '');
	document.cookie.split(';').map(c => c.split('=')[0].trim()).filter(n => n.startsWith('_ga')).forEach(name => {
	    ['', '; domain=' + domain, '; domain=.' + domain].forEach(d => {
		document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + d;
	    });
	});
    }

    function showBanner() {
	if (document.getElementById('cookie-banner')) return;
	const banner = document.createElement('div');
	banner.id = 'cookie-banner';
	banner.setAttribute('role', 'dialog');
	banner.setAttribute('aria-label', 'Cookie consent');
	banner.className = 'fixed bottom-0 inset-x-0 z-50 scout-black text-white p-4 shadow-md';
	banner.innerHTML =
	    '<div class="container mx-auto flex flex-col md:flex-row items-center gap-4">' +
	    '<p class="flex-1">We would like to use Google Analytics cookies to understand how visitors use this site. They are only set if you accept. You can change your mind at any time via "Cookie settings" at the bottom of the page.</p>' +
	    '<div class="flex gap-2">' +
	    '<button type="button" data-consent="denied" class="px-4 py-2 border border-white rounded">Reject</button>' +
	    '<button type="button" data-consent="granted" class="px-4 py-2 border border-white rounded">Accept</button>' +
	    '</div></div>';
	banner.addEventListener('click', e => {
	    const choice = e.target.dataset.consent;
	    if (!choice) return;
	    store(choice);
	    banner.remove();
	    if (choice === 'granted') loadAnalytics();
	});
	document.body.appendChild(banner);
    }

    document.addEventListener('DOMContentLoaded', () => {
	const consent = stored();
	if (consent === 'granted') loadAnalytics();
	else if (consent !== 'denied') showBanner();

	document.querySelectorAll('[data-cookie-settings]').forEach(link => link.addEventListener('click', e => {
	    e.preventDefault();
	    const wasGranted = stored() === 'granted';
	    try { localStorage.removeItem(KEY); } catch (e) {}
	    deleteAnalyticsCookies();
	    if (wasGranted) location.reload();
	    else showBanner();
	}));
    });
})();
