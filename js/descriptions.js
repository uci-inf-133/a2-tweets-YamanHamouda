function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	})
	tweet_array = tweet_array.filter(tweet => tweet.written);

	
}

function addEventHandlerForSearch() {

	const searchBox = document.getElementById("textFilter");

	searchBox.addEventListener("input", function () {
		let searchTerm = searchBox.value.toLowerCase();

		let filteredTweets = tweet_array.filter(function (tweet) {
		let text = tweet.text.toLowerCase();
		return text.includes(searchTerm);
		});

		let count = filteredTweets.length;

		document.getElementById("searchCount").innerHTML = count;
		document.getElementById("searchText").innerHTML  = searchTerm;
		const tableBody = document.getElementById("tweetTable");
		if (searchTerm.trim() === "") {
		tableBody.innerHTML = "";
		return;
		}

		// Populate the table using the Tweet class’s method
		
		let info = "";
		for (let i = 0; i < filteredTweets.length; i++) 
		{
			const row = filteredTweets[i].getHTMLTableRow(i + 1)
			info += row;
    	}
		tableBody.innerHTML = info;

	});
}


//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});