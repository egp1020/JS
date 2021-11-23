let colores = ["rgb(165, 42, 42)", "blue", "white", "gray", "green", "pink", "yellow", "black", "orange", "red", "salmon"]
function cambiarFondo(){
    let indice = parseInt(Math.random() * 10)-1;
    let color = colores[indice];
    document.querySelector("body").style.background = color;
    let mensaje = document.querySelector("#txtMensaje").value;
    document.querySelector("#miDivision").innerHTML = mensaje;
}

/* Ejecuta 1 sola vez */
/* setTimeout(() =>{
    cambiarFondo()
}, 4000); */

/*Se ejecuta varias veces, cada 2 seg.*/

setInterval(() =>{
    cambiarFondo()
}, 2000);