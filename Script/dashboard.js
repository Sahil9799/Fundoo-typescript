
window.addEventListener('DOMContentLoaded', () => {

    console.log("=> Connected to Dashboard.js");
    let token = localStorage.getItem('token');
    getAllNotes();

    let navbar = document.querySelector(".side-navbar");
    let btn = document.querySelector('#btn');

    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let color = 'Blue';

    console.log(title.value);

    let createnote = document.querySelector('.create-note');
    let closebtn = document.querySelector('.close-btn');
    let oncreate=document.querySelector('.create1');
    let desc=document.querySelector('.create2');

    let closeIcon=document.querySelector('.close-icon');
    let serchbox=document.querySelector('.search-input');

    const displaytnotes=document.querySelector('.notes');
    const Remindernotes=document.querySelector('.Remindernotes');
    const Archivenotes=document.querySelector('.Archivenotes');
    const Trashnotes=document.querySelector('.Trashnotes');

    var noteArray;

    btn.onclick = function () {
        navbar.classList.toggle("opened");
    }

    serchbox.addEventListener('focus',()=>{
        closeIcon.classList.remove('hide')
    })
    serchbox.addEventListener('blur',()=>{
        closeIcon.classList.add('hide');
    })

    oncreate.addEventListener('click', () => {
       toggleNOteFields();
    })

    closebtn.addEventListener('click', () => {
        let notedata = {
            title: title.value,
            description: description.value,
            colour:color
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

    function resetNoteFields()
    {
        document.getElementById('title').value='';
        document.getElementById('description').value='';
    }

    function toggleNOteFields()
    {
        createnote.classList.toggle('expand');
        if(createnote.classList.contains('expand'))
        {
            document.getElementById('title').placeholder = 'Title';
        }
        else
        {
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
                noteArray=result.data;
                noteArray.reverse();
              },
              error: function (error) {
                console.log(error);
              }
        })
    }
    displaytnotes.addEventListener('click',()=>{
        createnote.style.display = 'block'; 
        document.getElementById('Notes').classList.add('display-notes');
        document.getElementById('Notes').classList.remove('other-notes');
        notes=noteArray.filter((x)=>{
            return x.isTrash===false && x.isArchive===false;
        });
        console.log(notes);
        displayAllNotes(notes);
    })

    
    Remindernotes.addEventListener('click',()=>{
        console.log(' showing reminder notes ');
        createnote.style.display = 'block'; // sets the visibility of create-note box to hide
        document.getElementById('Notes').classList.remove('display-notes');
        document.getElementById('Notes').classList.add('other-notes');
        notes=noteArray.filter((x)=>{
            return x.isTrash===false && x.isReminder===true;
        });
        console.log(notes);
        displayReminderNotes(notes);
    })

    // Event Listens when clicked on Archive in sidenav menu and calls displayAllNotes() to display Archived notes
    Archivenotes.addEventListener('click',()=>{
        console.log(' showing archived notes ');
        createnote.style.display = 'none'; // sets the visibility of create-note box to hide
        document.getElementById('Notes').classList.remove('display-notes');
        document.getElementById('Notes').classList.add('other-notes');
        notes=noteArray.filter((x)=>{
            return x.isTrash===false && x.isArchive===true;
        });
        console.log(notes);
        displayAllNotes(notes);
    })

     // Event Listens when clicked on Trash in sidenav menu and calls displayAllNotes() to display Trashed notes
     Trashnotes.addEventListener('click',()=>{
        console.log(' showing trash notes ');
        createnote.style.display = 'none'; // sets the visibility of create-note box to hide
        document.getElementById('Notes').classList.remove('display-notes');
        document.getElementById('Notes').classList.add('other-notes');
        notes=noteArray.filter((x)=>{
            return x.isTrash===true;
        });
        console.log(notes);
        displayTrashNotes(notes);
    })

    
    //function displays the filtered notearray from respective event listener using template literals to pass code dynamically
    function displayAllNotes(Notesdata){
       document.getElementById('Notes').innerHTML=Notesdata.map((note)=>
       `<div class="display-div">
            <div>
                <p class="p1">${note.title}</p>
                <P class="p2">${note.description}</P>
            </div>
            <div class="card-footer">
            <img src="/assets/add_alert_FILL0_wght400_GRAD0_opsz48.svg" />
            <img src="/assets/person_add_FILL0_wght400_GRAD0_opsz48.svg" />
            <img src="/assets/palette_FILL0_wght400_GRAD0_opsz48.svg" />
            <img src="/assets/image_FILL0_wght400_GRAD0_opsz48.svg" />
            <img src="/assets/archive_FILL0_wght400_GRAD0_opsz48.svg" />
            <img src="/assets/more_vert_FILL0_wght400_GRAD0_opsz48.svg" />
            </div>
        </div>
       `
       ).join(' ');
    };

    //function to display trash notes
    function displayTrashNotes(Notesdata){
       document.getElementById('Notes').innerHTML=Notesdata.map((note)=>
       `<div class="display-div">
            <div>
                <p class="p1">${note.title}</p>
                <P class="p2">${note.description}</P>
            </div>
            <div class="card-footer-trash">
                
            </div>
        </div>
       `
       ).join(' ');
    };

    function displayReminderNotes(Notesdata)
    { console.log(Notesdata);
        document.getElementById('Notes').innerHTML=Notesdata.map((note)=>
        `<div class="display-div">
             <div>
                <p class="p1">${note.title}</p>
                <P class="p2">${note.description}</P>
            </div>
            <div class="reminder">
                <P class="p3">Reminder=${note.isReminder}</p>     
            </div>
            <div class="card-footer-trash">
            <img src="/assets/add_alert_FILL0_wght400_GRAD0_opsz48.svg" />
            <img src="/assets/person_add_FILL0_wght400_GRAD0_opsz48.svg" />
            <img src="/assets/palette_FILL0_wght400_GRAD0_opsz48.svg" />
            <img src="/assets/image_FILL0_wght400_GRAD0_opsz48.svg" />
            <img src="/assets/archive_FILL0_wght400_GRAD0_opsz48.svg" />
            <img src="/assets/more_vert_FILL0_wght400_GRAD0_opsz48.svg" />
            </div>
        </div>
        `
    ).join(' ');

   };

})