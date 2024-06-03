const express = require('express');
const path = require('path');
const fileupload = require('express-fileupload');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(fileupload());

const uploadsDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "blogs.html"));
});

app.get('/editor', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "editor.html"));
});

app.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.image) {
        console.log('No files were uploaded.');
        return res.status(400).send('No files were uploaded.');
    }

    let file = req.files.image;
    if (!file.mimetype.startsWith('image/')) {
        console.log('Only image files are allowed.');
        return res.status(400).send('Only image files are allowed.');
    }

    if (file.size > 100 * 1024 * 1024) { // 2MB limit
        console.log('File size exceeds the limit of 100MB.');
        return res.status(400).send('File size exceeds the limit of 100MB.');
    }

    let date = new Date();
    let imagename = `${date.getDate()}${date.getTime()}${path.extname(file.name)}`;
    let uploadPath = path.join(uploadsDir, imagename);

    file.mv(uploadPath, (err) => {
        if (err) {
            console.error('File upload error:', err);
            return res.status(500).send(err);
        } else {
            console.log(`File uploaded successfully: ${imagename}`);
            res.json({ imagePath: `uploads/${imagename}` });
        }
    });
});

app.get("/:blog", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "blog.html"));
});

app.use((req, res) => {
    res.status(404).json("404 - Not Found");
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
