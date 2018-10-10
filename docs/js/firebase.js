//MURO CON COMENTARIOS
firebase.database().ref('messages')
  .limitToLast(20) //filtro para no obtener todos los mensajes
  .once('value')
  .then((messages) => {
    console.log("Mensajes >" + JSON.stringify(messages));
  })
  .catch(() => {

  });


//Llamando a los mensajes  para que aparezcan cada vez que recargue la pagina
firebase.database().ref('messages')
  .limitToLast(5) //muestra solo los ultimos 5 mensajes como historial al recargar la pagina
  .on('child_added', (newMessage) => {
    contenedor.innerHTML = `
              <div class="trashPost" style="margin-top: 3em; height: 5em; border-radius:8px; background-color:#ECF8E0">
                <p style="margin-left:1em; padding-top:0.8em;">${newMessage.val().text}</p>
                <i class="fa fa-trash trash iconTrash" onclick="deletePost(event)" 
                data-postId="${newMessage.key}"></i>
              </div>
          `+ contenedor.innerHTML;
  });


//Boton Eliminar comentario
const deletePost = (event) => {
  event.stopPropagation();
  let confirmar = confirm('¿Estás seguro de eliminar la publicación?');
  if(confirmar === true){
    const idPosts = event.target.getAttribute('data-postId');
    firebase.database().ref('messages/').child(idPosts).remove();
    // contenedor.removeChild(contenedor.childNodes[0] && contenedor.childNodes[1]); //se borra el primer mensaje
    location.reload();
  }else{};
};


// Firebase Database
// Guardar los mensajes en database, llamada messages
function sendMessage() {
  if (messageArea.value.length === 0 || messageArea.value === null) {
    alert('Debes ingresar un mensaje')
  } else {

  const messageAreaText = messageArea.value;
  
  

  //Para tener una nueva llave en la colección messages
  const newMessageKey = firebase.database().ref().child('messages').push().key;


  firebase.database().ref(`messages/${newMessageKey}`).set({
    text: messageAreaText,
    
  });
  messageArea.value = '';
}    
}         