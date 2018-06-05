function loadJoke(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           document.getElementsByClassName("humour__joke")[0].innerHTML = xhr.responseText;
        }
    };

    xhr.open("GET", "https://icanhazdadjoke.com/");
    xhr.setRequestHeader("Accept", "text/plain");

    xhr.send();   
}

loadJoke();