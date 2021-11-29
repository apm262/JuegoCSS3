//Lienzo con fondo y cuadrado verde se mueve solo por el

var lienzo=null, canvas=null;
var x=50,y=50;

const KEY_LEFT=37;
const KEY_UP=38;
const KEY_RIGHT=39;
const KEY_DOWN=40;
const KEY_P=80;

const ARRIBA=0;
const DERECHA=1;
const ABAJO=2;
const IZQUIERDA=3;

var dir=DERECHA;

var lastPress=null;

var pause=true;

function iniciar(){
 canvas=document.getElementById('lienzo');
 lienzo=canvas.getContext('2d');
 run();
 repaint()
}
function run()
{
 setTimeout(run,50);
 act();
}
function repaint()
{
 requestAnimationFrame(repaint)
 paint(lienzo);
}


function act(){
    if(!pause){
        if(lastPress==KEY_UP)
            dir=ARRIBA;
        if(lastPress==KEY_RIGHT)
            dir=DERECHA;
        if(lastPress==KEY_DOWN)
            dir=ABAJO;
        if(lastPress==KEY_LEFT)
            dir=IZQUIERDA;

        if(dir==DERECHA)
            x+=10;
        if(dir==IZQUIERDA)
            x-=10;
        if(dir==ARRIBA)
            y-=10;
        if(dir==ABAJO)
            y+=10;

        if(x>=canvas.width)
            x=0;
        if(y>=canvas.height)
            y=0;
        if(x<0)
            x=canvas.width-10;
        if(y<0)
            y=canvas.height-10;

        if(x>canvas.width)
            x=0;
        else
            x+=2;
    }
    if(lastPress==KEY_P){
        pause=!pause;
        lastPress=null;
    }
}



function paint(lienzo){

    lienzo.fillText('Last Press: '+lastPress,10,30);

    var gradiente=lienzo.createLinearGradient(0,0,0,canvas.height);

    gradiente.addColorStop(0.5, '#0000FF');
    gradiente.addColorStop(1, '#000000');
    lienzo.fillStyle=gradiente;
    lienzo.fillRect(0,0,canvas.width,canvas.height);
    lienzo.fillStyle='#0f0';
    lienzo.fillRect(x,y,10,10);
    if(pause){
        lienzo.textAlign='center';
        lienzo.fillText('PAUSE',150,75);
        lienzo.textAlign='left';
    }
}



window.addEventListener("load", iniciar, false);


document.addEventListener('keydown', function(evt)
{
 lastPress=evt.keyCode;
}, false);
