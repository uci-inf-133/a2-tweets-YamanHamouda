function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	console.log(tweet_array)
	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	document.getElementById('numberTweets').innerText = tweet_array.length;	


	//part 1 Tweet Dates
	const firstDate = new Date(Math.min(...tweet_array.map(t => t.time.getTime())));
	const lastDate = new Date(Math.max(...tweet_array.map(t => t.time.getTime())));
	
	document.getElementById('firstDate').innerText = firstDate.toLocaleDateString("en-US");
	document.getElementById('lastDate').innerText = lastDate.toLocaleDateString("en-US");


	//Tweet Catagories
	completed = 0;
	live = 0;
	achievement = 0;
	misc = 0;
	
	for (i = 0; i < tweet_array.length; ++i)
	{
		if (tweet_array[i].source === "completed_event") ++completed;
		else if (tweet_array[i].source === "achievement") ++achievement;
		else if (tweet_array[i].source === "live-event") ++live;
		else ++misc;
	}


	document.getElementsByClassName('completedEvents')[0].innerText = completed;
	document.getElementsByClassName('completedEventsPct')[0].innerText = ((completed / tweet_array.length)*100).toFixed(2) + '%';

	document.getElementsByClassName('liveEvents')[0].innerText = live;
	document.getElementsByClassName('liveEventsPct')[0].innerText = ((live / tweet_array.length)*100).toFixed(2) + "%";

	document.getElementsByClassName('achievements')[0].innerText = achievement;
	document.getElementsByClassName('achievementsPct')[0].innerText = ((achievement / tweet_array.length)*100).toFixed(2) + "%";

	document.getElementsByClassName('miscellaneous')[0].innerText = misc;
	document.getElementsByClassName('miscellaneousPct')[0].innerText = ((misc / tweet_array.length)*100).toFixed(2) + "%";	
	
	written = 0;
	for (i = 0; i < tweet_array.length; ++i)
	{
		tweet = tweet_array[i]
		if (tweet.source === "completed_event" && tweet.written)
		{
			++written;
		}
	}

	
	document.getElementsByClassName('completedEvents')[1].innerText = completed;
	document.getElementsByClassName('written')[0].innerText = written;
	document.getElementsByClassName('writtenPct')[0].innerText = ((written / completed)*100).toFixed(2) + "%";


}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});

