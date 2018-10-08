
var nCount;
var nCountList;
var largestCat;
var freqToPix;
var dataSize;
var diceRolls;
var prob;
var W;
var H;
var S;
var scene = 1;
var cursorStyle;
var hoverMenuNum;

function setup() {
	
	dataSize = 1000;
	diceRolls = 21;
	prob = 1/2;
	
	W = windowWidth;
	H = windowHeight;
	largestCat = 0;
	nCountList = [];
	for (var i=1; i<diceRolls+1; i+=1){
		nCountList.push(0);
	}
	
	textFont("Lato Hairline");
	
	if (W>=H){
		S = W;
	} else {
		S = H;
	}
	
	hoverMenuNum = 0;
	
	createCanvas(W, H);
	drawMenu();
}

function draw() {
	if (mouseX !== pmouseX || mouseY !== pmouseY){
		hoverMenuNum = 0;
		cursorStyle = "default";
		interaction();
		if (scene === 1){
			drawMenu();
		}
	}
	cursor(cursorStyle);
}

function interaction(){
	if (scene === 1){
		if (mouseX>W/4-textWidth(prob)/2 && mouseX<W/4+textWidth(prob)/2 && mouseY>5*H/7-W/50 && mouseY<5*H/7+W/100){
			hoverMenuNum = 1;
		}
		if (mouseX>W/2-textWidth(diceRolls)/2 && mouseX<W/2+textWidth(diceRolls)/2 && mouseY>5*H/7-W/50 && mouseY<5*H/7+W/100){
			hoverMenuNum = 2;
		}
		if (mouseX>3*W/4-textWidth(dataSize)/2 && mouseX<3*W/4+textWidth(dataSize)/2 && mouseY>5*H/7-W/50 && mouseY<5*H/7+W/100){
			hoverMenuNum = 3;
		}
	}
	if (mouseX>W-3*S/40 && mouseY>S/40 && mouseX<W-3*S/40+S/20 && mouseY<S/40+S/20) {
		 cursorStyle = "pointer";
	}
}

function drawMain(){
	background(60,70,90);
  fill(255);
	stroke(255);
	drawBarChart();
	textAlign(RIGHT,CENTER);
	text("Total rolls of the Dice: "+str(diceRolls*dataSize),W-20,H-20);
	textAlign(LEFT,CENTER);
	text("Probability of Success: "+str(prob),20,H-20);
	drawHome();
}
function drawMenu(){
	background(60,70,90);
	noStroke();
	fill(255);
	textAlign(CENTER,BASELINE);
	textSize(W/20);
	text("RANDOM   PROBABILITY",W/2,H/4);
	drawArrow();
	textSize(W/40);
	text(prob,W/4,5*H/7);
	text(diceRolls,W/2,5*H/7);
	text(dataSize,3*W/4,5*H/7);
	stroke(255);
	strokeWeight(1);
	if (hoverMenuNum){
		cursorStyle = "pointer";
		if (hoverMenuNum===1){
			line(W/4-textWidth(prob)/2,5*H/7+W/100,W/4+textWidth(prob)/2,5*H/7+W/100);
		}
		if (hoverMenuNum===2){
			line(W/2-textWidth(diceRolls)/2,5*H/7+W/100,W/2+textWidth(diceRolls)/2,5*H/7+W/100);
		}
		if (hoverMenuNum===3){
			line(3*W/4-textWidth(dataSize)/2,5*H/7+W/100,3*W/4+textWidth(dataSize)/2,5*H/7+W/100);
		}
	}
}


function drawHome(){
	fill(255,75);
	noStroke();
	rect(W-3*S/40,S/40,S/20,S/20,S/400);
	fill(255);
	beginShape();
		vertex(W-S/20,3*S/80);
		vertex(W-5*S/80-S/400,2*S/40);
		vertex(W-5*S/80+S/400,2*S/40);
		vertex(W-5*S/80+S/400,5*S/80);
		vertex(W-3*S/80-S/400,5*S/80);
		vertex(W-3*S/80-S/400,2*S/40);
		vertex(W-3*S/80+S/400,2*S/40);
	endShape();
}
function drawArrow(){
	fill(255,75);
	noStroke();
	rect(W-3*S/40,S/40,S/20,S/20,S/400);
	fill(255);
	beginShape();
		vertex(W-13*S/320,31*S/640);
		vertex(W-5*S/80,31*S/640);
		vertex(W-5*S/80,33*S/640);
		vertex(W-13*S/320,33*S/640);
		vertex(W-7*S/160,15*S/320-S/400);
		vertex(W-7*S/160+S/100,2*S/40);
		vertex(W-7*S/160,17*S/320+S/400);
	endShape();
}

function rollDice(){
	return random();
}
function countN(){
	nCount = 0;
	for (var j=0; j<diceRolls; j+=1){
	  if (rollDice()<prob){
	  	nCount+=1;
	  }
  }
  return nCount;
}
function probCompile(){
	for (var i=0; i<dataSize; i+=1){
		nCountList[countN()]+=1;
	}
}
function drawBarChart(){
	for (var i=0; i<nCountList.length; i+=1){
		if (nCountList[i]>largestCat){
			largestCat = nCountList[i];
		}
	}
	if (W>=H){
		var div150 = W/150;
		var eigthWidth = (1/8)*W;
		var halfHeight = H/2;
		strokeWeight(div150);
		freqToPix = ((3/4)*W)/largestCat;
		for (var i=0; i<nCountList.length; i+=1){
			line(eigthWidth,halfHeight+(3*div150)*(i-(diceRolls+1)/2),eigthWidth+(nCountList[i]*freqToPix),halfHeight+(3*div150)*(i-(diceRolls+1)/2));
		}
		noStroke();
		textSize(2*div150);
		textAlign(RIGHT,CENTER);
		for (var i=0; i<nCountList.length; i+=1){
			text(nCountList[i],3*eigthWidth/4,halfHeight+(3*div150)*(i-(diceRolls+1)/2));
		}
	} else {
		var div150 = H/150;
		var sevenEigthH = (7/8)*H;
		var halfWidth = W/2;
		strokeWeight(H/150);
		freqToPix = ((3/4)*H)/largestCat;
		for (var i=0; i<nCountList.length; i+=1){
			line(halfWidth+(3*div150)*(i-(diceRolls+1)/2),sevenEigthH,halfWidth+(3*div150)*(i-(diceRolls+1)/2),sevenEigthH-(nCountList[i]*freqToPix));
		}
		noStroke();
		textSize(2*div150);
		textAlign(CENTER,CENTER);
		for (var i=0; i<nCountList.length; i+=1){
			applyMatrix();
			translate(halfWidth+(3*div150)*(i-(diceRolls+1)/2),29*sevenEigthH/28);
			rotate(PI/2);
			text(nCountList[i],0,0);
			resetMatrix();
		}
	}
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  W = windowWidth;
  H = windowHeight;
  if (W>=H){
		S = W;
	} else {
		S = H;
	}
	if (scene === 1){
		drawMenu();
	} else if (scene === 2){
		drawMain();
	}
}
function mouseClicked(){
	if (scene === 1){
		if (mouseX>W-3*S/40 && mouseY>S/40 && mouseX<W-3*S/40+S/20 && mouseY<S/40+S/20) {
			probCompile();
			drawMain();
			scene = 2;
		}
		if (hoverMenuNum){
			var temp = -1;
			if (hoverMenuNum === 1){
				temp = float(prompt("Enter a decimal probability between 0 and 1."));
				if (temp>=0 && temp<=1){
					prob = temp;
				} else {
					alert("Invalid Input.");
				}
			} else if (hoverMenuNum === 2){
				temp = int(prompt("Enter a positive integer for the number of dice rolled each 'round', between 0 and 25."));
				if (temp>=0 && temp<= 25 && Number.isInteger(temp)){
					diceRolls = temp;
				} else {
					alert("Invalid Input.");
				}
			} else if (hoverMenuNum === 3){
				temp = int(prompt("Enter a positive integer for the number of 'rounds' taken. (The higher, the longer it will take to compute...)"));
				if (temp>=0 && Number.isInteger(temp)){
					dataSize = temp;
				} else {
					alert("Invalid Input.");
				}
			}
			drawMenu();
		}
	} else if (scene === 2){
		if (mouseX>W-3*S/40 && mouseY>S/40 && mouseX<W-3*S/40+S/20 && mouseY<S/40+S/20) {
			drawMenu();
			scene = 1;
		} else {
			largestCat = 0;
			nCountList = [];
			for (var i=1; i<diceRolls+1; i+=1){
				nCountList.push(0);
			}
			if (W>=H){
				S = W;
			} else {
				S = H;
			}
			probCompile();
			drawMain();
		}
	}
}