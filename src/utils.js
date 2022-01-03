const path = require('path');
const fs = require('fs');
const chalk = require('chalk');


const errorMsg = chalk.bgRed;
const successMsg = chalk.hex('343a40').bgGreenBright;
const warningMsg = chalk.white.bgYellow.blackBright;
const PATH = path.join(__dirname, 'data.json')

function loadNotes() {
    try {
        const dataBuffer = fs.readFileSync(PATH);
        const dataString = dataBuffer.toString();
        
        const data = JSON.parse(dataString);
        return data;
    }
    catch (error) {
        return [];
    }
}

function saveNote(data, note) {
    data.push(note);
    fs.writeFileSync(PATH, JSON.stringify(data));
}

function addNote(title, body) {
    try {
        const data = loadNotes();
        if (Array.isArray(data) && data.length === 0) {
            console.log(warningMsg('First note ever!'));
        }

        else if (data.find(note => note.title === title)) {
            console.log(warningMsg('Note title taken'));
            return;
        }

        const note = {
            title: title,
            body: body
        }
        saveNote(data, note);
        console.log(successMsg('Nota agregada con éxito'));
    }
    catch (error) {
        console.log(errorMsg(error.message));
    }
}

function removeNote(title) {
    try {
        const data = loadNotes();
        const pos = data.findIndex(note => note.title == title);
        
        if (pos === -1) {
            console.log(warningMsg('No note found'));
            return;
        }
        
        const removed = data.splice(pos, 1);
        fs.writeFileSync(PATH, JSON.stringify(data));
        
        console.log(successMsg('Note removed successfully'));
        console.log('-'.repeat(50));
        console.log(warningMsg(removed[0].title));
        console.log(warningMsg(removed[0].body));
    }
    catch (error) {
        console.log(errorMsg(error.message));
    }
}

function getNote(title) {
    try {
        const data = loadNotes();
        const pos = data.findIndex(note => note.title == title);

        if (pos === -1) {
            console.log(warningMsg('No note found'));
            return;
        }
        
        const note = data[pos];
        console.log('-'.repeat(50));
        console.log(warningMsg(note.title));
        console.log(warningMsg(note.body));
    }
    catch (error) {
        console.log(errorMsg(error.message));
    }
}

function listNotes() {
    try {
        const data = loadNotes();
        if (Array.isArray(data) && data.length < 0) {
            console.log(warningMsg('No notes registered'));
            return
        }

        console.log(successMsg('Your notes:'), '\n');
        data.forEach(note => {
            console.log('>>')
            console.log(`title: ${note.title}`);
            console.log(`body: ${note.body}`);
            console.log();
        })
    }
    catch (error) {
        console.log(errorMsg(error.message));
    }
}


module.exports = {
    addNote,
    removeNote,
    getNote,
    listNotes,
};