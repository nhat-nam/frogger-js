
function FroggerMenu(w, h){
	Menu.call(this, w, h);

    this.settings.options_x_pos = 120;
	this.init = function(){
		this.title = "Frogger";
		this.options.push("Start game!");
		//this.options.push("High scores");
		this.options.push("Instructions");
	}

	this.renderBackground = function(ctx){
		ctx.fillStyle = this.settings.bg_color;
		ctx.fillRect(0,0, this.width, this.height);
	}

	this.renderSelector = function(ctx, x, y){
		ctx.fillRect(x, y-2.5, 5, 5);
	}
}


function GameOverMenu(w, h){
	Menu.call(this, w, h);
    this.settings.options_x_pos = 110;
    this.settings.title_x_pos = 70;
	this.init = function(){
		this.title = "Game Over";
		this.options.push("Go Back To Menu");
	}

	this.renderBackground = function(ctx){
//		ctx.drawImage(this.background,0,0);
//		ctx.drawImage(this.background,0,0, this.background_width, HEIGHT);
	}


	this.renderSelector = function(ctx, x, y){
		ctx.fillRect(x, y-2.5, 5, 5);
	}
}

function InstructionsMenu(w, h, game){
	Menu.call(this, w, h);
    this.background = game.background;
    this.background_width = (HEIGHT/288)*1157;
    this.font = "14px 'Press Start 2P'";
    this.settings.title_font = "100px 'FlappyBirdy'";
    this.settings.options_y_pos = 450;
   	this.settings.options_x_pos = 150;

	this.init = function(){
		this.title = "Instructions";
		this.options.push("Return");

		var textBlock = new TextBlock(20, 140, w-80, 300);
		textBlock.settings.bg_color = "rgba(0,0,0,0)";
		textBlock.settings.font_color = "black";
		textBlock.settings.font = "12px 'Press Start 2P'";
		textBlock.settings.line_height = 20;

		textBlock.lines.push("This is my remake of Flappy");
		textBlock.lines.push("Bird. There is a powerup cube");
		textBlock.lines.push("that earns extra points for ");
		textBlock.lines.push("a limited amount of time ");
		textBlock.lines.push("when you fly through the cube.");

		textBlock.lines.push("");
		textBlock.lines.push("Spacebar/Tap - Flap wings");
		textBlock.lines.push("");
		textBlock.lines.push("Escape - Pause game");
		this.child_nodes.push( textBlock );
	}

	this.renderBackground = function(ctx){
		ctx.drawImage(this.background,0,0);
		ctx.drawImage(this.background,0,0, this.background_width, HEIGHT);
	}

	this.renderSelector = function(ctx, x, y){
		ctx.fillRect(x, y-2.5, 5, 5);
	}
}



