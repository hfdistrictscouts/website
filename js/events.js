fetch('/assets/events.yml?' + Math.random())
    .then(body => body.text())
    .then(text => {
	const featuredEvents = document.getElementById('featuredEvents');
	if(!featuredEvents) {
	    return;
	}
	const doc = jsyaml.load(text);
	doc.forEach(item => {
	    let div=document.createElement('div');
	    div.className="bg-white p-6 rounded-lg shadow-md";
	    let content = `
  <div class="text-purple-600 text-sm font-semibold mb-2">${item.date}</div>
    <h3 class="text-xl font-bold mb-3">${item.title || 'Untitled Event'}</h3>
    <p class="mb-4">${item.text}</p>
    ${item.link ? `<a href="${item.link}" class="text-purple-600 hover:text-purple-800 font-medium">More info →</a>` : ''}
  </div>
	 `;
	    div.innerHTML = content;
	    featuredEvents.appendChild(div);
	});
    });
