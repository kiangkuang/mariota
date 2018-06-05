function loadJoke(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var joke = JSON.parse(xhr.responseText);
            document.getElementsByClassName("humour__joke")[0].innerHTML = joke.setup + " " + joke.punchline;
            document.getElementsByClassName("humour__tag")[0].innerHTML = joke.type;
        }
    };

    xhr.open("GET", "https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_joke");
    xhr.send();
}

loadJoke();