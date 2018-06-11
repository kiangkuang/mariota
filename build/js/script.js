// API: Joke Loading
var lock = false
var jokes = [];
loadJoke();

function loadJoke(retry) {
    if (!lock || retry) {
        lock = true;
        $('.humour__reload').addClass('animate');
        $.get('https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_joke')
        .done(function(joke) {
            if (!jokes.includes(joke.id)) {
                jokes.push(joke.id);
                $('.humour__joke').text(joke.setup + ' ' + joke.punchline);
                $('.humour__tag').text(joke.type);
                $('.splash').addClass('hide');
                $('.humour__reload').removeClass('animate');
                lock = false;
            } else {
                loadJoke(true);
            }
        });    
    }
}