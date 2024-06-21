import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Firebase configuration
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

// Reference to the blog section in the HTML
const blogSection = document.querySelector('.blogs-section');

// Fetch the blogs from Firestore
const fetchBlogs = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "blogs"));

        const documents = querySnapshot.docs;

        documents.sort((a, b) => b.id.localeCompare(a.id));

        const latestDocuments = documents.slice(0, 4);

        latestDocuments.forEach((doc) => {
            createBlog(doc);
        });
    } catch (error) {
        console.error("Error fetching blogs: ", error);
    }
};

// Function to create blog cards
const createBlog = (blog) => {
    const data = blog.data();
    console.log("Creating blog card with data: ", data); // Debug log
    blogSection.innerHTML += `
    <div class="blog-card">
        <img src="${data.bannerImage}" class="blog-image" alt="Blog Image">
        <h1 class="blog-title">${data.title.substring(0, 100) + '...'}</h1>
        <p class="blog-overview">${data.article.substring(0, 100) + '...'}</p>
        <a href="/${blog.id}" class="btn dark">read</a>
    </div>
    `;
};

// Fetch and display blogs
fetchBlogs();