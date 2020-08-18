function $(el, parent){
    let p = parent || document;
    let k = p.querySelectorAll(el);
    return k = k.length==1 ? k[0] : k;
}

let label = $('.world form label');
let name = $('input', label[0]);
let pwd = $('input', label[1]);
let submit = $('.world form>span');
let section = $('.world section');

let check = ()=>{
    if(name.value.trim() !=='' && pwd.value.trim() !=='' ){
        submit.className = 'ok';
    }else{
        submit.removeAttribute('class');
    }
};
name.oninput = pwd.oninput = e=>{
    check();
};

submit.onclick = ()=>{
    
    let xhr = new XMLHttpRequest();
    xhr.open('post', '/check', true);
    
    xhr.onload = ()=>{
        let res = xhr.responseText;
        // console.log('返回--》', res);
        let reg = /{"status":\d{1}/g;
        let status = res.match(reg)[0].slice(-1);
        if(Number(status) === 1){
            window.location.href = '/public/room.html';
        }else{
            let reg = /(?<="mes":")(.*)/g;
            let mes = res.match(reg)[0].split('"')[0];
            console.log(mes);
            section.textContent = mes;
            section.style.opacity = 1;
            setTimeout(()=>{
                section.style.opacity = 0;
            },1522);
        }
    };

    try{    
        xhr.setRequestHeader('Content-Type', 'text/json; charset=utf-8');
        xhr.send(JSON.stringify({
            name:name.value,
            pwd:pwd.value
        }));
    }catch(err){
        console.log(err);
    }
};