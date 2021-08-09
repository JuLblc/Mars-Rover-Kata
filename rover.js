// Déclaration variable:
let myRover;
let myRover2;
let grids; 
let selectedRover;

let imgObstacle = "url('./img/obstacle.svg')";
let imgRover = "url('./img/android_white.svg')";
let imgRover2 = "url('./img/android_black.svg')";
// ======================
function turnLeft(rover) {
  
  //Empêche le rover de tourner si sur bord
  if ((rover.x === 0 && rover.direction ==="E") || (rover.x === 9 && rover.direction ==="W") || (rover.y === 0 && rover.direction ==="N") || (rover.y === 9 && rover.direction ==="S")){
    //Affichage console
    let str = `${rover.name}: Left rotation impossible!`;
    displayConsole(str, "#F7DC6F");
  } else {
    switch(rover.direction){
      case "N": rover.direction = "W"
        break;
      case "W": rover.direction = "S"
        break;
      case "S": rover.direction = "E"
        break;
      case "E": rover.direction = "N"
        break;
    }
  }
  //console.log('turnLeft was called!', rover.direction);
}
 
function turnRight(rover) {
  
  //Empêche le rover de tourner si sur bord
  if ((rover.x === 0 && rover.direction ==="W") || (rover.x === 9 && rover.direction ==="E") || (rover.y === 0 && rover.direction ==="S") || (rover.y === 9 && rover.direction ==="N")){
    //Affichage console
    let str = `${rover.name}: Right rotation impossible!`;
    displayConsole(str, "#F7DC6F");
  } else {
    switch(rover.direction){
      case "N": rover.direction = "E"
        break;
      case "W": rover.direction = "N"
        break;
      case "S": rover.direction = "W"
        break;
      case "E": rover.direction = "S"
        break;
    }
  }
  //console.log('turnRight was called!', rover.direction);
}

function checkObstacle(x,y){
  if (grids[x][y] === " "){
    return true;
  } else {
    //Affichage console
    let str = `Obstacle detected in position x=${x}, y=${y}`;
    displayConsole(str, "#E74C3C");
    return false;
  }  
}

function checkBorder(rover){
  if (rover.x === 9 && rover.direction === "S" && rover.y === 0) {rover.direction="E"}
  else if (rover.x === 9 && rover.direction === "S") {rover.direction="W"}
  else if (rover.x === 0 && rover.direction === "N" && rover.y === 0) {rover.direction="E"}
  else if (rover.x === 0 && rover.direction === "N") {rover.direction="W"}
  else if (rover.y === 9 && rover.direction === "E" && rover.x === 0) {rover.direction="S"}
  else if (rover.y === 9 && rover.direction === "E") {rover.direction="N"}
  else if (rover.y === 0 && rover.direction === "W" && rover.x === 0) {rover.direction="S"}
  else if (rover.y === 0 && rover.direction === "W") {rover.direction="N"}
}

function moveForward(rover) {
  //Check direction + position pour deplacement horizontal
  if (rover.direction === "W"  && rover.y > 0 && checkObstacle(rover.x,rover.y-1)){
    rover.y--; //Gauche
    updateTravelLog(rover);
    checkBorder(rover);
  } else if ( rover.direction === "E"  && rover.y < 9 && checkObstacle(rover.x,rover.y+1)){
    rover.y++; //Droite
    updateTravelLog(rover);
    checkBorder(rover);
  }
  //Check direction + position pour deplacement vertical
  else if (rover.direction === "N"  && rover.x > 0 && checkObstacle(rover.x-1,rover.y)){
    rover.x--; //Haut
    updateTravelLog(rover);
    checkBorder(rover);
  }  else if (rover.direction === "S"  && rover.x < 9 && checkObstacle(rover.x+1,rover.y)){
    rover.x++; //Bas
    updateTravelLog(rover);
    checkBorder(rover);
  }  
}

function moveBackward(rover) {
  //Check direction + position pour deplacement horizontal
  if (rover.direction === "W"  && rover.y < 9 && checkObstacle(rover.x,rover.y+1)){
    rover.y++; //Droite
    updateTravelLog(rover);
  } else if ( rover.direction === "E"  && rover.y > 0 && checkObstacle(rover.x,rover.y-1)){
    rover.y--; //Gauche
    updateTravelLog(rover);
  }
  //Check direction + position pour deplacement vertical
  else if (rover.direction === "N"  && rover.x < 9 && checkObstacle(rover.x+1,rover.y)){
    rover.x++; //Bas
    updateTravelLog(rover);
  }  else if (rover.direction === "S"  && rover.x > 0 && checkObstacle(rover.x-1,rover.y)){
    rover.x--; //Haut
    updateTravelLog(rover);
  }
}

function updateTravelLog(rover){
  let newPosition = { x: rover.x, y: rover.y };
  rover.travelLog.push(newPosition);
   //Update rover position in grids
  grids[rover.travelLog[rover.travelLog.length-2].x][rover.travelLog[rover.travelLog.length-2].y]=" ";
  grids[rover.x][rover.y] = rover.name;
}

function command(rover, orders) {
  //Validate Inputs
  for (let i = 0; i < orders.length; i++){
    if (orders[i] !== "b" && orders[i] !== "f" &&  orders[i] !== "l" &&  orders[i] !== "r"){
        let str = `Invalid command:"${orders[i]}", Command number ${i+1}`;
        displayConsole(str,"#E74C3C");
        return;
    }
  }
  
  for (let i = 0; i < orders.length; i++) {
    let order = orders[i];
    switch (order) {
      case 'l': // left
        turnLeft(rover);
        break;
      case 'r': // right
        turnRight(rover);
        break;
      case 'f': // forward
        moveForward(rover);
        break;
      case 'b': // backward
        moveBackward(rover);
        break;
    }
  }  
  //Afficher le travelLog
  /**for (let i = 0; i<rover.travelLog.length;i++){
    console.log(`travelLog ${i} ==> x=${rover.travelLog[i].x}, y=${rover.travelLog[i].y}`);
  }**/
  //Afficher le grids et la console
  displayGrid(rover);
  let strRover = `${rover.name}: Position => x=${rover.travelLog[rover.travelLog.length-1].x}, y=${rover.travelLog[rover.travelLog.length-1].y}, Direction = ${rover.direction}`;
  displayConsole(strRover,rover.fontColor);
  //RAZ input
  document.getElementsByClassName("search-input")[0].value ="";
}

function displayGrid(rover){
  let myTable = document.getElementsByTagName("tr");
  
  //Cases visitées en jaune, sans texte et border noir
  for (let i = 0; i<rover.travelLog.length-1;i++){
    myTable[rover.travelLog[i].x].children[rover.travelLog[i].y].style.backgroundColor = "gray";
    myTable[rover.travelLog[i].x].children[rover.travelLog[i].y].innerText = " ";
    myTable[rover.travelLog[i].x].children[rover.travelLog[i].y].style.backgroundImage = "none";
  }
   
  getDirection(rover);
  
  //Case actuelle = image du rover
  myTable[rover.travelLog[rover.travelLog.length-1].x].children[rover.travelLog[rover.travelLog.length-1].y].innerText = rover.name;
  myTable[rover.travelLog[rover.travelLog.length-1].x].children[rover.travelLog[rover.travelLog.length-1].y].style.backgroundImage = rover.img;
  
  //Afficher le grids dans la console
  //console.log(grids.join('\n') + '\n\n');
}

function getDirection(rover){
  let myTable = document.getElementsByTagName("tr");
  
  //RAZ case indiquant la direction
  for (i = 0; i < myTable.length; i++) {
   for (j = 0; j <myTable[i].children.length; j++){
      myTable[i].children[j].classList.remove("vanished");
   }
  }
  //Clignotement case suivante
  myTable[rover.x].children[rover.y].style.borderColor = "lightgrey"; // RAZ
  switch (rover.direction){    
    case 'N': 
      myTable[rover.x-1].children[rover.y].className = "vanished";
      break;
    case 'S': 
      myTable[rover.x+1].children[rover.y].className = "vanished";
      break;
    case 'E': 
      myTable[rover.x].children[rover.y+1].className = "vanished";
      break;
    case 'W': 
      myTable[rover.x].children[rover.y-1].className = "vanished";
      break;
  }
}

function displayConsole(str,color){
  let myContent = document.getElementById('content');
  //Ajout d'un paragraphe
  let newP = document.createElement('p');
  myContent.prepend(newP);
  
  newP.textContent = str;
  newP.style.color = color;
}

function resetConsole(){
  let myContent = document.getElementById('content');
  if (myContent.hasChildNodes()) {
    while(myContent.hasChildNodes()){
      myContent.removeChild(myContent.childNodes[0]);
    }
  }
} 

window.onload = reset;

let btnSearch = document.getElementById('btnSearch');
btnSearch.onclick = clickOnSearch;

function clickOnSearch(){  
  let orders = document.getElementsByClassName("search-input")[0].value;
  selectedRover = document.getElementById('rover-select').value;
  
  switch (selectedRover) {
      case 'rover1':
        command(myRover,orders);
        break;
      case 'rover2':
        command(myRover2,orders);
        break;
  }
}

let btnLeft = document.getElementById('btnLeft');
btnLeft.onclick = clickOnLeft;

function clickOnLeft(){
  
  selectedRover = document.getElementById('rover-select').value;
  
  switch (selectedRover) {
      case 'rover1':
        command(myRover,"l");
        break;
      case 'rover2':
        command(myRover2,"l");
        break;
  }
}

let btnRight = document.getElementById('btnRight');
btnRight.onclick = clickOnRight;

function clickOnRight(){
  
  selectedRover = document.getElementById('rover-select').value;
  
  switch (selectedRover) {
      case 'rover1':
        command(myRover,"r");
        break;
      case 'rover2':
        command(myRover2,"r");
        break;
  }
}

let btnForw = document.getElementById('btnForw');
btnForw.onclick = clickOnForw;

function clickOnForw(){
  selectedRover = document.getElementById('rover-select').value;
  
  switch (selectedRover) {
      case 'rover1':
        command(myRover,"f");
        break;
      case 'rover2':
        command(myRover2,"f");
        break;
  }
}

let btnBack = document.getElementById('btnBack');
btnBack.onclick = clickOnBack;

function clickOnBack(){
  selectedRover = document.getElementById('rover-select').value;
  
  switch (selectedRover) {
      case 'rover1':
        command(myRover,"b");
        break;
      case 'rover2':
        command(myRover2,"b");
        break;
  }
}

let btnReset = document.getElementById('btnReset');
btnReset.onclick = reset;

function reset(){
  
 grids = [
  ['R1',' ',' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ','O',' '],
  [' ',' ','O',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ','O',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ','O',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' ',' ','R2'] ];
  
 myRover = {
  direction: "S",
  x: 0,
  y: 0,
  travelLog: [{ x: 0, y: 0 }],
  name:"R1",
  img: imgRover,
  fontColor:"#2E86C1"
 };

 myRover2 = {
  direction: "N",
  x: 9,
  y: 9,
  travelLog: [{ x: 9, y: 9 }],
  name: "R2",
  img: imgRover2,
  fontColor:"#2ECC71"
 };
 
 //RAZ affichage 
 let myTable = document.getElementsByTagName("tr");
  
 for (i = 0; i < myTable.length; i++) {
   for (j = 0; j <myTable[i].children.length; j++){
      //Afficher le grids
      myTable[i].children[j].innerText = grids[i][j];
      //RAZ direction rover
      myTable[i].children[j].style.backgroundColor = "lightgrey";
      myTable[i].children[j].style.backgroundImage = "none";
      myTable[i].children[j].classList.remove("vanished");
     //Afficher icon obstacle
      if (grids[i][j] === "O"){
         myTable[i].children[j].style.backgroundImage = imgObstacle;
      }
      //Afficher le grids dans la console
      //console.log(grids.join('\n') + '\n\n');
   }
 }
 
 //Affichage direction rover
 selectedRover = document.getElementById('rover-select').value;
  
 switch (selectedRover) {
     case 'rover1':
       getDirection(myRover);
       break;
     case 'rover2':
       getDirection(myRover2);
       break;
 }
  
 //Affichage icon
 myTable[myRover.x].children[myRover.y].style.backgroundImage = myRover.img;
 myTable[myRover2.x].children[myRover2.y].style.backgroundImage = myRover2.img;
 //RAZ Console
 resetConsole();
  
  //Affichage console
 let strRover = `${myRover.name}: Position => x=${myRover.travelLog[myRover.travelLog.length-1].x}, y=${myRover.travelLog[myRover.travelLog.length-1].y}, Direction = ${myRover.direction}`;
 let strRover2 = `${myRover2.name}: Position => x=${myRover2.travelLog[myRover2.travelLog.length-1].x}, y=${myRover2.travelLog[myRover2.travelLog.length-1].y}, Direction = ${myRover2.direction}`;
  
 displayConsole(strRover,myRover.fontColor);
 displayConsole(strRover2,myRover2.fontColor);
 
 document.getElementsByClassName("search-input")[0].value =""; //RAZ input
}

let roverSelector = document.getElementById('rover-select');
roverSelector.onchange = roverChange;

function roverChange(){
  selectedRover = roverSelector.value;
  
  switch (selectedRover) {
     case 'rover1':
       getDirection(myRover);
       break;
     case 'rover2':
       getDirection(myRover2);
       break;
 }
}