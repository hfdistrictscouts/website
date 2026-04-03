fetch('/assets/news.yml?' + Math.random())
    .then(body => body.text())
    .then(text => {
	const featuredNews = document.getElementById('featuredNews');
	if(!featuredNews) {
	    return;
	}
	const doc = jsyaml.load(text);
	
	doc.forEach(item => {
	    let div=document.createElement('div');
	    div.className="news-card bg-white rounded-lg overflow-hidden shadow-md border border-gray-100";
	    let img=item.img || "/assets/photo-1539017058502-e1879b961419.jpg";
	    let imgAlt = item.imgAlt || "News Item";
	    let content = `
<img src="${img}" alt="${imgAlt}" class="w-full h-48 object-cover">
<div class="p-6">
  <div class="text-purple-600 text-sm font-semibold mb-2">${item.date}</div>
  <h3 class="text-xl font-bold mb-3">${item.title}</h3>
  <p class="mb-4">${item.text}</p>
  ${item.link ? `<a href="${item.link}" class="text-purple-600 hover:text-purple-800 font-medium">Read more →</a>` : ''}
</div>`;
	    div.innerHTML = content;
	    featuredNews.appendChild(div);
	});
    });
