let ul = $('#room ul');
let content = $('#submit input');
let submit = $('#submit em');
let me = '';
content.focus();

const socket = io('/');
socket.on('hello', data => {
    wellcome(data);
});

socket.on('message', data => {
    showMessage(data);
});

socket.on('userUpdate', data => {
    console.log(data);
});
submit.onclick = sendMessage;
content.onkeydown = e=>{
    if(e.keyCode === 13 && e.target.value.trim()!==''){
        sendMessage();
    }
};
function sendMessage(){
    if(content.value.trim()=='') return ;
    socket.emit('message', content.value);
    content.value = '';
    content.focus();
}
function wellcome(data) {
    let obj = JSON.parse(data);
    // 第一个 li
    let first = $('li', ul);
    // console.log(first);
    let li = document.createElement('li');
    li.className = 'wellcome';
    let html = '';

    if(me === ''){
        me = obj.id;
        html = `
            <div class="time">${obj.time}</div>
            <div class="say">欢迎您的到来~</div>
        `;
        li.innerHTML = html;
        if(first.length>0){
            ul.insertBefore(li, first[0]);
        }else{
            ul.appendChild(li);
        }
    }else{
        html = `
            <div class="time">${obj.time}</div>
            <div class="say">欢迎新朋友： ${obj.id}</div>
        `;
        li.innerHTML = html;
        if(first.length>0){
            ul.insertBefore(li, first[0]);
        }else{
            ul.appendChild(li);
        }
    }
}
function showMessage(data) {
    let obj = JSON.parse(data);
    // console.log('me-->', me);

    let first = ul.children;
    // console.log('first-->', first.length);
    if(first.length==3){
        // console.log('ul.style.cssText-->');
        ul.style.cssText = 'overflow: hidden; overflow-y: scroll;';
    }

    let li = document.createElement('li');
    let html = '';
    if(obj.id === me){
        li.className = 'me';
        html = `
            <div class="ifno">
                <b>我</b>
                <i>${obj.time}</i>
            </div>
            <div class="clear"></div>
            <div class="say">${obj.str}</div>
            <div class="clear"></div>
        `;
        li.innerHTML = html;
        ul.insertBefore(li, first[0]);
    }else{
        li.className = 'other';
        html = `
            <div class="ifno">
                <i>${obj.time}</i>
                <b>${obj.id}</b>
            </div>
            <div class="clear"></div>
            <div class="say">${obj.str}</div>
            <div class="clear"></div>
        `;
        li.innerHTML = html;
        ul.insertBefore(li, first[0]);
    }
}
function $(el, parent){
    let p = parent || document;
    let k = p.querySelectorAll(el);
    return k = k.length==1 ? k[0] : k;
}
