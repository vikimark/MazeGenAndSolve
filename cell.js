class Cell{
	constructor(i, j, scl){
		this.i = i;
		this.j = j;
		this.scl = scl;

		this.top = true;
		this.left = true;
		this.bottom = true;
		this.right = true;

		this.visited = false;
		this.current = false;

		this.neighbor = null;

		// for pathfinding
		this.parent = undefined;
		this.f = 0;
		this.g = 0;
		this.h = 0;
	}

	show(){
		let x = this.i * this.scl;
		let y = this.j * this.scl;
		let scl = this.scl;
		stroke(0);
		strokeWeight(3);
		if(this.top)
			line(x, y, x+scl, y);
		if(this.left)
			line(x, y, x, y+scl);
		if(this.bottom)
			line(x, y+scl, x+scl, y+scl);
		if(this.right)
			line(x+scl, y, x+scl, y+scl);
		if(this.visited){
			noStroke();
			fill(119, 136, 153, 40);
			rect(x, y, scl, scl);
		}
	}

	showSp(r=124, g=0, b=0, a=100){
		let x = this.i * this.scl;
		let y = this.j * this.scl;
		let scl = this.scl;

		noStroke();
		if(a > 0)
		fill(r, g, b, a);
		else fill(r, g, b);
		rect(x, y, scl, scl);
	}

	removeWall(next){
		if(this.j - next.j === 1){
			this.top = false;
			next.bottom = false;
		}else if(this.i - next.i === -1){
			this.right = false;
			next.left = false;
		}else if(this.j - next.j === -1){
			this.bottom = false;
			next.top = false;
		}else if(this.i - next.i === 1){
			this.left = false;
			next.right = false;
		}
	}

}