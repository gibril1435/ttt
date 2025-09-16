const API = '/api';
let token = localStorage.getItem('token') || '';

const authSection = document.getElementById('auth-section');
const blogSection = document.getElementById('blog-section');
const authMsg = document.getElementById('auth-message');
const postsList = document.getElementById('posts-list');

function showAuth() {
  authSection.classList.remove('hidden');
  blogSection.classList.add('hidden');
}
function showBlog() {
  authSection.classList.add('hidden');
  blogSection.classList.remove('hidden');
  fetchPosts();
}

// Register
const regForm = document.getElementById('register-form');
regForm.onsubmit = async (e) => {
  e.preventDefault();
  const name = document.getElementById('reg-name').value;
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;
  const res = await fetch(API + '/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  const data = await res.json();
  authMsg.textContent = data.message;
  authMsg.className = res.ok ? 'success' : 'error';
  if (res.ok) regForm.reset();
};

// Login
const loginForm = document.getElementById('login-form');
loginForm.onsubmit = async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const res = await fetch(API + '/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  authMsg.textContent = data.message;
  authMsg.className = res.ok ? 'success' : 'error';
  if (res.ok && data.token) {
    token = data.token;
    localStorage.setItem('token', token);
    showBlog();
  }
};

document.getElementById('logout-btn').onclick = () => {
  token = '';
  localStorage.removeItem('token');
  showAuth();
};

// Fetch posts
async function fetchPosts() {
  postsList.innerHTML = 'Loading...';
  const res = await fetch(API + '/posts');
  const posts = await res.json();
  postsList.innerHTML = '';
  posts.forEach(post => {
    const div = document.createElement('div');
    div.className = 'post';
    div.innerHTML = `
      <b>${post.title}</b> <br/>
      <small>by ${post.user?.name || 'Unknown'} (${post.user?.email || ''})</small><br/>
      <div>${post.content}</div>
      <div class="actions">
        ${post.userId === getUserId() ? `
          <button onclick="editPost(${post.id}, '${encodeURIComponent(post.title)}', '${encodeURIComponent(post.content)}')">Edit</button>
          <button onclick="deletePost(${post.id})">Delete</button>
        ` : ''}
      </div>
    `;
    postsList.appendChild(div);
  });
}

// Get userId from token
function getUserId() {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id;
  } catch {
    return null;
  }
}

// Create post
const createPostForm = document.getElementById('create-post-form');
createPostForm.onsubmit = async (e) => {
  e.preventDefault();
  const title = document.getElementById('post-title').value;
  const content = document.getElementById('post-content').value;
  const res = await fetch(API + '/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({ title, content })
  });
  const data = await res.json();
  if (res.ok) {
    createPostForm.reset();
    fetchPosts();
  } else {
    alert(data.message || 'Gagal menambah postingan');
  }
};

// Edit post
window.editPost = function(id, title, content) {
  title = decodeURIComponent(title);
  content = decodeURIComponent(content);
  const newTitle = prompt('Edit title:', title);
  if (newTitle === null) return;
  const newContent = prompt('Edit content:', content);
  if (newContent === null) return;
  fetch(API + '/posts/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({ title: newTitle, content: newContent })
  })
    .then(res => res.json())
    .then(data => {
      if (data.post) fetchPosts();
      else alert(data.message || 'Gagal update');
    });
};

// Delete post
window.deletePost = function(id) {
  if (!confirm('Yakin hapus postingan ini?')) return;
  fetch(API + '/posts/' + id, {
    method: 'DELETE',
    headers: { 'Authorization': 'Bearer ' + token }
  })
    .then(res => res.json())
    .then(data => {
      if (data.message) fetchPosts();
      else alert('Gagal hapus');
    });
};

// Auto-login if token exists
if (token) showBlog();
else showAuth(); 