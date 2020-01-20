// user script

// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//myrecipes

function openDiv() {
    var film = document.getElementById("bookingDiv");
    if(film.style.display == "none"){
        film.style.display = "block";
    }
}

function save() {
    openDiv();
    var saveDiv = document.getElementById("bookingDiv");
    if (saveDiv.style.display == "block") {

        localStorage.setItem("isTextVisible", true);

    }

}

function load() {
    var isTextVisible = localStorage.getItem("isTextVisible");
    if (isTextVisible == "true") {

        openDiv();

    }

}