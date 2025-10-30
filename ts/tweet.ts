class Tweet {
	private text:string;
	time:Date;

	constructor(tweet_text:string, tweet_time:string) {
        this.text = tweet_text;
		this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
	}

	//returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source():string {
        //TODO: identify whether the source is a live event, an achievement, a completed event, or miscellaneous.

        if (this.text.toLowerCase().includes("complete") || this.text.toLowerCase().includes("posted")) return "completed_event";
        else if (this.text.toLowerCase().includes("achieved")) return "achievement";
        else if (this.text.toLowerCase().includes("now")) return "live-event";
        

        //else
        return "miscellaneous";
        
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        //TODO: identify whether the tweet is written
        if (this.text.toLowerCase().includes("check it out")) return false;
        //else
        return true;
    }

    get writtenText():string {
        if(!this.written) {
            return "";
        }
        //TODO: parse the written text from the tweet
        return "";
    }

    get activityType(): string {
        if (this.source !== "completed_event" || !this.distance) return "unknown";

        const words: string[] = this.text.toLowerCase().split(" ");
        const unitIndex: number = words.indexOf("km") !== -1 ? words.indexOf("km") : words.indexOf("mi");

        // Pick activity word after distance or after "completed"
        const activityIndex: number =
            unitIndex !== -1 ? unitIndex + 1 : words.indexOf("completed") + 1;

        let activity: string =
            activityIndex > 0 && activityIndex < words.length ? words[activityIndex] : "unknown";

        return activity;
}


    get distance():number {
        if(this.source != 'completed_event') {
            return 0;
        }
        //TODO: prase the distance from the text of the tweet
        const split_text: string[] = this.text.split(" ");

        if (split_text[4] != "mi" && split_text[4] != "km") return 0;
        const multiplier : number = split_text[4] == "mi" ? 1 : 0.621371
        const dist: number = Number(split_text[3]) * multiplier;
        
        
        return dist;
    }

    getHTMLTableRow(rowNumber: number): string 
    {
    
        const tcoRegex = /https:\/\/t\.co\/\w+/g;
        const linkedText = this.text.replace(tcoRegex, (m) => {
            return `<a href="${m}" target="_blank" rel="noopener noreferrer">${m}</a>`; //ai'd this lol
        });

        return `
            <tr>
            <td>${rowNumber}</td>
            <td>${this.activityType}</td>
            <td>${linkedText}</td>
            </tr>
        `;
    }

}