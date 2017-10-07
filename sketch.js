// Sketch for using the darksky API
// https://darksky.net/dev/docs
// This sketch requires you to start a local server or run it on a server
// See more about how to do that here:
// https://github.com/processing/p5.js/wiki/Local-server


function preload() {

  Img1 = loadImage("boston-01.png");
  Img2 = loadImage("shenzhen-01.png");
  Img3 = loadImage("san-francisco-01.png");

}

var queryResult;
var i = 0;



var cities = [];


function setup() {
  pixelDensity(3.0);

  cities = [{
    "name": "Boston",
    "backgroundImg": Img1,
    "location": '42.3601,-71.0589',
  }, {
    "name": "Shenzhen",
    "backgroundImg": Img2,
    "location": '22.5431,114.0579',
  }, {
    "name": "San Francisco",
    "backgroundImg": Img3,
    "location": '37.7749,-122.4194',
  }]
  query();
}

function touchEnded() {
  if (i < 3) {
    i++;
  }
  if (i === 3) {
    i = 0;
  }
  query();
}

// Run the API call
function query() {


  // URL for querying
  var url = 'https://api.darksky.net/forecast/9888832c6f7dae7e4e7e9866dfe722eb/' + cities[i].location;

  // Query the URL, set a callback
  // 'jsonp' is needed for security
  loadJSON(url, gotData, 'jsonp');
}


// Request is completed
function gotData(data) {
  //  console.log(data);
  queryResult = data;

}

var xDim = 375;
var yDim = 667;

function draw() {

  createCanvas(xDim, yDim);
  //background(200);
  rectMode(CORNER);
  image(cities[i].backgroundImg, 0, 0, xDim, yDim);
  noStroke();
  fill(230);
  rect(0, 400, xDim, (yDim - 400));
  if (queryResult) {

    // only look at current results:
    var currentWeather = queryResult.currently;
    if (currentWeather.icon == "clear-day") {
      clearDay();
    }
    if ((currentWeather.icon == "partly-cloudy-day") || (currentWeather.icon == "partly-cloudy-night")) {
      partlyCloudyDay();
    }
    if (currentWeather.icon == "clear-night") {
      clearNight();
    }
    if (currentWeather.icon == "rain") {
      rain();
    }
    if (currentWeather.icon == "wind") {
      wind();
    }
    if (currentWeather.icon == "fog") {
      fog();
    }
    if (currentWeather.icon == "cloudy") {
      cloudy();
    }

    // a few variables for text formatting
    var xPos = 20;
    var yPos = 40;
    var yGap = 20;
    var textSizeLarge = 15;
    var textSizeSmall = 8;

    // List relevant items of information
    fill(255);
    textStyle(BOLD);

    // The location is not live data, just entered manually
    //textSize(textSizeSmall);
    //text("Location", 20, yPos);
    yPos += textSizeLarge;
    textSize(30);
    textAlign(CENTER);
    text(cities[i].name, xDim/2, yPos+4*yGap);
    textSize(20);
    text(currentWeather.icon,xDim/2,yPos+4*yGap+30)
    //yPos += yGap;
    textAlign(LEFT);

    /*textSize(textSizeSmall);
    text("Weather", 20, yPos);
    yPos += textSizeLarge;
    textSize(textSizeLarge);
    text(currentWeather.icon, 20, yPos);
    yPos += yGap;

    textSize(textSizeSmall);
    text("Temperature", 20, yPos);
    yPos += textSizeLarge;
    textSize(textSizeLarge);
    text(currentWeather.temperature + "º,  " + queryResult.daily.data[0].temperatureLow + "º - " + queryResult.daily.data[0].temperatureHigh, 20, yPos);
    yPos += yGap;

    textSize(textSizeSmall);
    text("Chance of Rain", 20, yPos);
    yPos += textSizeLarge;
    textSize(textSizeLarge);
    text((currentWeather.precipProbability * 100) + "%", 20, yPos);
    yPos += yGap;

    textSize(textSizeSmall);
    text("Humidity", 20, yPos);
    yPos += textSizeLarge;
    textSize(textSizeLarge);
    text((currentWeather.humidity * 100) + "%", 20, yPos);
    yPos += yGap;

    textSize(textSizeSmall);
    text("Wind Speed", 20, yPos);
    yPos += textSizeLarge;
    textSize(textSizeLarge);
    text((currentWeather.windSpeed) + "mph", 20, yPos);
    yPos += yGap;*/

    textSize(textSizeLarge);
    var tempLowX = 70 + (xDim - 140) * (queryResult.daily.data[0].temperatureLow + 30) / 150;
    var tempWidth = (xDim - 140) * (queryResult.daily.data[0].temperatureHigh - queryResult.daily.data[0].temperatureLow) / 150;

    text("-30º F", 20, 400 + 2 * yGap + 10);
    text("120º F", xDim - 55, 400 + 2 * yGap + 10);


    strokeWeight(1);
    stroke(255);
    noFill();
    rect(70, 400 + 2 * yGap, xDim - 140, 10);
    fill(255);
    rect(tempLowX, 400 + 2 * yGap, tempWidth, 10);
    var tempX = 70 + (xDim - 140) * (currentWeather.temperature + 30) / 150;
    line(tempX, 400 + 2 * yGap - 10, tempX, 400 + 2 * yGap + 20);
    noStroke();
    text(currentWeather.temperature + "º", tempX, 400 + 2 * yGap + 20 + textSizeLarge);

    translate(50, 520);
    stroke(255);
    strokeWeight(1);
    // fill(255);
    // triangle(0,-50,-20,0,20,0);
    // arc(0,0,40,40,2*PI,PI);
    noFill();
    push();
    for (var j = 0; j < 10; j++) {
      line(0, -20, -10, 0);
      line(0, -20, 10, 0);
      arc(0, 0, 20, 20, 2 * PI, PI);
      translate(30, 0);
    }
    pop();
    for (j = 0; j < floor(currentWeather.humidity * 10); j++) {
      fill(255);
      triangle(0, -20, -10, 0, 10, 0);
      arc(0, 0, 20, 20, 2 * PI, PI);
      translate(30, 0);
    }
    resetMatrix();
    translate(50, 580);
    push();
    stroke(255);
    strokeWeight(1);
    noFill();

    // beginShape();
    // vertex(0,0);
    // bezierVertex(100,50,200,0,275,50);
    // endShape();
    //   line(0, 0, 0, 10);
    //   line(275, 0, 275, 10);
    for (var sinX = 0; sinX < 275; sinX += 0.01) {
      point(sinX, 15 * sin(0.03 * sinX));
    }
    translate(0, 10);
    for (sinX = 0; sinX < 275; sinX += 0.01) {
      point(sinX, 15 * sin(0.03 * sinX));
    }
    translate(0, 20);
    for (sinX = 0; sinX < 275; sinX += 0.01) {
      point(sinX, 15 * sin(0.03 * sinX));
    }
    translate(0, 10);
    for (sinX = 0; sinX < 275; sinX += 0.01) {
      point(sinX, 15 * sin(0.03 * sinX));
    }
    
    pop();
    var sinXLimit = map(currentWeather.windSpeed,0,40,0,275);
    for (sinX = 0; sinX < sinXLimit; sinX += 0.01) {
      ellipse(sinX, (15 * sin(0.03 * sinX)+5),10);
    }
    translate(0, 30);
    for (sinX = 0; sinX < sinXLimit; sinX += 0.01) {
      ellipse(sinX, (15 * sin(0.03 * sinX)+5),10);
    }
    






  }


}