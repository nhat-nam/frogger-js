WIDTH = 1000;
HEIGHT = 500;
TIME_TO_MOVE = 250;
canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
ctx.fillStyle = "black";
ctx.fillRect(0, 0, WIDTH, HEIGHT);
var map = [
            "gwwggwwggwwggwwggwwgg",
            "wwwwwwwwwwwwwwwwwwwww",
            "wwwwwwwwwwwwwwwwwwwww",
            "wwwwwwwwwwwwwwwwwwwww",
            "wwwwwwwwwwwwwwwwwwwww",
            "wwwwwwwwwwwwwwwwwwwww",
            "ggggggggggggggggggggg",
            "rrrrrrrrrrrrrrrrrrrrr",
            "rrrrrrrrrrrrrrrrrrrrr",
            "rrrrrrrrrrrrrrrrrrrrr",
            "rrrrrrrrrrrrrrrrrrrrr",
            "rrrrrrrrrrrrrrrrrrrrr",
            "ggggggggggggggggggggg"
         ];

var objMap = [
               "c  c  c  c  c  c  c  c  c  c  c  c  c  c  c  c  c  c  c  c  c  ",
         
         ];


function Game(context, width, height) {

   this.ctx = context;
   this.width = width;
   this.height = height;
   this._delta = 1000/100;

   this._prevTime = 0;

   var num_rows = 13;
   var num_cols = 21;

   this.grid_height = height/num_rows;
   this.grid_width = width/num_cols;
   this.tileMap = new FroggerTileMap(width, height, width/num_cols, height/num_rows);
   this.tileMap.loadTiles(map);


   this.frog = new Frog();
   this.frog.x = width / num_cols * Math.floor(num_cols/2);
   this.frog.y = (height / num_rows) * (num_rows-1);

   //
   this.entities = [];
   var fc = new FroggerCar();
   fc.x = 0;
   fc.y=0;
   fc.dx = 0;
   this.entities.push(fc);


   this.loadObjMap = function(o_map){



   }

   /** 
   *  Update
   **/
   this.update = function(delta) {
      

      // loop through game entities and update each
      
      this.frog.update(delta);

   }
   /**
   *  Render game objects
   * 
   *  
   **/
   this.render = function() {
         this.ctx.clearRect(0, 0, this.width, this.height);
         this.ctx.fillStyle = "black";
         this.tileMap.render(this.ctx);
         
         this.frog.render(this.ctx);
   }

   this.moveTo = function(obj, x, y, t){
      if(Math.abs(obj.x - x) != 0){
         var dist = -1*(obj.x - x);
         obj.dx = dist/(t/1000);
         obj.lock = true;
         setTimeout(function(){
            obj.dx = 0;
            obj.x = x;
            obj.lock = false;

         }, t);
      }else{
         var dist = -1*(obj.y - y);

         obj.dy = dist/(t/1000);
         obj.lock = true;
         setTimeout(function(){
            obj.dy = 0;
            obj.y = y;
            obj.lock = false;
         }, t);
      }
         
   }
   this.moveFrogLeft = function(){
      //can he move ?
      if(!this.frog.lock)
         this.moveTo(this.frog, this.frog.x - this.grid_width , this.frog.y, TIME_TO_MOVE);
   }
   this.moveFrogRight = function(){
      //can he move ?
      if(!this.frog.lock)
         this.moveTo(this.frog, this.frog.x + this.grid_width , this.frog.y, TIME_TO_MOVE);
   }
   
   this.moveFrogDown = function(){
      //can he move ?
      if(!this.frog.lock)
         this.moveTo(this.frog, this.frog.x , this.frog.y + this.grid_height, TIME_TO_MOVE);
   }  
   this.moveFrogUp = function(){
      //can he move ?
      if(!this.frog.lock)
         this.moveTo(this.frog, this.frog.x , this.frog.y - this.grid_height, TIME_TO_MOVE);
   }
   
}

window.onkeydown = function(e){
   if(e.key == "ArrowUp"){
      game.moveFrogUp();
   }
   if(e.key == "ArrowDown"){
      game.moveFrogDown();
   }
   if(e.key == "ArrowRight"){
      game.moveFrogRight();
   }
   if(e.key == "ArrowLeft"){
      game.moveFrogLeft();
   }
}


// create game and start game
var game = new Game(ctx, WIDTH, HEIGHT);


//game.loop();
function gameLoop(timestamp){

   var delta = timestamp - game._prevTime;
   if(game._prevTime == 0){
      delta = game._delta;  
   }
   game.update(delta);
   game.render();
   game._prevTime = timestamp;
   window.requestAnimationFrame(gameLoop);
}
window.requestAnimationFrame(gameLoop);




