export class Drag {
    el: HTMLElement;
    x:number;
    y:number;
    isDrag:boolean;

    constructor(el:HTMLElement) {
        if(!el) return ;
        

        this.el = el;
        this.x = 0;
        this.y = 0;
        this.isDrag = false;

        this.down();
        this.move();
        this.up();
    }

    down():void {
        this.el.addEventListener('mousedown', e => {
            this.el.style.position = 'absolute';
            this.isDrag = true;

            this.x = e.clientX - this.el.offsetLeft;
            this.y = e.clientY - this.el.offsetTop;
        });
    }

    move():void {
        document.addEventListener('mousemove', e => {
            if (this.isDrag) {
                this.el.style.left = e.clientX - this.x + 'px';
                this.el.style.top = e.clientY - this.y + 'px';
            }
        })
    }

    up():void {
        document.addEventListener('mouseup', e => {
            this.isDrag = false;
        })
    }

}