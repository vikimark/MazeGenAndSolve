class Maze{
	constructor(scl){
		this.cells = [];
		this.scl = scl;
		this.cols = floor(width/scl);
		this.rows = floor(height/scl);

		this.stack = [];
		this.complete = false;

		this.neighbor = undefined;

		this.initCell();
	}

	initCell(){
		for(let j = 0; j < this.rows; j++){
			for(let i = 0; i < this.cols; i++){
				let index = i + j * this.cols;
				this.cells[index] = new Cell(i, j, this.scl);
			}
		}
	}

	show(){
		for(let i = 0; i < this.cells.length; i++){
			this.cells[i].show();
		}
	}

	initMaze(start){
		// STEP 1 : initial cell and push it to the stack
		start.visited = true;
		this.stack.push(start);
	}

	genMaze(){
		//console.log("running");
		if(this.stack.length > 0){
			let current = this.stack.pop();

			if(this.haveNeighbors(current)){
				this.stack.push(current);

				// current.neighbor will should neighbor randomly
				this.neighbor = current.neighbor;
				//console.log(neighbor);
				current.removeWall(this.neighbor);
				this.neighbor.visited = true;
				this.stack.push(this.neighbor);

				// implement list :
				// removeWall() : done
				// haveNeighbors() return boolean : done


			}
		}
	}

	calIndex(i, j){
		if(i < 0 || i > this.cols - 1 || j < 0 || j > this.rows - 1){
			return -1;
		}else return i + j * this.cols;
	}

	haveNeighbors(current){
		//console.log(current);
		let i = current.i;
		let j = current.j;
		//console.log(i, j);
		let temp = []; // top left bottom right
		let pool = [];
		temp[0]= this.cells[this.calIndex(i, j-1)];
		temp[1] = this.cells[this.calIndex(i-1, j)];
		temp[2] = this.cells[this.calIndex(i, j+1)];
		temp[3] = this.cells[this.calIndex(i+1, j)]; 
		//console.log(temp);

		for(i = 0; i < temp.length; i++){
			//console.log("running");
			if(temp[i]){
				//console.log("passed");
				if(!temp[i].visited){
					pool.push(temp[i]);
				}
			}
		}
		//console.log(pool);

		if(pool.length > 0){
			current.neighbor = pool[floor(random(pool.length))];
			return true;
		}else return false;
	}


}