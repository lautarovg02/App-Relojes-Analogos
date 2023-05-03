"use strict"
showHour();

let canvas = document.getElementById("reloj");
let ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

const posX = width/2;
const posY = height/2;
const radio = 240;

 //*Dibujamos el cuerpo del reloj
function createWatch(){
    //*borro el contenido anterior
    ctx.clearRect(0,0,canvas.width,canvas.height);

    //*Creamos una instancia del objeto Date, que trabaja con fechas y horas.
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds(); 

    //*Creando el circulo del reloj
    ctx.beginPath();//*beginPath() método de la API Canvas 2D inicia una nueva ruta al vaciar la lista de subrutas. Llame a este método cuando desee crear una nueva ruta.
    ctx.arc(posX, posY, radio, 0, Math.PI * 2);
    ctx.strokeStyle = '#000';
    ctx.fillStyle = '#fff';
    ctx.lineWidth = 8;
    ctx.fill(); //*fill() : método de la API Canvas 2D llena la ruta actual o dada con el archivo 
    ctx.stroke();
    ctx.closePath();//*El método closePath() crea una ruta desde el punto actual hasta el punto de partida.

    //*Creando agujas del reloj
    drawLine((hours * 30 + (minutes / 60) * 30) - 90,  radio-40, "black" , 8);
    drawLine((minutes * 6 + (seconds / 60) * 6) - 90, radio-20, "black" , 5);
    drawLine((seconds * 6 - 90), radio-10, "red" , 3);
    
    /*
    *Se multiplica la cantidad de segundos por 6 para obtener la posición en grados en una circunferencia completa de 360 ​​grados (360 / 60 = 6).
    *Esto se hace directamente ya que los segundos tienen una correspondencia directa de 1 segundo a 6 grados en una circunferencia.*/
    
    //* Punto del centro del reloj
    ctx.beginPath();
    ctx.arc(posX, posY, 10, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();

    //* Dibujamos los números del reloj
    ctx.font = 'bold 20px Roboto, sans-serif';
    ctx.fillStyle = '#000';
    ctx.strokeStyle = '#000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (let i = 1; i <= 12; i++) {
        let angulo = i * (Math.PI/6) - Math.PI/2;
        let x = posX + Math.cos(angulo) * 205;
        let y = posY + Math.sin(angulo) * 205;
        ctx.lineWidth = 1;
        ctx.strokeText(i.toString(), x, y);
        ctx.fillText(i.toString(), x, y);
    }

    //* Dibujamos las líneas de los minutos
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#000';
    for (let i = 0; i < 60; i++) {
        let angulo = i * (Math.PI/30) - Math.PI/2;
        let x1 = posX + Math.cos(angulo) * 220;
        let y1 = posY + Math.sin(angulo) * 220;
        let x2 = posX + Math.cos(angulo) * 230;
        let y2 = posY + Math.sin(angulo) * 230;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
    //* Llamar a la funcion cada segundo para que se vaya dibujando de nuevo cada segundo
    setTimeout(createWatch, 1000);
}

//*Funcion encargada de dibujar las abujas del reloj 
function drawLine(grados, r,  color , widthLine){
    //El radián (símbolo: rad) es una unidad de la amplitud de ángulos. El radián mide el ángulo presentado como central a una circunferencia y su medida es igual a la razón entre la longitud del arco que comprende de dicha circunferencia y la longitud del radio, es decir, mide la cantidad de veces que la longitud del radio traza ese determinado arco en la circunferencia
    const radianes = grados * ( Math.PI / 180);  //Radianes = π = Grados = 180° 
    const x =  posX + Math.cos(radianes) * r;
    const y =  posY + Math.sin(radianes) * r; 
    ctx.beginPath();
    //*El método moveTo() mueve la ruta al punto especificado en el lienzo, sin crear una línea.
    ctx.moveTo(posX, posY);
    ctx.lineTo(x, y);
    ctx.lineWidth = widthLine;
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();

}

//*Funcion encargada de mostrar la hora de forma digital
function showHour(){
    //*Obtenemos el elemento donde mostraremos la hora 
    let hora = document.getElementById("relojDigital");
    //*Creamos una instancia del objeto Date, que trabaja con fechas y horas.
    let date = new Date();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    //*Al elemento "hora", le concatenemos las variables {hour, min, sec} que contienen la hora , minutos y segundos actuales
    hora.innerHTML = `${hour}:${min}:${sec}`;
    setTimeout(showHour,1000);
}



