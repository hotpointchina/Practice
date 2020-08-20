let gallery = $('#gallery');
let uploadresultShow = $('#uploadresult .box .show');

let task = $('.task_panel');
let uploadBtnElement = $('.uploadBtn');
let uploadFileElement = $('#uploadFile');
let taskBodyElement = $('.task_body');
let upnumber = $('#upnumber');


// 获取图片后的 回调
let showIMGS = (data)=>{
    let imgs = JSON.parse(data);
    if(imgs.length>0){
        gallery.style.opacity = 1;
    }

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
    url: '/getPhotos',
    success(data) {
        showIMGS(data);
    }
});



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


    let file_len = this.files.length;
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
        url: '/upload',
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


// 上传完成的回调
function uploadCB(data,li){
    let {liel,startEl} = li;
    data = JSON.parse(data);
    // console.log('data', data);

    $('#uploadresult').style.opacity = 1;
    let img = new Image();
    img.src = data.url;
    uploadresultShow.appendChild(img);

    setTimeout(() => {
        startEl.innerHTML = '上传完成';
        liel.style.right = '-504px';
        setTimeout(()=>{
            liel.remove();
            task.style.display = 'none';
        },500);
        // console.log('task.style.display--');
    }, 1000);
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