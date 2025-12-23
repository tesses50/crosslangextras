
(function(){
    const vscode = acquireVsCodeApi();
   
    const searchbtn = document.getElementById('searchbtn');
    const query = document.getElementById('query');
    const body = document.getElementById('packages');
    const prevPage = document.getElementById('prevPage');
    const currentPage = document.getElementById('currentPage');
    const nextPage = document.getElementById('nextPage');
    var page = 1;
    
    if(searchbtn)
    searchbtn.onclick = ()=>{
        page = 1;
        currentPage.innerText = "1";
        vscode.postMessage(
            {command: 'query', query: query.value, page: 1},
        );
    };
    if(prevPage)
    prevPage.onclick = ()=>{
        page--;
        if(page < 1) page=1;
        currentPage.innerText = page.toString();
        vscode.postMessage(
            {command: 'query', query: query.value, page: page},
        );
    };
    if(nextPage)
    nextPage.onclick = ()=>{
        page++;
        currentPage.innerText = page.toString();
        vscode.postMessage(
            {command: 'query', query: query.value, page: page},
        );
    };


    window.addEventListener('message', event => {
        const message = event.data; // The json data that the extension sent
        switch (message.command) {
            case "searchResponse":
            {
                body.innerHTML = "";
                
                for(var i = 0; i < message.packages.length; i++)
                {
                    const pkg = message.packages[i];
                    const node = document.createElement('div');
                    node.classList.add('package');
                    const img = document.createElement('img');
                    img.src = pkg.icon;
                    img.width = 64;
                    img.height = 64;
                    node.appendChild(img);
                    const title = document.createElement('span');
                    title.innerText = pkg.name;
                    node.appendChild(title);
                    const btn = document.createElement('button');
                    btn.innerText = pkg.installText;
                    btn.onclick = ()=>{
                        vscode.postMessage({
                            command: "manage-pkg",
                            name: pkg.name,
                            version: pkg.version,
                            query: message.query,
                            page: message.page
                        });
                    };
                    node.appendChild(btn);

                    body.appendChild(node);
                }
            }
                break;
        }
    });
}());