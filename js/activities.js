function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	console.log(tweet_array[0].distance);
	console.log(tweet_array[0].activityType);

	let type_dict_amnt = {};
	let type_dict_dist = {};

	let weekdayCount = 0;
	let weekendCount = 0;

	for (let i = 0; i < tweet_array.length; ++i) 
	{
		let type = tweet_array[i].activityType;
		if (type == "unknown") continue; //skip unkowns
		let dist = tweet_array[i].distance;
		let time = new Date(tweet_array[i].time);

		
		let day = time.getDay(); 
		if (day === 0 || day === 6) weekendCount++;
		else weekdayCount++;

		if (!type_dict_amnt[type]) {
			type_dict_amnt[type] = 0;
			type_dict_dist[type] = 0;
		}

		type_dict_amnt[type] += 1;
		type_dict_dist[type] += dist;
	}

	// divide to get average distances
	for (let type in type_dict_dist) 
		type_dict_dist[type] = type_dict_dist[type] / type_dict_amnt[type];
	

	console.log(type_dict_dist);

	document.getElementById("numberActivities").innerText = Object.keys(type_dict_dist).length;

	let sorted = Object.keys(type_dict_dist);

	//sort from largest to smallest average distance
	sorted.sort((a, b) => type_dict_dist[b] - type_dict_dist[a]);

	document.getElementById("firstMost").innerText  = sorted[0];
	document.getElementById("secondMost").innerText = sorted[1];
	document.getElementById("thirdMost").innerText  = sorted[2];

	document.getElementById("longestActivityType").innerHTML = sorted[0];
	document.getElementById("shortestActivityType").innerHTML = sorted[sorted.length - 1];

	
	let result = weekdayCount > weekendCount ? "Weekdays" : "Weekends";
	document.getElementById("weekdayOrWeekendLonger").innerHTML = result;





	//TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.

	activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "data": {
	    "values": tweet_array
	  }
	  //TODO: Add mark and encoding
	};
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});