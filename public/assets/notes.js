const {json} = require("express");
const noteSave = document.getElementById('saveButton');

noteForm .addEventListener('click', (e) => {
    e.preventDefault();

    let newTitle = document.getElementById(newTitle).value;

    let newNote = document.getElementById(newNote).value;

    const nextNote = {
        newTitle,
        newNote
    }

    fetch('api/notes', {
        method: 'POST',
        headers:{
            'Content-type': 'application/json'
        },
        body: JSON.stringify(nextNote),
    })
    .then((res) => res.json())
    .then((data) => {
        alert(data.status);
        newTitle = '';
        newNote = '';
    });
})

.catch((err) => {
    console.log('Error', err);
})