function loadJoke(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           document.getElementsByClassName("humour__joke")[0].innerHTML = JSON.parse(xhr.responseText).joke;
        }
    };

    xhr.open("GET", "https://icanhazdadjoke.com/");
    xhr.setRequestHeader("Accept", "application/json");

    xhr.send();   
}

loadJoke();