WIDTH = 1000;
HEIGHT = 500;
TIME_TO_MOVE = 83.333333;
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
               "",
               "l5---    l3-     s8------       l5---    l3-     l8------  s   ",
               "ttt    ttt   ttt    ttt   ttt    ttt   ttt    ttt   ttt    t   ",
               "s3-    s2  l5---    l3-     s4--  s3-    s2  l5---       l3-   ",
               "l3-     s4--  s3-    s2  l5---       l3-   s3-    s2  l5---    ",
               "ttt    ttt   ttt    ttt   ttt    ttt   ttt    ttt   ttt    t   ",
               "",
               "c  c  c  c  c  c  c  c  c  c  c  c  c  c  c  c  c  c  c  c  c  ",
               "b  b  b  b  b  b  b  b  b  b  b  b  b  b  b  b  b  b  b  b  b  ",
               "d--    d--    d--    d--    d--    d--    d--    d--    d--    ",
               "  b  b  b  b  b  b  b  b  b  b  b  b  b  b  b  b  b  b  b  b  b",

         ];


function Game(context, width, height) {

   this.ctx = context;
   this.width = width;
   this.height = height;
   this._delta = 1000/100;

   this._prevTime = 0;

   this.num_rows = 13;
   this.num_cols = 21;

   this.grid_height = height/this.num_rows;
   this.grid_width = width/this.num_cols;
   this.tileMap = new FroggerTileMap(width, height, width/this.num_cols, height/this.num_rows);
   this.tileMap.loadTiles(map);


   this.frog = new Frog();
   this.frog.x = width / this.num_cols * Math.floor(this.num_cols/2);
   this.frog.y = (height / this.num_rows) * (this.num_rows-1);

   //
   this.entities = [];

   this.loadObjMap = function(o_map){

      for(let i=0;i<o_map.length;i++){
         for(let j=0;j<o_map[i].length;j++){
            var ch = o_map[i].charAt(j);
            var obj = null;

            switch(ch){
               case "c":
                  var obj = new FroggerCar(j*this.grid_width, i*this.grid_height, this.grid_width, this.grid_height);
                  this.entities.push(obj);
                  break;
               case "b":
                  var obj = new FroggerCar2(j*this.grid_width, i*this.grid_height, this.grid_width, this.grid_height);
                  this.entities.push(obj);
                  break;   
               case "d":
                  var obj = new FroggerTruck(j*this.grid_width, i*this.grid_height, this.grid_width, this.grid_height);
                  this.entities.push(obj);   
                  break;
               case "t":
                  var obj = new FroggerTurtle(j*this.grid_width, i*this.grid_height, this.grid_width, this.grid_height);
                  this.entities.push(obj);   
                  break;

               case "l":
                  // this is a log; l's are followed by a length, unless length is 1  
                  var obj = new FroggerLog(j*this.grid_width, i*this.grid_height, this.grid_width, this.grid_height);
               
               case "s":
                  
                  if(obj == null){
                     var obj = new FroggerSinkingLog(j*this.grid_width, i*this.grid_height, this.grid_width, this.grid_height);
                  }

                  var l = o_map[i].charAt(j+1);
                  if(l == " "){
                     obj.length = 1;
                  }else{
                     obj.length = parseInt(l);
                  }
                  j+=obj.length -1;
                  if(i == 4){
                     obj.dx = obj.dx*-1;
                  }
                  this.entities.push(obj);
                  break;
               default:
                  break;
            }
         }
      }

   }

   /** 
   *  Update
   **/
   this.update = function(delta) {
      
      var frog_delta = delta;
      if(this.frog.movement_timer > 0){
         this.frog.movement_timer = this.frog.movement_timer - delta;

         if(this.frog.movement_timer < 0){
            frog_delta = this.frog.movement_timer + delta;
         }
      }else if(this.frog.movement_timer <= 0 && this.frog.lock){
         this.frog.lock = false;
         this.frog.dx = 0;
         this.frog.dy = 0;
      }

      // loop through game entities and update each
      for(var i = 0; i < this.entities.length; i++){
         this.entities[i].update(delta);
         var e = this.entities[i];


         var frog_row = Math.floor(13*((this.frog.y + 10) / HEIGHT));
         var frog_col = Math.floor(21*((this.frog.x + 10) / WIDTH));

         var e_obj = this.tileMap.coordToGridLocation(e.x+e.width/2, e.y+e.height/2);


         // does entity intersect frog...
         if(e_obj.row  == frog_row && 
            (frog_col >=e_obj.col && frog_col < e_obj.col + e.length)){
            //colliding with entity 'e'
            if((e instanceof FroggerLog || e instanceof FroggerTurtle)){
               //it's a type of log
               if(!this.frog.lock){
                  this.frog.dx = e.dx;
               }
               this.frog.on_entity = true;
            }else{
               console.log("DEAD ");
               alert("dead")
            }

         }
         // if frog can stand on entity && frog is not locked....set frog velocity to speed of obj
            // frog is attached to entity
         if(e.dx > 0){
            //moving to the right
            if(e.x >= WIDTH){
               e.x = e.x - 3000;
            }
         }else{
            if(e.x <= -1*WIDTH){
               e.x = e.x + 3000;
            }
         }
      }

      this.frog.update(frog_delta);

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
         
         for(var i = 0; i< this.entities.length; i++){
            this.entities[i].render(this.ctx);
         }

         this.frog.render(this.ctx);
   }

   this.moveTo = function(obj, x, y, t){
         var x_dist = -1*(obj.x - x);
         obj.dx = x_dist/(t/1000);
         var y_dist = -1*(obj.y - y);
         obj.dy = y_dist/(t/1000);

         obj.movement_timer = t;
         obj.lock = true;
   }
   this.moveFrogLeft = function(){
      //can he move ?

      var frog_coord = this.tileMap.coordToGridLocation(this.frog.x+10, this.frog.y+10);

      if(!this.frog.lock && frog_coord.col > 0){
         // where should he move to?
         var x2 = this.frog.x - this.grid_width;

         // is he already moving?
         if(this.frog.dx > 0){
            //he's movign right on a log/turtle
            x2 = x2 + this.frog.dx * (TIME_TO_MOVE/1000); 
         }else if(this.frog.dx < 0){
            //wrong
            // he's movign left on a log/turtle
            x2 = x2 + this.frog.dx * (TIME_TO_MOVE/1000);             
         }

         this.moveTo(this.frog, x2 , this.frog.y, TIME_TO_MOVE);
      }
   }
   this.moveFrogRight = function(){
      //can he move ?

      var frog_coord = this.tileMap.coordToGridLocation(this.frog.x+10, this.frog.y+10);
      if(!this.frog.lock && frog_coord.col < this.num_cols-1 ){
         // where should he move to? 
         var x2 = this.frog.x + this.grid_width;

         // is he already moving?
         if(this.frog.dx > 0){

            // he's movign right on a log/turtle
            // wrong

            x2 = x2 + this.frog.dx * (TIME_TO_MOVE/1000); 
         }else if(this.frog.dx < 0){
            // he's movign left on a log/turtle
            x2 = x2 + this.frog.dx * (TIME_TO_MOVE/1000); 
         }

         this.moveTo(this.frog, x2 , this.frog.y, TIME_TO_MOVE);
      }
   }
   
   this.moveFrogDown = function(){
      //can he move ?
      var frog_coord = this.tileMap.coordToGridLocation(this.frog.x+ this.grid_width/2, this.frog.y+ this.grid_height/2);

      if(!this.frog.lock && frog_coord.row < this.num_rows -1){

         // make sure the new X is centered on a tile...which means, is in the top left corner of tile
         var new_x = this.frog.x;  
         
         var mod_x = (new_x + this.grid_width/2) % this.grid_width;
         if(frog_coord.row == 5){

            //if( != 0){
            if(this.frog.dx < 0){ 
               if(mod_x < this.grid_width/4){
                  // frog is already entering into the next grid square
                  new_x = (frog_coord.col-1) * this.grid_width;
               }else{
                  new_x = (frog_coord.col) * this.grid_width;                  
               }   

            }else if(this.frog.dx > 0){
               if(mod_x < 3*this.grid_width/4){
                  // frog is not at least 1/3 into the next grid square
                  new_x = (frog_coord.col) * this.grid_width;
               }else{
                  // frog is at least 1/3 into next square...move to next grid
                  new_x = (frog_coord.col+1) * this.grid_width;                  
               }
            }
         }
         this.moveTo(this.frog, new_x, this.frog.y + this.grid_height, TIME_TO_MOVE);
      }
   }  
   this.moveFrogUp = function(){
      var frog_coord = this.tileMap.coordToGridLocation(this.frog.x+ this.grid_width/2, this.frog.y+ this.grid_height/2);

      //can he move ?
      if(!this.frog.lock && frog_coord.row > 0){
         // if the frog has an x velocity ----> he's on a log or turtle...
         
         // make sure the new X is centered on a tile...which means, is in the top left corner of tile
         var new_x = this.frog.x;  
         
         var mod_x = (new_x + this.grid_width/2) % this.grid_width;

         if(frog_coord.row == 1){
            //if( != 0){
            if(this.frog.dx < 0){ 
               
                  new_x = (frog_coord.col) * this.grid_width;
               
            }else if(this.frog.dx > 0){

               if(mod_x < 2*this.grid_width/3){
                  // frog is not at least 1/3 into the next grid square
                  new_x = (frog_coord.col) * this.grid_width;
               }else{
                  // frog is at least 1/3 into next square...move to next grid
                  new_x = (frog_coord.col+1) * this.grid_width;                  
               }
            }
         }         

         this.moveTo(this.frog, new_x , this.frog.y - this.grid_height, TIME_TO_MOVE);
      }
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
game.loadObjMap(objMap);

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




