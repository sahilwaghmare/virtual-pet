var dog,happydog,foodstock,foodS,database,dogI,happydogI;

function preload(){
  dogI = loadImage('Dog.png');
  happydogI = loadImage('happydog.png');
}

function setup(){
  createCanvas(1000,1000);
  dog = createSprite(500,600,20,20);
  dog.scale=0.5;
  dog.addImage(dogI);
  drawSprites();

  database = firebase.database();
  foodstock=database.ref('Food');
  foodstock.on("value",readStock);
}

function draw(){
  background(46, 139, 87);

  if (keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happydogI);
  }

  if (keyWentDown(DOWN_ARROW)){
    writeStock(foodS);
    dog.addImage(dogI);
  }

  drawSprites();
  textSize(30);

  text("Pres the up arrow key to make Drago hungry", 200,200);
  fill("black");
  stroke(4);

  text("Pres the down arrow key to make Drago hungry", 200,300);
  fill(0,0,0);
  stroke(4);

  text("Food Remaining  " + foodS, 200,400);
  fill(0,0,0);
  stroke(4);
}

function readStock(data){
  foodS = data.val();
}

function writeStock (x) {
  if (x<=0){
    x=0
  }else{
    x=x-1
  }

  database.ref('/').update({
    Food:x
  })
}