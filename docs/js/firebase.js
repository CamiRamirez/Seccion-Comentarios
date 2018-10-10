// Create
let db = firebase.firestore();
function userPost() {
  let message = document.getElementById('messageArea').value;
  if (message === '') {
    alert('Por favor ingresa un mensaje');
  } else {
    db.collection('messages').add({
      textMessage: message,
    })
      .then(function(docRef) {
        console.log('Texto escrito con ID: ', docRef.id);
        document.getElementById('messageArea').value = '';
      })
      .catch(function(error) {
        console.error('Error al agregar documento: ', error);
      });
  };
}

// Read
let container = document.getElementById('contenedor');
db.collection('messages').onSnapshot((querySnapshot) => {
  container.innerHTML = '';
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data().textMessage}`);
    contenedor.innerHTML =`
              <div class="trashPost" style="margin-top: 3em; height: 5em; border-radius:8px; background-color:#ECF8E0">
                <p style="margin-left:1em; padding-top:0.8em;">${doc.data().textMessage}</p>
                <i class="fa fa-trash trash iconTrash" onclick="deletePost('${doc.id}')"></i>
              </div>
          `+ contenedor.innerHTML;
  });
});


// Delete
function deletePost(id) {
  let removeMessage = confirm('¿Quiere eliminar la publicación?');
  if (removeMessage === true) {
    db.collection('messages').doc(id).delete().then(function() {
      console.log('Document successfully deleted!');
    }).catch(function(error) {
      console.error('Error removing document: ', error);
    });
  }
}