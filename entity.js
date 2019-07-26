class Entity{
	constructor(x, y, width, height){
		this.x = x;
		this.y = y; 

		this.dx = 80;
		this.dy = 0;
		this.height = height;
		this.width = width;
		this.fillStyle = "white";
		this.length = 1;

		this.can_stand_on = false;

	}

	update(delta){

		this.y = this.y + (this.dy * (delta/1000));
		this.x = this.x + (this.dx * (delta/1000));
	}
	
	render(ctx){
		ctx.save();
		ctx.fillStyle= this.fillStyle;
		ctx.fillRect(this.x+6, this.y+6, (this.length*this.width)-12, this.height-12);
		ctx.restore();
	}
}

class FroggerLog extends Entity{
	constructor(x, y, width, height){
		super(x, y, width, height);
		this.fillStyle = "brown";
		this.can_stand_on = true;
	}
	render(ctx){
		ctx.save();
		ctx.fillStyle= this.fillStyle;
		ctx.fillRect(this.x, this.y, this.length * this.width, this.height);
		ctx.restore();
	}	
}
class FroggerSinkingLog extends FroggerLog{
	constructor(x, y, width, height){
		super(x, y, width, height);
		this.length = 1;
		this.fillStyle = "tan";
	}
}

class FroggerTurtle extends Entity{
	constructor(x, y, width, height){
		super(x, y, width, height);
		this.fillStyle = "green";
		this.dx = -40
	}

}

class FroggerCar extends Entity{
	constructor(x, y, width, height){
		super(x, y, width, height);

	}

	
}
class FroggerCar2 extends Entity{
	constructor(x, y, width, height){
		super(x, y, width, height);
		this.fillStyle = "black";
		this.dx = -100;
	}	
}

class FroggerTruck extends Entity{
	constructor(x, y, width, height){
		super(x, y, width, height);
		this.length = 3;
		this.fillStyle = "orange";
		this.dx = 80;
	}	
}