//JavaScript


var goods = [
    {name:'Livework 10 Colour Twin Pen Set',
     img:'images/01.jpg',
     price:'12.5',
    },

    {name:'258 Piecs Inspiration Art Set for Drawing and Sketching Color Pen Crayons Case Painting Set',
     img:'images/02.jpg',
     price:'35.9',
    },

    {name:'Chinese style diary book',
     img:'images/03.jpg',
     price:'14.5',
    },

    {name:'Hot Cherry Colour Pen',
     img:'images/04.png',
     price:'15.5',
    },

    {name:'Pentel Color Pen Sets',
     img:'images/05.jpg',
     price:'16.5',
    }

]

var list = document.getElementById('list');



//生成列表
for(var j=0;j<goods.length;j++){
    let tr = document.createElement('tr');
    var pname = '<td class="pname">\
            <img src="'+ goods[j].img +'" />\
            <span title="' + goods[j].name + '">' + goods[j].name + '</span>\
        </td>';
    var price = '<td class="price">'+ goods[j].price +'</td>';
    var sum = '<td class="quantity"><b>-</b><i>0</i><em>+</em></td>';
    var total = '<td class="total">0</td>';
    tr.innerHTML = pname + price + sum + total;
    list.appendChild(tr);

}





//弹出层
var modal = document.getElementById('wModal');
var modalCo = modal.querySelector('.co');
var modalBTN = modal.querySelector('.co>button');
var modalh2 = document.querySelector('#wModal>.co>h2');
function showModal(){
    modal.style.height = '100%';
    modal.style.opacity = 1;
    modalCo.style.display = 'block';
}
modalBTN.onclick = function(){
    modal.style.height = '0%';
    modal.style.opacity = 0;
    modalCo.style.display = 'none';
}





//left list
var btn_b = list.querySelectorAll('tr>.quantity>b');
var btn_em = list.querySelectorAll('tr>.quantity>em');
var sum = list.querySelectorAll('tr>.quantity>i');
var lineTotal = list.querySelectorAll('tr>.total');
var price = list.querySelectorAll('tr>.price');
var pics = list.querySelectorAll('tr>.pname>img');

var bigshow = document.querySelector('.land>.co>.product>.big');


//Right Info
var infoList = document.querySelectorAll('#info>ul>li');
var cartSum = infoList[0].querySelector('i');
var cartcost = infoList[1].querySelector('i');
var theMost = document.querySelector('#info>h2>i');




for(var i=0;i<goods.length;i++){
    // 加
    btn_em[i].onclick = function(d){
        let them = Array.from(btn_em);
        let you = them.indexOf(d.target);
        let now_s = +(sum[you].textContent);

        sum[you].textContent = now_s + 1;
        // 限购
        if(sum[you].textContent == 11){
            sum[you].textContent = 10;
            modalh2.textContent = '';
            modalh2.textContent = "Up to 10 pieces can be purchased.";
            showModal();
        } 

        //行内核算
        let jprice = +(price[you].textContent);
        lineTotal[you].textContent = ((jprice*10) * +(sum[you].textContent)) / 10;

        check();
    }


    //减
    btn_b[i].onclick = function(q){
        var clist = Array.from(btn_b);
        var cyou = clist.indexOf(q.target);
        let ci = +(sum[cyou].textContent);
        sum[cyou].textContent = ci - 1;

        //购物栏已空
        if(ci<1){
            sum[cyou].textContent = 0;
            modalh2.textContent = '';
            modalh2.textContent = "It's empty now.";
            showModal();
        }

        //行内计算
        let dprice = +(price[cyou].textContent);
        lineTotal[cyou].textContent = ((dprice*10) * +(sum[cyou].textContent)) / 10;

        check();
    }


    //鼠标经过图片
    pics[i].onmouseover = function(m){
        let plist = Array.from(pics);
        let you =  plist.indexOf(m.target);
        let thePic = 'url(' + goods[you].img +')';


        bigshow.style.width = '180px';
        bigshow.style.height = '180px';
        
        bigshow.style.left = '65px';
        bigshow.style.top = '54px';
        bigshow.style.padding = '20px';
        bigshow.style.opacity = 1;
        bigshow.style['background-image'] = thePic;

    }
    pics[i].onmouseout = function(){
        bigshow.removeAttribute('style');
    }



}



//核算
function check(){
    //总计
    getTotal();

    //总件数
    numbers();

    //最贵
    theE();
}


//总价
function getTotal(){
    let jtotal = 0;
    for(var g=0;g<goods.length;g++){
        jtotal += +(lineTotal[g].textContent);
    }
    cartcost.textContent = jtotal; 
}


//总件数
function numbers(){
    let nbs = 0;
    for(let j=0;j<goods.length;j++){
        nbs += +(sum[j].textContent);
    }
    cartSum.textContent = nbs;
}


var picShow = document.querySelector('#info>.show');
var showTop = document.querySelector('#info>.show>span');
var showBottom = document.querySelectorAll('#info>.show>em');


//最贵
function theE(){
    let x = [];

    for(var k=0;k<goods.length;k++){
        
        let nowthis = +(sum[k].textContent);
        if(nowthis>0){
            x.push(+(price[k].textContent));
        }
    }

    x.sort(function(a,b){
        return a-b;
    });


    let theExpensive = x[x.length - 1];
    theMost.textContent = theExpensive;
  

    //最贵的图片
    if(theExpensive){    
        var zzz = 0;
        for(let t=0; t<5; t++){
            let uu = price[t].textContent.indexOf('' + theExpensive);

            if(uu>-1){
                break;
            }
            zzz++;
        }


        let theImg = 'url(' + goods[zzz].img + ')';
        showTop.style['background-image'] = theImg;
        

        for(let k=0; k<showBottom.length; k++){
            showBottom[k].style['background-image'] = theImg;
        }

        picShow.style.opacity = 1;

    }else{
        picShow.style.opacity = 0;
        showTop.removeAttribute('style');
        for(let k=0; k<showBottom.length; k++){
            showBottom[k].removeAttribute('style');
        }

    }
}


























































