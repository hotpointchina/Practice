window.addEventListener('load', ()=>{
    let dl = document.createElement('dl');
    dl.innerHTML = `
        <dt>我是 index.html - <b>【暗号：webserver】</b></dt>
        <dd>我包含：css</dd>
        <dd>我包含：image</dd>
        <dd>我包含：js</dd>
    `;
    document.body.appendChild(dl);
});

