//Obtener el dato del localstorage
let visitCount = localStorage.getItem('visitCount');

//si no existe inicias el contador
if(!visitCount){
    visitCount=0;
}

visitCount++;

//Guardar el item en el localstorage
localStorage.setItem('visitCount', visitCount);

//Formatear el numero con puntos separados de miles
const formatearNumeros = Number(visitCount).toLocaleString('es-Es');

document.getElementById('visit-count').textContent = formatearNumeros;