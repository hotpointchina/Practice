import {Application,Text,TextStyle, Graphics, Container} from 'pixi.js';

let canvas = null;
~function(){
    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas = {
        width,
        height
    }
}();
console.log('窗口大小是：', canvas);




// 初始化
/*
    pixi 提供一个基础类 Application
    Application 接收一个 canvas 尺寸的配置项
*/ 
const game = new Application(canvas);

document.body.style.cssText = "margin:0px; padding:0px";
// 实例化后，通过 .view 获取真实的 canvas 画布
document.body.append(game.view);




// 创建一个矩形
function createRect(){
    const rect = new Graphics();
    rect.beginFill(0xf7d05f);
    rect.drawRect(0,0,70,22);
    rect.endFill();
    return rect;
}


// 创建一个圆形
function createCircle(){
    let r = 20;
    const circle = new Graphics();
    circle.beginFill(0xffa500);
    circle.drawCircle(r, 232, r);
    circle.endFill();
    circle._r = r;

    return circle;
}
const circle = createCircle();
game.stage.addChild(circle);


// 添加点击事件 
circle.interactive = true;
circle.on('pointertap', ()=>{
    game.ticker.add(move);
});


// 小球运动
function circleMove(el, speed, ahead){
    // console.log(el.x, ahead);
    el.x += speed * ahead;
}
let ahead = 1;
let move = ()=>{
    if(circle.x >= canvas.width - circle._r*2){
        ahead = -1;
    }
    if(circle.x <= 0){
        ahead = 1;
    }
    circleMove(circle, 4, ahead);
};

// 创建【自定义根容器】
function createContainer(){
    return new Container();
}
const container = createContainer();
game.stage.addChild(container);
container.x = canvas.width * 0.3;
container.y = 30;

(function(){
    const text = new Text("小球别动");
    text.style = new TextStyle({
        fill:0x0366a9,
        fontSize:14
    });
    text.x = 6;
    text.y = 3;
    const rect = createRect();
    
    container.addChild(rect, text);
    rect.interactive = true;
    rect.on('pointertap', function(){
        console.log('小球别动');
        game.ticker.remove(move);
    });
})();

