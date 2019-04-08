var nodes = [];
var sie = 20;
var createEdgePressed = false;
var createNodePressed = false;
var deleteNodePressed = false;

var createNodeButton;
var deleteNodeButton;
var createEdgeButton;
//node flag I dont want the node to create when node button is pressed
var createNodeFlag=0;

var connectedNodes = [];

function setup() {

  createCanvas(displayWidth,displayHeight)
  // nodes.push(new Node(sie));

  createEdgeButton = createButton('Edge');
  createEdgeButton.position(1000,30);
  createEdgeButton.mousePressed(createEdgeButtonPressed);

  createNodeButton = createButton('Node');
  createNodeButton.position(1000,60);
  createNodeButton.mousePressed(createNodeButtonPressed);

  deleteNodeButton = createButton('DeleteNode');
  deleteNodeButton.position(1000,90);
  deleteNodeButton.mousePressed(deleteNodeButtonPressed);
}

function draw() {
  background(0);
  for(i=0;i<nodes.length;i++){
    nodes[i].drawNode();
  }

  if(connectedNodes.length==2){

    stroke(255);
    line(nodes[connectedNodes[0]].x,nodes[connectedNodes[0]].y,nodes[connectedNodes[1]].x,nodes[connectedNodes[1]].y)
  }


}

function createEdgeButtonPressed(){
  if(createEdgePressed){
    createEdgePressed = false;
  }
  else{
    createEdgePressed = true;
    createNodePressed = false;
      deleteNodePressed = false;
  }

}

function createNodeButtonPressed(){
  if(createNodePressed){
    createNodePressed = false;
    createNodeFlag = 0;
  }
  else{
    createNodeFlag = 1;
    createNodePressed = true;
    createEdgePressed = false;
      deleteNodePressed = false;
  }
}

function deleteNodeButtonPressed(){
  if(deleteNodePressed){
    deleteNodePressed = false;

  }
  else{

    deleteNodePressed = true;
    createEdgePressed = false;
      createNodePressed = false;
  }
}

function mousePressed(){
  //due to create node flag ,node will not be created when button is pressed,you have to press agin,
  //you are an idiot so I have to write this,so you can remember later
  if(createNodePressed){
    if(createNodeFlag == 0){
      var i = checkInsideAnyNode();
      if(i==-2){
        nodes.push(new Node(sie));
      }
      else{
        nodes[i].mousePressed();
      }
    }
    else{
      console.log(createNodeFlag);
      createNodeFlag =0;
    }
  }
  else if (deleteNodePressed) {
    // console.log("delete");
    var i = checkInsideAnyNode();
    if(!(i==-2)){
      var tem_nodes =[];
      for(j=0;j<nodes.length;j++){
        if(j!=i){
          tem_nodes.push(nodes[j]);
        }
      }
      nodes = tem_nodes;
      // nodes = nodes.splice(i,1);
      console.log(i);
    }
  }
  else if (createEdgePressed){
    var i = checkInsideAnyNode();
    if(i!=-2){
      if(connectedNodes.length<2){
        connectedNodes.push(i);
      }
      else{
        connectedNodes = [];
      }
    }
  }

}

function checkInsideAnyNode(){
  for(i=0;i<nodes.length;i++){
    if((nodes[i].x+nodes[i].radius >= mouseX && nodes[i].x-nodes[i].radius <= mouseX ) &&
       (nodes[i].y+nodes[i].radius >= mouseY && nodes[i].y-nodes[i].radius <= mouseY )){
         return i;
       }
  }
  return -2;

}

class Node {
  constructor(radius) {
    this.x ;
    this.y ;
    this.radius = radius;
    this.set = false;
  }

  drawNode(){

    if(!this.set){
      stroke(255,0,20);
      strokeWeight(4);
      this.x = mouseX;
      this.y = mouseY;

      // console.log(this.x, this.y, this.radius)

      ellipse(this.x,this.y,this.radius,this.radius);
    }
    else{
      noStroke();
      ellipse(this.x,this.y,this.radius,this.radius);
    }

  }

  mousePressed(){
    if(this.set){
      this.set = false;
    }
    else{
      this.set = true;
    }
  }
}
