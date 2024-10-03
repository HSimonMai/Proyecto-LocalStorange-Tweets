//variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
const tweet = document.querySelector('#tweet').value;
let tweets = [];

//Event Listeners
eventListener();
//Cuando el usuario agrega un nuevo tweet
function eventListener(){
    formulario.addEventListener('submit', agregarTweet);
   
    //Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded',() => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];

        console.log(tweets);
        
        crearHTML();
    })
}


//Funciones
function agregarTweet(e){
    e.preventDefault(); 
   // console.log('agregando tweet--')

    // const newTweet= document.querySelector('#tweet');
    const tweet = document.querySelector('#tweet').value;
    console.log(tweet)

    //validacion
   if(tweet === ''){
     mostrarError('un mensaje no puede ir vacio');

       return;//evita que se ejecute mas linea de codigo
   }
   const tweetObj = {
    id: Date.now(),
    tweet
   }

   //Añadir al arreglo de tweets
tweets = [...tweets,tweetObj];
console.log(tweetObj);
//una vez agregado crea el html
crearHTML();

}

//Añadir al arreglo de tweets
// tweets = [...tweets,tweet];
// console.log(tweetObj);


//mostrar mensaje de error
function mostrarError(error){
const mensajeError = document.createElement('p');
mensajeError.textContent = error;
mensajeError.classList.add('error');

//insertar en el contenido
const contenido = document.querySelector('#contenido');
contenido.appendChild(mensajeError);

setTimeout(() => {
    mensajeError.remove();
},3000);
}
//Muestra un listado de los tweets
function crearHTML(){
    limpiarHTML();

    if(tweets.length > 0){
        tweets.forEach( tweet => {
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerHTML = 'X';
            
            //añadir la funcion eliminar
            btnEliminar.onclick = () =>{
                borrarTweet(tweet.id);
            }
            
            //crear el html
            const li = document.createElement('li');

            //añadir el texto
            li.innerText = tweet.tweet

            //asignar el boton
            li.appendChild(btnEliminar);
            //insertacion en el html
            listaTweets.appendChild(li);
            
           
        })
        sincronizarStorange();
    }

    
}
//Agrega los tweets actuales a LocalStorange
function sincronizarStorange(){
    localStorage.setItem('tweets',JSON.stringify(tweets));

};
//Eliminar tweet
function borrarTweet(id){
    tweets = tweets.filter( tweet => tweet.id !== id);
    console.log(tweets);
    crearHTML();
};

//limpiar html
function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
};