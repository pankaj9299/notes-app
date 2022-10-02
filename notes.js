const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
    return "Your notes..."
}

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNotes = notes.filter((note) => {
        return note.title === title
    });

    if(duplicateNotes.length === 0) {
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

module.exports = {
    'getNotes': getNotes,
    'addNote': addNote,
    'removeNote': removeNote
}