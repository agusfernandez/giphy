console.log('hola');
alert('hello');
prompt('hello nice girl');
confirm('hola nice day');
const nice=(confirm('¿Desea continuar?'))? "true":"false"
console.log(nice);

let numero = prompt('Introduce un numero');
let resultado=parImpar(numero);
alert("el numero es"+ " " + numero +  " " + "y el resultado" + " " +resultado);
function parImpar(numero){
    if(numero%2==0){
        return "par";
    } else {
        return "impar";
    }
}
console.log(numero);


