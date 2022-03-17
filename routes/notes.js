const notes = require('express').Router();
// const fs = require('fs');
const uuid = require('../../helpers/uuid')
const {
  writeToFile,
  readFromFile,
  readAndAppend,
} = require('../../helpers/fsUtils');


notes.get('/', (req, res) =>{
readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    // console.log(req.body);

    const { title, text } = req.body;
 
    if (title && text) {
      const newNote = {
        title,
        text,
        id: uuid(),
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json('Note added')
    } else {
      res.error('Error in posting note');
    }
});

notes.delete('/:id', (req, res) => {
  let noteId = req.params.id;
  readFromFile('./db/db.json').then((data) => JSON.parse(data)).then((JSON) => {
      let noteResult = JSON.filter((note) => note.id !== noteId)
      writeToFile('./db/db.json', noteResult);
      res.json('delete')
  })
})

module.exports = notes;
