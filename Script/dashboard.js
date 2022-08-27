// window.addEventListener('DOMContentLoaded', () => {



//     console.log("=> Connected to Dashboard.js");
    const token = localStorage.getItem('token');
     getAllNotes();
    

    const navbar = document.querySelector(".side-navbar");
    const btn = document.querySelector('#btn');

    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const color = 'Blue';

    console.log(title.value);

    const createnote = document.querySelector('.create-note');
    const closebtn = document.querySelector('.close-btn');
    const oncreate = document.querySelector('.create1');
    const desc = document.querySelector('.create2');

    const closeIcon = document.querySelector('.close-icon');
    const serchbox = document.querySelector('.search-input');

    const displaynotes = document.querySelector('.notes');
    const Archivenotes = document.querySelector('.Archivenotes');
    const Trashnotes = document.querySelector('.Trashnotes');

    


    var noteArray;

    btn.onclick = function () {
        navbar.classList.toggle("opened");
    }

    serchbox.addEventListener('focus', () => {
        closeIcon.classList.remove('hide')
    })
    serchbox.addEventListener('blur', () => {
        closeIcon.classList.add('hide');
    })

    oncreate.addEventListener('click', () => {
        toggleNOteFields();
    })

    closebtn.addEventListener('click', () => {
        let notedata = {
            title: title.value,
            description: description.value,
            colour: color
        }
        console.log(notedata);
        $.ajax({
            url: 'https://localhost:44349/Note',
            type: 'POST',
            data: JSON.stringify(notedata),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            success: function (result) {
                console.log(result);
                resetNoteFields();
                toggleNOteFields();
                getAllNotes();
            },
            error: function (error) {
                console.log(error);
                toggleNOteFields();
            }
        })
    })

    function resetNoteFields() {
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
    }

    function toggleNOteFields() {
        createnote.classList.toggle('expand');
        if (createnote.classList.contains('expand')) {
            document.getElementById('title').placeholder = 'Title';
        }
        else {
            document.getElementById('title').placeholder = 'Take a note...';
            resetNoteFields();
        }
    }

    function getAllNotes() {
        $.ajax({
            url: 'https://localhost:44349/Note',
            type: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            success: function (result) {
                console.log(result);
                noteArray = result.data;
                noteArray.reverse();
                displaynotes.click();
            },
            error: function (error) {
                console.log(error);
            }
        })
    }


    function archiveNote(noteId){
        $.ajax({
            url:`https://localhost:44349/Note/ArchiveNote?noteId=${noteId}`,
            type:'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            success: function (result) {
                console.log(result);
                getAllNotes();
            },
            error: function (error) {
                console.log(error);
            }
        })
    }

    function TrashNote(NoteId)
    {
        $.ajax({
            url: `https://localhost:44349/Note/TrashNote?NoteId${NoteId}`,
            type: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            success: function (result) {
                console.log(result);
                getAllNotes();
            },
            error: function (error) {
                console.log(error);
            }
        })
    }
    

    displaynotes.addEventListener('click', () => {
        createnote.style.display = 'block';
        document.getElementById('Notes').classList.add('display-notes');
        // document.getElementById('Notes').classList.remove('other-notes');
        notes = noteArray.filter((x) => {
            return x.isTrash === false && x.isArchive === false;
        });
        console.log(notes);
        displayAllNotes(notes);
    })



    Archivenotes.addEventListener('click', () => {
        console.log(' showing archived notes ');
        createnote.style.display = 'none';
        document.getElementById('Notes').classList.remove('display-notes');
        document.getElementById('Notes').classList.add('other-notes');
        notes = noteArray.filter((x) => {
            return x.isTrash === false && x.isArchive === true;
        });
        console.log(notes);
        displayAllNotes(notes);
    })


    Trashnotes.addEventListener('click', () => {
        console.log(' showing trash notes ');
        createnote.style.display = 'none';
        document.getElementById('Notes').classList.remove('display-notes');
        document.getElementById('Notes').classList.add('other-notes');
        notes = noteArray.filter((x) => {
            return x.isTrash === true;
        });
        console.log(notes);
        displayTrashNotes(notes);
    })



    function displayAllNotes(Notesdata) {
        document.getElementById('Notes').innerHTML = Notesdata.map((note) =>
            `<div class="display-div">
            <div>
                <p class="p1">${note.title}</p>
                <P class="p2">${note.description}</P>
            </div>
            <div class="card-footer">
            <button>
            <img src="/assets/add_alert_FILL0_wght400_GRAD0_opsz48.svg" />
            </button>
            <button>
            <img src="/assets/person_add_FILL0_wght400_GRAD0_opsz48.svg" />
           </button>

           <button>
            <img src="/assets/palette_FILL0_wght400_GRAD0_opsz48.svg" />
            </button>
           <button>
            <img src="/assets/image_FILL0_wght400_GRAD0_opsz48.svg" />
            </button>
            <button>
            <img onclick="archiveNote(${note.noteId})" src="/assets/archive_FILL0_wght400_GRAD0_opsz48.svg" />
            </button>
           <button >
            <img onclick="TrashNote(${note.noteId})" src="/assets/delete_FILL0_wght400_GRAD0_opsz48.svg" />
           </button>
            </div>
        </div>
       `
        ).join(' ');
    };


    function displayTrashNotes(Notesdata) {
        document.getElementById('Notes').innerHTML = Notesdata.map((note) =>
            `<div class="display-div">
            <div>
                <p class="p1">${note.title}</p>
                <P class="p2">${note.description}</P>
            </div>
            <div class="card-footer-trash">
            <img src="/assets/delete_forever_FILL0_wght400_GRAD0_opsz48.svg" />
            <img src="/assets/restore_from_trash_FILL0_wght400_GRAD0_opsz48.svg" />
                
            </div>
        </div>
       `
        ).join(' ');
    };
// })


   