
let uploadBtnElement = document.querySelector('.uploadBtn');
let uploadFileElement = document.querySelector('#uploadFile');
let taskBodyElement = document.querySelector('.task_body');
let photosListElement = document.querySelector('.photos-list');


function loadPhotos() {
    ajax({
        method: 'get',
        url: '/api/getPhotos',
        success(data) {
            data = JSON.parse(data);


            data.forEach(d => {
                createLi(d);
            });


        }
    });
}

// loadPhotos();

// 点击上传
uploadBtnElement.onclick = function() {

    uploadFileElement.click();

}

// 内容发生改变了，已经选择了上传文件
uploadFileElement.onchange = function() {
    // console.log('upload');

    // console.dir(this.files);

    for (let file of this.files) {
        // console.log(file);
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
        url: 'http://localhost:8080/upload',
        data,
        success(data) {
            console.log('/upload', data);
            data = JSON.parse(data);
            createLi(data);
            

            setTimeout(() => {
                // li.remove();
                taskProgressStatusElement.innerHTML = '上传完成';
            }, 1000);
        },
        onprogress(ev) {
            // console.log('ev', ev);
            progressElement.style.width = (ev.loaded / ev.total) * 100 + '%';
        }
    });
}

function createLi(data) {
    let li = document.createElement('li');
    let img = new Image();
    // img.src = '/public/upload/' + d.name;
    img.src = 'http://localhost:8080' + data.url;
    li.appendChild(img);
    photosListElement.appendChild(li);
}


// 用户登录相关
let usernameElement = document.querySelector('#username');
let passwordElement = document.querySelector('#password');
let loginBtnElement = document.querySelector('#loginBtn');



// ajax({
//     method: 'post',
//     url: 'http://localhost:8080/login',
    
// })



loginBtnElement.onclick = function() {

    let username = usernameElement.value;
    let password = passwordElement.value;

    console.log(username, password);

    ajax({
        method: 'post',
        url: 'http://localhost:8080/login',
        data: {
            username,
            password
        },
        success(data) {
            
            data = JSON.parse(data);
            console.log('username, password-->', data);


            // console.log(this.getResponseHeader('Authorization'));

            localStorage.setItem('authorization', data.token['Authorization'])
        }
    })

}