const fs = require('fs');

const http = require('http');
const server = http.createServer((request, response)=>{
    // request.url 得到的是域名以后的部分
    let url = request.url;


    let content = '';
    if(url.startsWith('/upload')){
        /*
            这里处理的是【静态资源】
            正则表达式匹配的时候，需要锚定词头，
            以便将规则定为：
                1、只要请求的是以 '/upload' 开头的请求，
                   都将 '/upload' 替换为 '/static'
                2、当进入到 url.startsWith('/upload') == true 时，
                    用户请求什么就直接返回什么资源，并不会像
                    else 那样，都是返回 index.html 文件

            【注意：】
                这里的内容需要先写，否则会出错，
                如：静态资源<script>可能会被读取完其所有内容后，
                    将该 js 的内容，直接添加到 index.html 文件中，
                    并一块显示到浏览器里。
        */ 
        let reg = /^(\/upload)/g;
        url = url.replace(reg, '/static');
        let content = fs.readFileSync(__dirname + url);
        response.write(content);
    }else{
        /*
            这里的规则少，所以这里的 else 则意义为：
            除了请求 '/upload' 以外的，都返回 index.html 文件。
            即使你输入的是：http://localhost:8080/sdfsdfsdf 等等
            都返回 index.html 文件。
        */ 
        response.setHeader('Content-Tpye', 'text/html;charset=utf-8');
        content = fs.readFileSync(__dirname + '/view/index.html');
        response.write(content);
    }
    response.end();
});

let port = 8080;
server.listen(port, ()=>{
    console.log(`服务已启动，http:/\/\localhost:${port}`);
});