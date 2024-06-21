import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';

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

const blogTitleField = document.querySelector('.title');
const articleField = document.querySelector('.article');
const bannerImage = document.querySelector('#banner-upload');
const banner = document.querySelector(".banner");
let bannerPath;
const publishBtn = document.querySelector('.publish-btn');
const uploadInput = document.querySelector('#image-upload');

const auth = getAuth(app);

bannerImage.addEventListener('change', () => uploadImage(bannerImage, "banner"));
uploadInput.addEventListener('change', () => uploadImage(uploadInput, "image"));

const uploadImage = (uploadFile, uploadType) => {
    const [file] = uploadFile.files;
    if (file && file.type.includes("image")) {
        console.log(`Uploading image: ${file.name}`); // Logging file name
        const formData = new FormData();
        formData.append('image', file);

        fetch('/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Upload successful:', data);
            if (uploadType === "image") {
                addImage(data.imagePath, file.name);
            } else {
                bannerPath = `${location.origin}/${data.imagePath}`;
                banner.style.backgroundImage = `url("${bannerPath}")`;
            }
        })
        .catch(error => {
            console.error('Error uploading image:', error);
            alert('Error uploading image. Please try again.');
        });
    } else {
        alert("Please upload an image file only.");
    }
};

const addImage = (imagePath, alt) => {
    const curPos = articleField.selectionStart;
    const textToInsert = `\r![${alt}](${imagePath})\r`;
    articleField.value = articleField.value.slice(0, curPos) + textToInsert + articleField.value.slice(curPos);
};

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

publishBtn.addEventListener('click', () => {
    if (articleField.value.length && blogTitleField.value.length) {

        let docName;
        if (blogID[0] == 'editor'){
            const letters = 'abcdefghijklmnopqrstuvwxyz';
            const blogTitle = blogTitleField.value.split(" ").join("-");
            const id = Array.from({ length: 4 }, () => letters[Math.floor(Math.random() * letters.length)]).join('');
            const docName = `${blogTitle}-${id}`;
        } else {
            docName = decodeURI(blogID[0]);
        }

        const date = new Date();

        setDoc(doc(db, "blogs", docName), {
            title: blogTitleField.value,
            article: articleField.value,
            bannerImage: bannerPath,
            publishedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
        })
        .then(() => {
            location.href = `/${docName}`;
        })
        .catch((error) => {
            console.error('Error publishing blog:', error);
            alert('Error publishing blog. Please try again.');
        });
    } else {
        alert("Please fill in both the title and the content of the blog.");
    }
});

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = '/admin';
    }
});

const handleLogout = () => {
    signOut(auth)
    .then(() => {
        console.log("User logged out successfully.");
        location.reload();
    })
    .catch((error) => {
        console.error('Error logging out:', error);
    });
};

const logoutButton = document.querySelector('.action-button');
if (logoutButton) {
    logoutButton.addEventListener('click', handleLogout);
} else {
    console.error("Logout button not found.");
}

const blogID = location.pathname.split('/')[1];
if (blogID && blogID !== "editor") {
    const docRef = doc(db, "blogs", decodeURI(blogID));
    getDoc(docRef)
    .then((doc) => {
        if (doc.exists()) {
            let data = doc.data();
            bannerPath = data.bannerImage;
            banner.style.backgroundImage = `url(${bannerPath})`;
            blogTitleField.value = data.title;
            articleField.value = data.article;
        } else {
            location.replace("/");
        }
    })
    .catch((error) => {
        console.error("Error getting document:", error);
    });
}
