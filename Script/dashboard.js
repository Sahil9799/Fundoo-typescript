var nav = false;
function menutoggle(){
    
    
    nav ? closeNav() : openNav();
}

function openNav(){
    document.getElementById("side-nav").style.width = "250px";
    
    nav = true;
}

function closeNav(){
    document.getElementById("side-nav").style.width = "78px";
    
    nav = false;
}


function openCard(){
  document.getElementsByClassName("create-note")
}

function closeCard(){
  
}

var noteArray;


function getAllNotes(){
    let token = localStorage.getItem('token');

    $.ajax({
        url:'https://localhost:44349/Note',
        type:'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': token
        },
        success: function(result){
            console.log(result.data);
            noteArray = result.data;
        },
        error: function(error){
            console.log(error);
        }
    })
}

