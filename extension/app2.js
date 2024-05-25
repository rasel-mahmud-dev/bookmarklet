(function() {
    const scriptUrl = 'https://raw.githubusercontent.com/rasel-mahmud-dev/bookmarklet/main/extension/dist/bundle.js';
    fetch(scriptUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(scriptContent => {
            const scriptElement = document.createElement('script');
            scriptElement.type = 'application/javascript';
            scriptElement.text = scriptContent;
            document.body.appendChild(scriptElement);
        })
        .catch(error => {
            console.error('Failed to load script:', error);
        });
})();