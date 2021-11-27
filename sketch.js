var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombieImg;
var bulletImg;


function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")
zombieImg = loadImage("assets/zombie.png");
bulletImg = loadImage("assets/bullet1.png");
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

bulletGroup = new Group();
zombieGroup = new Group();
}

function draw() {
  background(0); 
if(bulletGroup.collide(zombieGroup)){
  bulletGroup.destroyEach();
  zombieGroup.destroyEach();
}



  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
  showBullet();
}


//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
  
}

spawnZombies();
drawSprites();

}
function spawnZombies(){
if(frameCount%150===0){
  zombie = createSprite(windowWidth, windowHeight-150,10,40);
  zombie.y = Math.round(random(windowHeight-600,windowHeight));
  zombie.velocityX = -5;
  zombie.addImage(zombieImg);
  zombie.scale = 0.15;
  zombieGroup.add(zombie);
}
}
function showBullet(){
  bullet = createSprite(player.x+80, player.y-20,10,10);
  bullet.velocityX= 5;
  bullet.addImage(bulletImg);
  bullet.scale = 0.1;
  bulletGroup.add(bullet);
}