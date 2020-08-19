const fs = require('fs');
const http = require('http');


let ok = false;
const app = http.createServer(async (request,response)=>{
    let url = request.url;
    if(url == '/'){
        response.end( fs.readFileSync('./views/index.html') );
    }
    if(url == '/gettime'){
        if(ok){
            return ;
        }
        ok = await sendTime(response);
    }
});

async function sendTime(response){
    let ok = false;
    response.setHeader('Content-Type', 'text/event-stream');
    for (let i= 0; i<3; i++) {
        await new Promise(resolve=>{
            setTimeout(()=>{
                resolve();
            },1000);
        });
        response.write(`event: ztime\ndata: {"time": "${new Date()}"}\n\n`);
        console.log('iiiii-->', i);
        if(i==2){
            ok=true;
        }
    }
    response.end();
    return ok;
}
app.listen(8080,()=>{console.log('http://localhost:8080')});