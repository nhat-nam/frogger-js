function Frog(){

	this.x = 0;
	this.y = 0; 

	this.dx = 0;
	this.dy = 0;
	this.accel_y = 0;

	this.original_color = "white";
	this.color = "white";
	this.height = 30;
	this.width = 50;

	//38x24


	//this.img = new Image();
	//this.img.src = "./bird.png";

	this.update = function(delta){

		this.y = this.y + (this.dy * (delta/1000));
		this.x = this.x + (this.dx * (delta/1000));
	}
	
	this.render = function(ctx){
		ctx.fillStyle="red";
		ctx.fillRect(this.x, this.y, this.width, this.height);
		
	}

	this.flap = function(){
		
	}
	this.reset = function(){
		
	}
	
	this.collides = function(pipe){
		if(this.x + this.width_radius >= pipe.x
			&& this.x - this.width_radius <= pipe.x + pipe.width
			&& this.y - this.height_radius <= pipe.y + pipe.height
			&& this.y + this.height_radius >= pipe.y 
		
		|| this.x + this.width_radius >= pipe.x
			&& this.x - this.width_radius <= pipe.x + pipe.width
			&& this.y - this.height_radius <= GAP + pipe.height + (HEIGHT - GAP + pipe.height)
			&& this.y + this.height_radius >= GAP + pipe.height ){

			return true;
		} return false;
	}
}