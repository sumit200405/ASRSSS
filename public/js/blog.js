import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDLeOxfyJHqFHJO33WDEjQfV0pEc_NqFRA",
    authDomain: "asrsss.firebaseapp.com",
    projectId: "asrsss",
    storageBucket: "asrsss.appspot.com",
    messagingSenderId: "601506172253",
    appId: "1:601506172253:web:f785757801627affb1acb4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let blogId = decodeURI(location.pathname.split("/").pop());

let docRef = doc(db, "blogs", blogId);

getDoc(docRef).then((doc) => {
    if (doc.exists()) {
        setupBlog(doc.data());
    } else {
        location.replace("/");
    }
}).catch(error => {
    console.error("Error getting document:", error);
});

const setupBlog = (data) => {
    const banner = document.querySelector('.banner');
    const blogTitle = document.querySelector('.title');
    const titleTag = document.querySelector('title');
    const publish = document.querySelector('.published');

    banner.style.backgroundImage = `url(${data.bannerImage})`;

    titleTag.innerHTML += blogTitle.innerHTML = data.title;
    publish.innerHTML += data.publishedAt;

    const article = document.querySelector('.article');
    addArticle(article, data.article);
}

const addArticle = (ele, data) => {
    data = data.split("\n").filter(item => item.length);
    data.forEach(item => {
        if (item.startsWith('#')) {
            let hCount = 0;
            let i = 0;
            while (item[i] === '#') {
                hCount++;
                i++;
            }
            let tag = `h${hCount}`;
            ele.innerHTML += `<${tag}>${item.slice(hCount).trim()}</${tag}>`
        } else if (item.startsWith('![') && item.includes('](')) {
            let alt = item.substring(item.indexOf('[') + 1, item.indexOf(']'));
            let src = item.substring(item.indexOf('(') + 1, item.indexOf(')'));
            ele.innerHTML += `<img src="${src}" alt="${alt}" class="article-image">`;
        } else {
            ele.innerHTML += `<p>${item}</p>`;
        }
    });
}