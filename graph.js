class Graph{
	constructor(scl, maze){
		this.cells = maze.cells;
		this.scl = scl;

		this.cols = width/scl;
		this.rows = height/scl;

		this.openList = [];
		this.closedList = [];

		this.found = false;

		this.previous = undefined;

		this.drawSet = false;
	}

	calIndex(i, j){
		if(i < 0 || i > this.cols - 1 || j < 0 || j > this.rows - 1){
			return -1;
		}else return i + j * this.cols;
	}

	show(r=255, g=255, b=255){

		for(let j = 0; j < height/this.scl; j++){
			for(let i = 0; i < width/this.scl; i++){
			this.cells[this.calIndex(i, j)].show();
			}
		}
	}
	listShow(list ,r, g, b){
		for(let i = 0; i < list.length; i++){
			let me = list[i];
			me.showSp(r, g, b);
		}
	}

	initAPath(start, goal){
		this.openList = [];
		this.openList.push(start);
	}

	aPath(start, goal){ // start and goal is cell type
		
		// haven't understand openList and closedList clearly

		let openList = this.openList;
		let closedList = this.closedList;

		if(openList.length > 0 && !this.found){
			let winner = openList[0]
			for(let i = 1; i < openList.length; i++){
				if(openList[i].f < winner.f){
					winner = openList[i];
				}
			}
			this.arrayRemove(openList, winner);
			let successors = [];
			this.genSuccess(successors, winner);

			for(let i = 0; i < successors.length; i++){
				let suc = successors[i];
				if(suc === goal){
					goal.parent = winner;
					console.log("FOUND!");
					this.found = true;
					break;
				}
				let g, h, f;
				g = winner.g + this.calDist(suc, winner);
				h = this.calDist(suc, goal);
				f = g + h;

				if(openList.includes(suc) && suc.f < f){ // if previous f is less than new f skipped
					continue; // skipped
				}
				if(closedList.includes(suc) && suc.f < f){ 
					continue; // skipped
				}else {
					suc.g = g;
					suc.h = h;
					suc.f = f;
					suc.parent = winner; // set each parent to its previously node
					openList.push(suc);
				}
			}

			closedList.push(winner);
			this.listShow(openList, 127, 200, 169, 0);
			this.listShow(closedList, 255, 0, 0);

		}
		

		if(this.found){
			this.drawPath(goal);
		}
	}

	drawPath(goal){
		let path = [];
		let previous = goal;

		while(previous.parent != undefined){
			path.push(previous);
			previous = previous.parent;
		}
		path.push(previous);

		for(let i = 0; i < path.length; i++){
			let n = path[i];
			n.showSp(100, 201, 207, 0);
		}
	}

	reset(){
		this.openList = [];
		this.closedList = [];
		this.found = false;

		for(let j = 0; j < this.rows; j++){
			for(let i = 0; i < this.cols; i++){
				this.cells[this.calIndex(i, j)].parent = undefined;
			}
		}
	}



	calDist(elt1, elt2){
		let x, y;

		x = sq(elt1.i - elt2.i);
		y = sq(elt1.j - elt2.j);
		return sqrt(x + y);
	}

	arrayRemove(arr, target){  // remove target from array
		for(let i = 0; i < arr.length; i++){
			if(arr[i] === target){
				arr.splice(i, 1);
			}
		}
	}

	genSuccess(arr, me){ // generate mostly 8 successors of me
		let i = me.i;
		let j = me.j;
		let cols = this.cols;
		let rows = this.rows;
		let cells = this.cells;

		// if(i > 0 && j > 0){
		// 	arr.push(cells[j-1][i-1]) // upper-left corner
		// }
		// if(i > 0 && j < rows - 1)
		// 	arr.push(cells[j+1][i-1]) // down-left corner
		// if(i < cols - 1 && j > 0)
		// 	arr.push(cells[j-1][i+1]) // upper-right corner 
		// if(i < cols - 1 && j < rows - 1)
		// 	arr.push(cells[j+1][i+1]) // down-right corner 
		if(i > 0 && !me.left)
			arr.push(cells[this.calIndex(i-1, j)])   // left
		if(i < cols - 1 && !me.right)
			arr.push(cells[this.calIndex(i+1, j)])   // right
		if(j < rows - 1 && !me.bottom)
			arr.push(cells[this.calIndex(i, j+1)])   //down
		if(j > 0 && !me.top)
			arr.push(cells[this.calIndex(i, j-1)])   // top

		// for(let i = arr.length - 1; i >= 0; i--){
		// 	let cell = arr[i];
		// 	for(let j = 0; j < this.obstacle.length; j++){
		// 		if(cell == this.obstacle[j]){
		// 			arr.splice(i, 1); // only splice 1 time per i
		// 			break; // if splice break immediately
		// 		}
		// 	}
		// }
	}

	setCell(mouseX, mouseY){
		let i = floor(constrain(mouseX/this.scl, 0, this.cols - 1));
		let j = floor(constrain(mouseY/this.scl, 0, this.rows - 1));

		return this.cells[this.calIndex(i, j)];
	}
}