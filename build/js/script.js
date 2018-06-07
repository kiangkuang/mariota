// API: Joke Loading
var jokes = [];
loadJoke();

function loadJoke() {
    $.get('https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_joke')
    .done(function(joke) {
        if (!jokes.includes(joke.id)) {
            jokes.push(joke.id);
            $('.humour__joke').text(joke.setup + ' ' + joke.punchline);
            $('.humour__tag').text(joke.type);
            $('.splash').addClass('hide');
        } else {
            loadJoke();
        }
    });
}


// CSS Animation: Reload button
$('.humour__reload').click(function() {
	var $this = $(this).addClass('animate');
	window.setTimeout(function(){
		$this.removeClass('animate');
	}, 1000);
});
