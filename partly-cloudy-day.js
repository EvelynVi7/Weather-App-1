function partlyCloudyDay() {
 // randomSeed(4,10,20,50);
  for (var i = 0; i < 3; i++) {
    cloudP(random(-100, 375), random(0, 150),random(0.5,1.5));
  }
}

function cloudP(x, y, k) {
  noStroke();
  fill(200, 150);
  translate(x, y);
  scale(k);
  ellipse(50, 50, 50);
  ellipse(75, 50, 45);
  ellipse(105, 50, 55);
  ellipse(80, 60, 150, 40);
  resetMatrix();
}