
function deleteNote(noteId, userID) {
    fetch(`/notes/${noteId}${userID}`, {
      method: 'DELETE',
    });
  }
  
  function redirection(noteId) {
    fetch(`/posts/${noteId}`, {
      method: 'GET',
    });
  }
  
  
  