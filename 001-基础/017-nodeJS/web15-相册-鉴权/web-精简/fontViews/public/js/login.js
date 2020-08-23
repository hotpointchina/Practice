// 前台 

let el = {
    content: document.querySelector('#world .content'),
    nameIN: document.querySelector('#username'),
    pwdIN: document.querySelector('#password'),
    submit: document.querySelector('#world .content span'),
    message: document.querySelector('#message')
};
let username = '',
    pwd = '';
let nameStatus = false;



/*
    进入登录页，检测是否有 token
        有 --> ajax --> ok --> 直接进入
*/ 
(function(){
    //  localStorage.setItem('authorization', res.token['Authorization'])
    let token = localStorage.getItem('authorization');
    if(token){
        ajax({
            method: 'post',
            url: 'http://localhost:8080/login',
            success(data) {
                data = JSON.parse(data);
                console.log('ajax data-->', data);
                localStorage.setItem('uname', data.username);
                if(data.code == 1){
                    zcss(document.body, 'opacity', 0);
                    setTimeout(()=>{
                        window.location.href = '/public/index.html';
                    },490);   
                }else{
                    cb.errcb(data);
                }
            }
        });
    }
})();




// 检测用户名
el.nameIN.onblur = function(){
    username = this.value;
    checkAll();
    let okcb = (res)=>{
        okCall(this, 'i');
        checkAll();
        nameStatus = true;
        console.log('检测用户名ok-->', res);
    };
    let errcb = ()=>{
        errorCall(this, '用户名错误...', 'i');
        checkAll();
    };

    if(username.trim() != ''){
        sendLoginInfo({username}, {okcb,errcb});
    }else{
        errorCall(this, '用户名不能为空...', 'i');
        checkAll();
        nameStatus = false;
    }
};


// 检测密码是否为空
el.pwdIN.onblur = function(){
    pwd = this.value;
    if(this.value.trim() === ''){
        console.log('测密码是否为空');
        errorCall(this, '密码不能为空...', 'b');
        checkAll();
    }else{
        okCall(this, 'b');
        checkAll();
    }
};


el.pwdIN.onkeydown = (e)=>{
    if(checkAll() && e.keyCode == 13){
        submitAll();
    }
};
el.nameIN.onkeydown = ()=>{
    checkAll();
};



// 提交登录信息
el.submit.onclick = submitAll;
function submitAll(){
    let okcb = (res)=>{
        console.log('提交登录信息-->',res);
        localStorage.setItem('authorization', res.token['Authorization']);
        localStorage.setItem('uname', data.username);
        
        zcss(document.body, 'opacity', 0);
        setTimeout(()=>{
            window.location.href = '/public/index.html';
        },490);        
    };
    let errcb = (res)=>{
        
        if(res.code == 3){
            // 密码错误
            errorCall(el.pwdIN, res.message, 'b');
        }
        if(res.code == 4){
            // 用户名错误
            errorCall(el.nameIN, res.message, 'i');
            nameStatus = false;
        }
    };

    let data = {
        username:el.nameIN.value,
        password:el.pwdIN.value
    };
    console.log('提交登录信息 all-->',data);
    if( checkAll() ){
        sendLoginInfo(data, {okcb,errcb});
    }
};


// 发送请求
function sendLoginInfo(data, cb){
    // console.log('发送的数据-->', data);

    ajax({
        method: 'post',
        url: 'http://localhost:8080/login',
        data,
        success(data) {
            data = JSON.parse(data);
            console.log('username, password-->', data);
            if(data.code == 1){
                cb.okcb(data);
            }else{
                cb.errcb(data);
            }
        }
    });
};


// 检测用户名、密码
function checkAll(){
    if(nameStatus && el.pwdIN.value.trim() !== ''){
        el.submit.className = '';
        return true;
    }else{
        el.submit.className = 'not';
        return false;
    }
}


function okCall(tel, mesEl){
    zcss(tel, 'border', '1px solid rgba(0, 0, 0, .39)');
    zcss(tel, 'box-shadow', '0px 0px 5px 0px rgba(0, 0, 0, .5) inset');
    
    let i = document.createElement(mesEl);
    // console.log(el.content);
    el.content.appendChild(i);
    setTimeout(()=>{
        zcss(i, 'opacity',1);
    },33);
}

function errorCall(tel, inform, mesEl){
    
    zcss(tel, 'border', '1px solid rgba(239, 7, 7, .89)');
    zcss(tel, 'box-shadow', '0px 0px 5px 0px rgba(239, 7, 7, .5) inset');
    

    let i = el.content.querySelector(mesEl);
    if(i){
        zcss(i, 'opacity',0);
        setTimeout(()=>{
            i.remove();
        },555);
    }
    
    el.message.textContent = inform;
    zcss(el.message, 'opacity', 1);
    el.message.className = 'error';
    setTimeout(()=>{
        zcss(el.message, 'opacity', 0);
        el.message.className = '';
    }, 3999);
}



function zcss(el, attr, v){
    el.style[attr] = v;
}