fetch('/assets/news.yml')
    .then(body => body.text())
    .then(text => {
	let doc = jsyaml.load(text);
	console.log(doc);
	doc.forEach(item => {
	    let div=document.createElement('div');
	    div.className="news-card bg-white rounded-lg overflow-hidden shadow-md border border-gray-100";
	    let img=item.img || "https://images.unsplash.com/photo-1601758003122-53c40e686a19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
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
	    document.getElementById('featuredNews').appendChild(div);
	});
    });
