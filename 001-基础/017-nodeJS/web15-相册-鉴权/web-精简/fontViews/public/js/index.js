let www = 'http://localhost:8080';

let gallery = $('#gallery');
let galleryShow = $('#gallery .box .show');
let uploadresult = $('#uploadresult');
let uploadresultShow = $('#uploadresult .box .show');

let task = $('.task_panel');
let uploadBtnElement = $('.uploadBtn');
let uploadFileElement = $('#uploadFile');
let taskBodyElement = $('.task_body');
let upnumber = $('#upnumber');


let haveToken = localStorage.getItem('authorization');
if(!haveToken){
    goLogin();
}


// 获取图片后的 回调
let showIMGS = (data)=>{
    console.log('获取图片后的 回调-->', data);

    let imgs = JSON.parse(data);
    if(imgs.code == 0){
        // 没有 token 或 token 无效
        goLogin();
    }

    
    if(imgs.length>0){
        gallery.style.opacity = 1;
    }
    imgs.map(img=> img.url = '/api'+img.url);
    console.log(imgs);
    let str = '';
    imgs.forEach(img=>{
        str += `<img src="${img.url}" />`
    });
    $('.box .show', gallery).innerHTML = str;
};
// 获取数据库已有的图片
ajax({
    method: 'get',
    // url: `${www}/api/getPhotos`,
    url: '/api/getPhotos',
    success(data) {
        showIMGS(data);
    }
});

// 设置用户名
let localName = localStorage.getItem('uname');
let master = {
    el: $('#master'),
    name: $('#master span b'),
    nameAll: $('#master .menu ul b'),
    out: $('#master .menu ul li'),
};
if(localName){
    master.name.textContent = localName.slice(0,1).toLocaleUpperCase();
    master.nameAll.textContent = localName;
}


// 退出
master.out.onclick = ()=>{
    try {
        goLogin();    
    } catch (error) {
        console.log('退出错误-->', error);        
    }
};


let file_len = 0
// 点击上传
uploadBtnElement.onclick = function() {
    uploadFileElement.click();
}
// 内容发生改变了，已经选择了上传文件
uploadFileElement.onchange = function() {
    task.style.display = 'block';
    $('#uploadresult').style.display = 'block';
    setTimeout(()=>{
        $('#uploadresult').style.opacity = 1;
    },33);

    file_len = this.files.length;
    upnumber.textContent = '1/' + file_len;
    for (let file of this.files) {
        uploadFile({
            file
        });
    }
}

function uploadFile(data) {
    let li = document.createElement('li');
    li.innerHTML = `
        <span>${data.file.name}</span>
        <div class="task-progress-status">
            上传中……
        </div>
        <div class="progress"></div>
    `
    let taskProgressStatusElement = li.querySelector('.task-progress-status');
    let progressElement = li.querySelector('.progress');
    taskBodyElement.appendChild(li);

    ajax({
        method: 'post',
        url: `/api/upload`,
        data,
        success(data) {
            uploadCB(data,{
                liel:li,
                startEl:taskProgressStatusElement
            });
        },
        onprogress(ev) {
            progressElement.style.width = (ev.loaded / ev.total) * 100 + '%';
        }
    });
}


// 上传完成 ajax - 进度条 的回调
function uploadCB(data,li){
    let {liel,startEl} = li;
    data = JSON.parse(data);
    data.url = www+data.url;
    console.log('上传完成的回调-->', data);

    let img = new Image();
    img.src = data.url;
    uploadresultShow.appendChild(img);

    setTimeout(() => {
        startEl.innerHTML = '上传完成';
        liel.style.right = '-504px';

        // 上传完成 展示区 - 呈现 的回调
        showUploadPic(data, liel);
    }, 1000);
}
let uploadNum = 1;
// 上传完成 展示区 - 呈现 的回调
function showUploadPic(data, li){
    $('#uploadresult').style.opacity = 1;
    $('#gallery').style.opacity = 1;


    let imgs = galleryShow.querySelectorAll('img');
    if(imgs==0){
        galleryShow.innerHTML = `<img src="${data.url}" />`;
    }else{
        let newIMG = new Image();
        newIMG.src = data.url;
        galleryShow.insertBefore(newIMG,imgs[0]);
    }

    uploadNum++;
    uploadNum = Math.min(uploadNum, file_len);
    upnumber.textContent = uploadNum + '/' + file_len;

    setTimeout(()=>{
        li.remove();
        task.style.display = 'none';
        zcss(uploadresult, 'opacity', 0);
        setTimeout(()=>{
            zcss(uploadresult, 'display', 'none');
            uploadresultShow.innerHTML = '';
        },500);
    },500);
}



// 转回登录页 
function goLogin(){
    localStorage.removeItem('uname');
    localStorage.removeItem('authorization');
    zcss(document.body, 'opacity', 0);
    setTimeout(()=>{
        window.location.href = '/public/login.html';
    },490); 
}



// 保险起见，给 task panel 的 x 一个关闭的功能
$('.task_panel .task_header .all-close').onclick = ()=>{
    $('.task_panel').style.display = 'none';
}


function $(el, parent){
    let p = parent || document;
    let k = p.querySelectorAll(el);
    return k = k.length==1 ? k[0] : k;
}



function zcss(el, attr, v){
    el.style[attr] = v;
}