var weather = [];
var bubbles = [];
var weatherData;
var howMany;

function preload() {
	weatherData = loadJSON("http://api.openweathermap.org/data/2.5/weather?q=Elon,NC&units=imperial&appid=42396ff80468c90bdbb51462e8b1d530", gotData);
}

function setup() {
	createCanvas(960, 480);
	stroke(255);
	fill(255);

	howMany = round(weatherData.main.temp);

  	for (var i = 0; i < howMany; i++) {
	    var x = random(width); // create & init x
	    var y = random(height); // create & init y
	    var diam = 32; // create diameter

	    // pass vars to object using new; push each item into
	    // the bubbles array
	    bubbles.push(new Bubble(x,y,diam)); 

	    // access bubble by number and give it a random rgb color
	    bubbles[i].col = color(random(255), random(255), random(255));
  	}

}

function draw() {

    background(0);
    var h = hour();
    var m = minute();
    var s = second();
    var suffix = "AM";
    var where = weatherData.name;
    var currentTemp = round(weatherData.main.temp); 
    var j = 1;

    if (h > 12) {
    	h = h - 12;
    	suffix = "PM";
    } else {
    	suffix = "AM";
    }

    if (s < 10) {
    	s = "0" + s;
    }

    for (var i = 0; i < bubbles.length; i++) {
    	bubbles[i].move();
    	bubbles[i].display();
  	}

  	fill(255);
    textSize(32);
    text(where, 300, 480-100)
    text(h + ":" + m + ":" + s + " " + suffix, 300, 480-40);
    text(currentTemp + "º", 520, 480-40);

}

function gotData() {

	print(weatherData);

}

function Bubble(x,y,diam, col) {
  this.x = x; // apply parameters to 'this' instance of a particular object
  this.y = y;
  this.diam = diam;
  this.col = color(255, 200); // default color if none provided
  this.str = color(255);

  // display method to make the shape
  this.display = function() {
    stroke(this.str); // stroke color
    fill(this.col); // fill color
    ellipse(this.x, this.y, diam, diam); // draw the ellipse
  }

  // move function to make it wiggle
  this.move = function() {
      this.x = this.x + random(-1, 1); // curr pos of x + random btwn -1 and 1
      this.y = this.y + random(-1, 1); 
  }

  // check for mousex and mousey in the same space as the bubble
  this.contains = function(mx, my) {
    if (dist(mx, my, this.x, this.y) < diam/2) {
      return true; // returning true means it is indeed intersecting
    } else {
      return false; // no intersect
    }
  }
}
