class Entity{
	constructor(){
		this.x = 0;
		this.y = 0; 

		this.dx = 0;
		this.dy = 0;
		this.height = 30;
		this.width = 50;

	}

	update(delta){

		this.y = this.y + (this.dy * (delta/1000));
		this.x = this.x + (this.dx * (delta/1000));
	}
	
	render(ctx){
		ctx.fillStyle="white";
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}


class FroggerCar extends Entity{


	
}