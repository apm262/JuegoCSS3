var lienzo=null, canvas=null;
function iniciar()
{
 canvas=document.getElementById('lienzo');
 lienzo=canvas.getContext('2d');
 var gradiente=lienzo.createLinearGradient(0,0,10,100);
 gradiente.addColorStop(0.5, '#0000FF');
 gradiente.addColorStop(1, '#000000');
 lienzo.fillStyle=gradiente;
 lienzo.fillRect(10,10,100,100);


 lienzo.font="bold 24px verdana, sans-serif";
 lienzo.textAlign="start";
 lienzo.fillText("Mi mensaje", 100,100);
}
window.addEventListener("load", iniciar, false);
