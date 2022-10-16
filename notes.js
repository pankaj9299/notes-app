const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);

    if(!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNote(notes)
        console.log("New note added!")
    } else {
        console.log('Note title taken')
    }
}

const saveNote = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch(err) {
        return []
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const removeHandler = notes.filter((note) => {
        return note.title !== title
    })
    
    if(notes.length > removeHandler.length) {
        console.log(chalk.blue.inverse("Note Removed!"))
        saveNote(removeHandler)
    } else {
        console.log(chalk.blue.inverse("No Note Found!"))
    }   
}

const listNotes = () => {
    const notes = loadNotes();
    return notes.map((note) => {
        console.log(note.title);
    });
}

const readNote = (title) => {
    const notes = loadNotes();
    const findNote = notes.find((note) => note.title === title);
    if(findNote) {
        console.log(chalk.inverse.blue(findNote.title));
        console.log(findNote.body);
    } else {
        console.log(chalk.inverse.red("Not Found"));
    }
}

module.exports = {
    'addNote': addNote,
    'removeNote': removeNote,
    'listNotes': listNotes,
    'readNote': readNote
}