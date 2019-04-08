var nodes = [];
var sie = 20;
var createEdgePressed = false;
var createNodePressed = false;
var deleteNodePressed = false;

var createNodeButton;
var deleteNodeButton;

//node flag I dont want the node to create when node button is pressed
var createNodeFlag=0;

var connectedNodes = [];

function setup() {

  createCanvas(displayWidth,displayHeight)
  // nodes.push(new Node(sie));


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
//  create edge to all other nodes
  if(nodes.length>1){
    for(j=0;j<nodes.length;j++){
      for(k=j;k<nodes.length;k++){
          stroke(255);
          // console.log(nodes[j].x,nodes[j].y,nodes[k].x,nodes[k].y);
          line(nodes[j].x,nodes[j].y,nodes[k].x,nodes[k].y);
      }
    }
  }
  // for(i=0;i<nodes.length;i++){
  //   console.log(nodes[i].x,nodes[i].y);
  // }



}

function createNodeButtonPressed(){
  if(createNodePressed){
    createNodePressed = false;
    createNodeFlag = 0;
  }
  else{
    createNodeFlag = 1;
    createNodePressed = true;

      deleteNodePressed = false;
  }
}

function deleteNodeButtonPressed(){
  if(deleteNodePressed){
    deleteNodePressed = false;

  }
  else{

    deleteNodePressed = true;

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
