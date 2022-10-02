const chalk = require('chalk')
const { describe, demandOption } = require('yargs')
const yargs = require('yargs')
const { removeNote } = require('./notes')
const notes = require('./notes')

// Customize yargs version
yargs.version('1.1.0')

// create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.addNote(argv.title, argv.body)
    }
})

// create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        removeNote(argv.title)
        console.log('Removing a note!')
    }
})

// create list command
yargs.command({
    command: 'list',
    describe: 'Listing notes',
    handler: () => {
        console.log('Listing a note!')
    }
})

yargs.command({
    command: 'read',
    describe: 'Reading a note',
    handler: () => {
        console.log('Reading a note!')
    }
})

yargs.parse()