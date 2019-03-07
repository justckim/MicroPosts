// Import EasyHTTP Library, UI module
import { http } from './http';
import { ui } from './ui';

// Get posts on DOM load 
document.addEventListener('DOMContentLoaded', getPosts);

// Event listener for submit post
document.querySelector('.post-submit').addEventListener('click', submitPost);

// Event listener for delete post
document.querySelector('#posts').addEventListener('click', deletePost);

// Event listener for edit state
document.querySelector('#posts').addEventListener('click', enableEditState);

// Event listener for cancel edit
document.querySelector('.card-form').addEventListener('click', cancelEdit);

// Get all existing posts from database
function getPosts() {
  http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}

// Submit Post
function submitPost() {
  // Get form data
  const title = document.querySelector('#title').value; 
  const body = document.querySelector('#body').value;
  const id = document.querySelector('#id').value;

  const data = {
    title, 
    body
  }

  // Validate form inputs
  if(title === '' || body === '') {
    ui.showAlert('Please complete all fields', 'alert alert-danger')
  }
  else {
    if(id === '') {
      // Create Post
      http.post('http://localhost:3000/posts', data)
        .then(data => {
          ui.showAlert('Post added', 'alert alert-success'); 
          // Clear input fields after post submit
          ui.clearFields(); 
          // Get all posts and display
          getPosts();
        })
        .catch(err => console.log(err));
    }
    else {
      // Update Post
      http.put(`http://localhost:3000/posts/${id}`, data)
        .then(data => {
          ui.showAlert('Post updated', 'alert alert-success');
          // Change form state to add
          ui.changeFormState('add');
          // Get all posts and display
          getPosts();
        })
        .catch(err => console.log(err)); 
    }
  }
}

// Delete Post
function deletePost(e) {
  e.preventDefault(); 
  
  if(e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id; 
    if(confirm('Are you sure?')) {
      http.delete(`http://localhost:3000/posts/${id}`)
        .then(data => {
          ui.showAlert('Post Removed', 'alert alert-danger');
          // Get all posts and display
          getPosts(); 
        })
        .catch(err => console.log(err));
    }
  }
}

// Enable Edit State
function enableEditState(e) {
  if(e.target.parentElement.classList.contains('edit')) {
    const id = e.target.parentElement.dataset.id;
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;
    
    // Data structure for the to-be-edited post
    const data = {
      id, 
      title, 
      body
    }

    // Fill form with selected post's values
    ui.fillForm(data);
  }
  
  e.preventDefault(); 
}

// Cancel Edit State
function cancelEdit(e) {
  if(e.target.classList.contains('post-cancel')) {
    // Change to add state 
    ui.changeFormState('add');
  }

  e.preventDefault(); 
}