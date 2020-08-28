
interface cssStyle{
    [attr: string]: String   
}
interface callback{
    (attr:String, val:number): number
}

function zcss(el:HTMLElement, attr: String, cb?: callback)
function zcss(el:HTMLElement, attr: cssStyle, cb?: callback)
function zcss(
    el:any,
    attr: cssStyle | String,
    cb?: any
):String | undefined
{
    if(el){
        if(typeof attr === 'string'){
            return window.getComputedStyle(el)[attr] ;
        }
        if(typeof attr === 'object'){
            for(let v in attr){
                console.log('cooooo-->', v, attr[v]);
                el.style[v] = attr[v];

                if( Number(attr[v]) ){
                    cb && cb( v, Number(attr[v]) );
                }
            }
        }
    }
}


let co = <HTMLElement>document.querySelector('.co');
zcss(co, {
   'background':'cornflowerblue',
   'font-size': '18px',
   'color':'#fff'
});





