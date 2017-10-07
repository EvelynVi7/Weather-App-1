function cloudy() {
 // randomSeed(4,10,20,50);
  for (var i = 0; i < 5; i++) {
    cloud(random(-100, 375), random(0, 150),random(0.5,1.5));
  }
}

function cloud(x, y, k) {
  noStroke();
  fill(200);
  translate(x, y);
  scale(k);
  ellipse(50, 50, 50);
  ellipse(75, 50, 45);
  ellipse(105, 50, 55);
  ellipse(80, 60, 150, 40);
  resetMatrix();
}