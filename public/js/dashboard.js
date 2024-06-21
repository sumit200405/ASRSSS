import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getFirestore, collection, getDocs, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';

const firebaseConfig = {
    apiKey: "AIzaSyDLeOxfyJHqFHJO33WDEjQfV0pEc_NqFRA",
    authDomain: "asrsss.firebaseapp.com",
    projectId: "asrsss",
    storageBucket: "asrsss.appspot.com",
    messagingSenderId: "601506172253",
    appId: "1:601506172253:web:f785757801627affb1acb4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = '/admin';
    }
});

// Reference to the blog section in the HTML
const blogSection = document.querySelector('.blogs-section');

// Fetch the blogs from Firestore
const fetchBlogs = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "blogs"));
        querySnapshot.forEach((doc) => {
            if (doc.id !== decodeURI(location.pathname.split("/").pop())) {
                createBlog(doc);
            }
        });
    } catch (error) {
        console.error("Error fetching blogs: ", error);
    }
};

window.deleteBlog = async (id) => {
    try {
        await deleteDoc(doc(db, 'blogs', id));
        location.reload();
    } catch (error) {
        console.error("Error deleting the blog:", error);
    }
};

// Function to create blog cards
const createBlog = (blog) => {
    const data = blog.data();
    if (!data) {
        console.error("Blog data is undefined or null for blog ID:", blog.id);
        return;
    }
    const bannerImage = data.bannerImage || 'default_image_url'; // Provide a default image URL if none exists
    const title = data.title || 'Untitled';
    const article = data.article || 'No content available';

    blogSection.innerHTML += `
    <div class="blog-card">
        <img src="${bannerImage}" class="blog-image" alt="Blog Image">
        <h1 class="blog-title">${title.substring(0, 100) + '...'}</h1>
        <p class="blog-overview">${article.substring(0, 100) + '...'}</p>
        <div class="buttons">
            <a href="/${blog.id}" class="btn dark">READ</a>
            <a href="/${blog.id}/editor" class="btn grey">EDIT</a>
            <a href="#" onclick="deleteBlog('${blog.id}')" class="btn red">DELETE</a>
        </div>
    </div>
    `;
};

const handleLogout = () => {
    signOut(auth).then(() => {
        console.log("User logged out successfully.");
        window.location.href = '/'; // Redirect to the home page after logout
    }).catch((error) => {
        console.error("Logout error:", error);
    });
};

// Add event listener to the logout button
const logoutButton = document.querySelector('.logout');
if (logoutButton) {
    logoutButton.addEventListener('click', handleLogout);
} else {
    console.error("Logout button not found.");
}

// Fetch and display blogs
fetchBlogs();