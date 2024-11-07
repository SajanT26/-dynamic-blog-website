document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('postForm')) {
        setupPostForm();
    }
});

function setupPostForm() {
    const postForm = document.getElementById('postForm');
    
    postForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value.trim();
        const content = document.getElementById('content').value.trim();
        const image = document.getElementById('image').value.trim();

        if (title === '' || content === '') {
            alert("Title and Content are required.");
            return;
        }

        const newPost = {
            id: Date.now(),
            title,
            content,
            image
        };

        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push(newPost);
        localStorage.setItem('posts', JSON.stringify(posts));

        alert("Post saved");
        window.location.href = 'index.html';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('postForm')) {
        setupPostForm();
    }

    const backButton = document.getElementById('backButton');
    if (backButton) {
        backButton.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    if (postId) {
        loadPost(postId);
    }

    const editButton = document.getElementById('editButton');
    if (editButton) {
        editButton.addEventListener('click', () => {
            switchToEditMode(postId);
        });
    }

    const saveButton = document.getElementById('saveButton');
    if (saveButton) {
        saveButton.addEventListener('click', () => {
            savePost(postId);
        });
    }

    const cancelButton = document.getElementById('cancelButton');
    if (cancelButton) {
        cancelButton.addEventListener('click', () => {
            switchToViewMode();
        });
    }
});

function setupPostForm() {
    const postForm = document.getElementById('postForm');
    
    postForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value.trim();
        const content = document.getElementById('content').value.trim();
        const image = document.getElementById('image').value.trim();

        if (title === '' || content === '') {
            alert("Title and Content are required.");
            return;
        }

        const newPost = {
            id: Date.now(),
            title,
            content,
            image
        };

        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push(newPost);
        localStorage.setItem('posts', JSON.stringify(posts));

        alert("Post saved");
        window.location.href = 'index.html';
    });
}

function loadPost(postId) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const post = posts.find(p => p.id == postId);
    if (post) {
        document.getElementById('postTitle').textContent = post.title;
        document.getElementById('postContentText').textContent = post.content;
        const postImage = document.getElementById('postImage');
        if (post.image) {
            postImage.src = post.image;
            postImage.style.display = 'block';
        } else {
            postImage.style.display = 'none';
        }
    } else {
        alert('Post not found!');
    }
}

function switchToEditMode(postId) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const post = posts.find(p => p.id == postId);
    if (post) {
        document.getElementById('pageTitle').textContent = "Edit Blog Post";
        document.getElementById('postContent').style.display = 'none';
        document.getElementById('editForm').style.display = 'block';

        document.getElementById('editTitle').value = post.title;
        document.getElementById('editContent').value = post.content;
        document.getElementById('editImage').value = post.image || '';
    
        document.getElementById('editButton').style.display = 'none';
        document.getElementById('saveButton').style.display = 'inline-block';
        document.getElementById('cancelButton').style.display = 'inline-block';
    }
}

function savePost(postId) {
    const updatedPost = {
        title: document.getElementById('editTitle').value,
        content: document.getElementById('editContent').value,
        image: document.getElementById('editImage').value || null,
    };

    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const postIndex = posts.findIndex(p => p.id == postId);
    if (postIndex !== -1) {
        posts[postIndex] = { ...updatedPost, id: postId };
        localStorage.setItem('posts', JSON.stringify(posts));
    }

    window.location.href = "index.html";  
}

function switchToViewMode() {
    document.getElementById('pageTitle').textContent = "View Blog Post";
    document.getElementById('postContent').style.display = 'block';
    document.getElementById('editForm').style.display = 'none';

    document.getElementById('editButton').style.display = 'inline-block';
    document.getElementById('saveButton').style.display = 'none';
    document.getElementById('cancelButton').style.display = 'none';
}

function deletePost(postId) {
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts = posts.filter(post => post.id !== postId);  
    localStorage.setItem('posts', JSON.stringify(posts)); 

    alert("Post deleted successfully!");
    window.location.href = 'index.html';  
}