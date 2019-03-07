// UI class handles all DOM manipulation
class UI {
  constructor() {
    this.posts = document.querySelector('#posts');
    this.titleInput = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.postSubmit = document.querySelector('.post-submit');
    this.formState = 'add';
  }

  // Show all posts 
  showPosts(posts) {
    let output = ''; 

    posts.forEach((post) => {
      output += `
        <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title">${post.title}</h4>
            <p class="card-text">${post.body}</p>
            <a href="#" class="edit card-link" data-id="${post.id}">
              <i class="fas fa-pencil-alt"></i>
            </a>
            <a href="#" class="delete card-link" data-id="${post.id}">
              <i class="fas fa-trash-alt"></i>
            </a>
          </div>
        </div>
      `;
    });

    this.posts.innerHTML = output; 
  }

  // Show alert message
  showAlert(message, className) {
    this.clearAlert(); 

    // Create div
    const div = document.createElement('div');
    // Add classes
    div.className = className;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent 
    const container = document.querySelector('.postsContainer');
    // Get posts
    const posts = document.querySelector('#posts');
    // Inser alert div
    container.insertBefore(div, posts);

    // Timeout after 3 seconds
    setTimeout(() => {
      this.clearAlert(); 
    }, 3000);
  }

  // Clear alert message
  clearAlert() {
    const currentAlert = document.querySelector('.alert');

    if(currentAlert) {
      currentAlert.remove(); 
    }
  }

  // Clear all form fields
  clearFields() {
    this.titleInput.value = '';
    this.bodyInput.value = '';  
  }

  // Fill form with data to be edited
  fillForm(data) {
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body; 
    this.idInput.value = data.id; 

    // Change form state to 'edit'
    this.changeFormState('edit');
  }
  
  // Clear ID hidden value
  clearIdInput() {
    this.idInput.value = ''; 
  }
  
  // Change the form state
  changeFormState(type) {
    if(type === 'edit') {
      // Change add button to update button
      this.postSubmit.textContent = 'Update';
      this.postSubmit.className = 'post-submit btn btn-warning btn-block';

      // Create cancel button
      const button = document.createElement('button'); 
      button.className = 'post-cancel btn btn-light btn-block';
      button.appendChild(document.createTextNode('Cancel'));

      // Get parent
      const cardForm = document.querySelector('.card-form');
      // Get element to insert before
      const formEnd = document.querySelector('.form-end');
      // Insert cancel button to DOM
      cardForm.insertBefore(button, formEnd);
    }
    else {
      this.postSubmit.textContent = 'Post';
      this.postSubmit.className = 'post-submit btn btn-primary btn-block';

      // Remove cancel button if it is there
      if(document.querySelector('.post-cancel')) {
        document.querySelector('.post-cancel').remove(); 
      }
      
      // Clear ID from hidden field
      this.clearIdInput(); 
      // Clear text from input fields
      this.clearFields(); 
    }
  }
}

export const ui = new UI(); 