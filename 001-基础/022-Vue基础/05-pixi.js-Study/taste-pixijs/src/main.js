import {Application,Text,TextStyle,Sprite,Texture, Graphics, Container} from 'pixi.js';
import logo from './assets/logo.png';


// const canvas = {
//     width:750,
//     height:900
// };


// 初始化
/*
    pixi 提供一个基础类 Application
    Application 接收一个 canvas 尺寸的配置项
*/ 
const game = new Application({
    width:750,
    height:900
});

// 实例化后，通过 .view 获取真实的 canvas 画布
document.body.append(game.view);

// 在画布中创建一段文字
function createText(){
    const text = new Text("The King of Azir.");
    // TextStyle 接收很多的配置，详情可以点击进去看看
    text.style = new TextStyle({
        fill:'cornflowerblue',
        fontSize:'18px'
    });

    // .stage 是在 canvas 中的根容器
    game.stage.addChild(text);
}
createText();


// 创建【自定义根容器】
function createContainer(){
    return new Container();
}
const container = createContainer();
game.stage.addChild(container);
container.x = 100;
container.y = 500;


(function(){
    const text = new Text("I'm is custom Container.");
    text.style = new TextStyle({
        fill:'snow',
        fontSize:18
    });
    container.addChild(text);
})();




// 在画布中创建 一张图片
function createImg(){
    const img = new Sprite();
    img.texture = Texture.from(logo);
    // 设置坐标
    img.x = 200;
    img.y = 200;
    game.stage.addChild(img);
}
createImg();


// 创建一个矩形
function createRect(){
    const rect = new Graphics();
    /*
        beginFill 接收绘制图形的底色 ，
        但是必须要在前面添加 0x
    */ 
    rect.beginFill(0xf7d05f);

    /*
        四个参数
        1、x 轴坐标
        2、y 轴坐标
        3、矩形的宽度
        4、矩形的高度
    */ 
    rect.drawRect(20,39,50,33);
    rect.endFill();
    game.stage.addChild(rect);
}
createRect();


// 创建一个圆形
function createCircle(){
    let r = 20;
    const circle = new Graphics();
    circle.beginFill(0xffa500);
    circle.drawCircle(r, 456, r);
    circle.endFill();
    
    return circle;
}
const circle = createCircle();
game.stage.addChild(circle);


