
// 获取元素 element
function $(el,parent){
    let p = parent || document;
    let k = p.querySelectorAll(el);
    return k.length>1?k:k[0];
}


/*
    1、获取 单个 元素的样式
    2、设置元素的 单个or多个 样式
*/ 
function zcss(el,attr){
    if(typeof(attr) == 'object'){
        for(let k in attr){
            el.style[k] = attr[k];
        }
    }else{
        return el.currentStyle?el.currentStyle[attr] : document.defaultView.getComputedStyle(el,false)[attr]; 
    }
}





/*
    生成 html 文件的 <head>  部分
        - 只包含 doctype,lang,title,keyWord,summary
        - 不包含 css、js 等
    
    @return String    
*/ 
function htmlHead(params){
    let doctype = '<!DOCTYPE html>';
    let {lang,title,keyWord,summary} = params;


    lang = typeof(lang) == 'undefined' ? '<html lang="zh"><head>' : '<html lang="' + lang + '"><head>';
    title = typeof(title) == 'undefined' ? '<title>Document</title>' : '<title>'+ title +'</title>';
    if(typeof(keyWord) == 'undefined' || keyWord.length == 0){
        keyWord = '<meta content="" name="Keywords" />';
    }else{
        let s = keyWord.join(',');
        keyWord = '<meta content="' + s + '" name="Keywords" />';
    }

    summary = typeof(summary) == 'undefined' ? '<meta content="" name="Description" />' : '<meta content="' + summary + '" name="Description" />';
    return doctype + lang + keyWord + summary + title;
}




/*
    生成 文章类型的 html
*/ 
function ArticleHTML(params){
    let {modelContent,data,breadbar} = params;
    data.breadbar = breadbar;
    let arr = [];
    ChunkSystem.forEach(it=>{
        let k = toBeard(it);
        arr.length = 0;
        if(modelContent.indexOf(k) > -1){
            arr = modelContent.split(k);
            
            let strArr = [];
            for(let s=0; s<arr.length-1;s++){
                let h = arr[s] + data[it];
                strArr.push(h);
            }
            strArr.push(arr[arr.length-1]);
            modelContent = strArr.join('');
        }
    });
    return modelContent;
}


/*
    面包屑 - The breadcrumb bar
    return String
*/ 
function breadcrumb(id,arr){
    let str = '';
    let meanwhile = (id,arr)=>{
        let you = arr.find(it=>Number(it.id)==Number(id));
        if(you){
            let parent = Number(you.pid);
            if(parent===0){
                str = you.name + ' > ' + str;
            }else{
                str = you.name + ' > ' + str;
                meanwhile(parent,arr);
            }
        }else{
            return '不存在该栏目。';
        }
    };

    meanwhile(id,arr);
    return str;
}




// 保存为 html
/*
    @params - model 生成 html 文件所使用的【模版】
                - nodeBSD-cca\data\ChannelModel\ChannelModel.json

    @params - lang html语言设置，不传则默认为：zh
    @params - title:t. 
    @params - keyWord: 
    @params - summary: 对应 <meta name="description" content="..." />
    @params - content: 文章的主体内容
    @params - html: 被更新文章的存放路径

    @return - 返回的是一个 Promise
*/ 
function async saveArticleHTML(params){
    console.log('保存为 html');
    // 为用到 content 因为直接将 params 传给 ArticleHTML() 了。
    let {data,ChannelList} = params;
    let {model,lang,title,keyWord,summary,html,channel} = data;

    // 生成 html 的 <head> 标签里的 【doctype,lang,title,keyWord,summary】
    let head = htmlHead({
        lang,
        title,
        keyWord:[...keyWord],
        summary
    });


    // 生成 - 面包屑 - The breadcrumb bar
    let breadbar = breadcrumb(channel,ChannelList);

    if(typeof(model) == 'undefined'){
        // 【没有传 model 信息，使用默认模版】
        model = ChannelModel.find(it=>Number(it.id) == 0);
    
        let res = await fs.readFileSync(model.path);
        res = res.toString();
        
        // 将数据生成到【默认】模版中
        let editorCo = ArticleHTML({
            modelContent:res,
            data:{...data},
            breadbar
        });

        let co = head + editorCo;
        console.log('读取模版 model.path -->',model.path);
        
        if(html.indexOf('/static') == -1){
            html = '/static' + html;
        }
        let address = root + html;
        try{
            fs.writeFileSync(address, co);
            console.log('saveArticleHTML--> 文章更新成功');
            return {
                sCode:1,
                data:{
                    ...data,
                    html:html.slice(7)
                },
                mes:'文章更新成功！',
            }; 
        }catch(err){
            console.log('article 更新/覆盖 之前的 html 文件 写入错误：', err);
            return {
                sCode:0,
                mes:'写入错误' + err,
            };
        }
    }
}


// Base64URL 转图片文件
function dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(','), 
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);

    let imgname = filename + '.' + mime.slice(6);

    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], imgname, {type:mime});
}




{
    // 获取页面中有多少种标签 - 简易
    let els = [...document.getElementsByTagName('*')].map(el=>el.tagName);
    console.log(els);
    let manyEl = els.reduce((acc,cur)=>{
            acc[cur] ? acc[cur]++ : acc[cur] = 1;

            return acc;
        },{});
    
    let str = '页面中一共有' + Object.keys(manyEl).length + '标签。';
    console.log(manyEl);
    console.log('页面中一共有', Object.keys(manyEl).length, '标签。');
    
    document.querySelector('h2').textContent = str;
        
}


// 获取页面中有多少种标签 
class TaginPage{
    constructor(opt){
        this.opt = Object.assign({},opt);
        this.els = [];
        this.sum = {};
    }

    getTag(){
        this.els = [...document.getElementsByTagName('*')].map(el=>el.tagName);
        
        // console.log(els);
        let sum = this.els.reduce((a,c)=>{
            a[c]?a[c]++ : a[c] = 1;
            return a;
        },{});

        let footStyle = this.opt.style;
        footStyle = Object.keys(footStyle).reduce((acc,cur)=>{
            acc += cur + ':' + footStyle[cur] + ';';
            return acc;
        },'');
        let div = document.createElement(this.opt.el);
        div.style.cssText = footStyle;
        div.textContent = 'The page had ' + Object.keys(sum).length + ' tags.';
        document.body.appendChild(div);
        // this = sum;
        // console.log(this);
        this.sum = sum;
    }

    max(num){
        num = num || 0;
        // let sum = new GetElement;
        let sum = this.sum;
        let max = [...Object.keys(sum)].sort((a,b)=>sum[b]-sum[a]);
        // console.log(this.__proto__);
        // console.log(max);
        let str = 'The most tag is: ';
        let obj = null;
        if(num==0){
            str += str + max[num].toLowerCase();
            // console.log(str);
            // return str + max[num];
            obj = {
                tag:max[num],
                str
            }
            return obj;
        }
        if(num>0){
            str = `The top ${num} tags are `;
            let tag = [];
            for(let i=0;i<num;i++){
                tag.push(max[i]);
                str += `${max[i]} (${sum[max[i]]})、`;
            }
            obj = {
                tag,
                str:str.slice(0,-1)
            }
            // console.log(obj);
            return obj;
        }
    }

    min(num){
        num = num || 0;
        let str = 'The minimum tag is ';
        let obj = null;
        let min = [...Object.keys(this.sum)].sort((a,b)=>this.sum[a]-this.sum[b]);
        if(num==0){
            str += min[0];
            obj = {
                tag:min[0],
                str
            }
            // console.log(obj);
            return obj;
        }
        if(num>0){
            let tag = [];
            for(let i=0;i<num;i++){
                tag.push(min[i]);
                str += `${min[i]} (${this.sum[min[i]]})、`;
            }
            obj = {
                tag,
                str:str.slice(0,-1)
            };
            // console.log(obj);
            return obj;
        }
    }

}

{
    let style = {
            display:'block',
            position:'fixed',
            left:'0px',
            bottom:'0px',
            'z-index':'99',
            width:'100%',
            padding:'5px 0px',
            background:'#999 none',
            color:'#f1f1f1',
            'font-size':'16px',
            'line-height':'22px',
            'text-align':'center'
        };
    let opt = {
        el:'foot',
        style
    };
    let list = new TaginPage(opt);
    // console.log(list.opt);
    list.getTag();
    let max = list.max(3);
    let min = list.min(3);
    let info = [
        list.max(3),
        list.min(3)
    ];

    // console.log(list.max(3));
    let dl = '<dl><dt>The page tags</dt></dl>';
    let div = document.createElement('div');
    div.id = 'land';
    document.body.appendChild(div);
    let land = document.querySelector('#land');
    land.style.cssText = 'width:100%;color:gray';
    land.innerHTML = dl;
    dl = land.querySelector('dl');
    info.forEach(el=>{
        let dd = document.createElement('dd');
        dd.textContent = el.str;
        dl.appendChild(dd);
    });

}




/*
模拟html5中type为number的input
- 鼠标滚轮在 input 框中 上下滑动 更改 input 的 value 
- input 只允许输入数字
- e.target.value = e.target.value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'');
- 自定义事件
- new Event
- dispatchEvent(event)

https://github.com/hotpointchina/Practice/blob/master/%E6%A8%A1%E6%8B%9Fhtml5%E4%B8%ADtype%E4%B8%BAnumber%E7%9A%84input.html
or
https://github.com/hotpointchina/Practice/blob/master/模拟html5中type为number的input.html
*/



// hex 转 rgb
function hexToRgb(hex) {
    console.log(hex);
    return "rgb(" + parseInt("0x" + hex.slice(1, 3)) + ", " + parseInt("0x" + hex.slice(3, 5)) + ", " + parseInt("0x" + hex.slice(5, 7)) + ")";
}
// hex 转 rgba
function hexToRgba(hex, opacity) {
    return "rgba(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7)) + "," + opacity + ")";
}
// rgb 转 hex
function rgbToHex(r, g, b) {
    return ((r << 16) | (g << 8) | b).toString(16);
}



