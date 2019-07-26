
class Tile {
	constructor(width, height){
		this.width = width;
		this.height = height;
		this.img="";
	}
	render(ctx,x,y){
		if(this.img){
			// draw image
			ctx.drawImage(this.img, x, y, this.width, this.height);

		}else{
			ctx.fillRect(x,y,this.width,this.height);
		}
	}
}
class GrassTile extends Tile{
	constructor(width, height){
		super(width, height)
		this.img = new Image();
		this.img.src = "./tiles/grass.jpg";
	}
}

class RoadTile extends Tile{
	constructor(width, height){
		super(width, height)
		this.img = new Image()
		this.img.src = "./tiles/road.jpeg";
	}
}

class BushTile extends Tile{
	constructor(width, height){
		super(width, height)
		this.img = new Image();
		this.img.src = "./tiles/bush.jpg";
	}
}

class WaterTile extends Tile{
	constructor(width, height){
		super(width, height);

		this.img = new Image();
		this.img.src = "./tiles/water.jpeg";
	}
}


class TileMap {
	constructor(width, height, grid_width, grid_height){
		this.width = width;
		this.height = height;
		this.grid_width = grid_width;
		this.grid_height = grid_height;

		this.grid_lines = true;
		// create 2D array for tiles
		this.tiles = [];
		for(var i=0;i<height/grid_height;i++){
			this.tiles[i] = [];
			for(var j=0;j<width/grid_width;j++){
				this.tiles[i][j] = new Tile(this.grid_width, this.grid_height);
			}
		}
	}
	render(ctx){

		for(var i=0;i<this.tiles.length;i++){

			
			for(var j=0;j<this.tiles[0].length;j++){
				if(this.grid_lines && i==0){
					ctx.save();
					ctx.strokeStyle="black";
					
					ctx.beginPath();
					ctx.moveTo(j*this.grid_width, 0)
					ctx.lineTo(j*this.grid_width,this.height);
					ctx.stroke();
					ctx.closePath();
					ctx.restore();
				}
				

				if(this.tiles[i][j]){
					this.tiles[i][j].render(ctx, j*this.grid_width, i*this.grid_height);
				}
				// this.tiles[i][j];
			}
			
			if(this.grid_lines){
				ctx.save();
				ctx.strokeStyle="black";
				
				ctx.beginPath();
				ctx.moveTo(0, i*this.grid_height)
				ctx.lineTo(this.width, i*this.grid_height);
				ctx.stroke();
				ctx.closePath();
				
				ctx.restore();
				for(var j=0;j<this.tiles[0].length;j++){
					ctx.save();
					ctx.strokeStyle="black";
					
					ctx.beginPath();
					ctx.moveTo(j*this.grid_width, 0)
					ctx.lineTo(j*this.grid_width,this.height);
					ctx.stroke();
					ctx.closePath();
					ctx.restore();
				}
			}
		}
	}
}


class FroggerTileMap extends TileMap{
	/*
		@x - x coordinate
		@y - y coordinate

		Returns an object 
			{
				row: ___,
				col: ___
			}

	*/
	coordToGridLocation(x, y){

		var retObj = {};
		var row, col;

		row = Math.floor(this.tiles.length*((y) / this.height));
		col = Math.floor(this.tiles[0].length*((x) / this.width))

		retObj["row"] = row;
		retObj["col"] = col;

		return retObj;
	}
	loadTiles(arr){
		for(let i=0;i<arr.length;i++){
			for(let j=0;j<arr[i].length;j++){
				var ch = arr[i].charAt(j);
				switch(ch){
					case "r":
						this.tiles[i][j] = new RoadTile(this.grid_width, this.grid_height);
						break;
					case "w":
						this.tiles[i][j] = new WaterTile(this.grid_width, this.grid_height);
						break;
					case "g":
						this.tiles[i][j] = new GrassTile(this.grid_width, this.grid_height);					
						break;
					default:
						break;
				}
			}
		}
	}

}




