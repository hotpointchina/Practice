let ul = $('#room ul');
let content = $('#submit input');
let submit = $('#submit em');
let peopleUL = document.querySelector('#control ul');
let me = '',
    nickname = '';
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
$('#world').onclick = (e)=>{
    let k = e.target;
    // console.log('nickname-->', );
    // 所有人
    if(k.id !== 'allp' && peopleUL.status){
        
        peopleUL.status = false;
        peopleUL.style.opacity = 0;
        setTimeout(()=>{
            if(!e.path.some(p=>p.id=='nickname')){
                $('#control').style.display = 'none';
            }
            peopleUL.style.display = 'none';
        }, 500);
    }
    if(k.id == 'allp' && !peopleUL.status){
        if(!e.path.some(p=>p.id=='nickname')){
            $('#control section').style.display = 'none';
        }
        
        $('#control').style.display = 'flex';
        peopleUL.style.display = 'block';
        setTimeout(()=>{
            peopleUL.status = true;
            peopleUL.style.opacity = 1;
        }, 33);
    }

    // 设置昵称
    if(e.path.some(p=>p.id=='nickname')){
        peopleUL.style.display = 'none';
        // console.log('nickname');
        $('#control').style.display = 'flex';
        $('#control section').style.display = 'block';
        setTimeout(()=>{
            $('#control section').style.opacity = 1;
            $('#nickInput').focus();
        }, 33);
    }
    if(k.id == 'nickInput'){
        $('#control section').style.transiton = 'none';
        $('#control').style.display = 'flex';
    }

};
// 选择某一个
peopleUL.onclick = e=>{
    let li = e.target;
    if(li.nodeName == 'LI'){
        console.log(li.textContent);
    }
};
// 设置昵称
$('#nickInput').onkeydown = function(e){
    if(e.keyCode === 13){
        if(this.value.trim()==''){
            return ;
        }else{
            $('#control section').style.transiton = 'all .5s linear';
            $('#control section').style.opacity = 0;
            setTimeout(()=>{
                $('#control').style.display = 'none';
                $('#control section').style.display = 'none';
            },500);
            nickname = this.value;
            $('#nickname span').textContent = this.value;
            this.value = '';
        }
        
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
            <div class="say">欢迎您来到话吧</div>
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
                <b>${obj.id}</b>
                <i>${obj.time}</i>
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
