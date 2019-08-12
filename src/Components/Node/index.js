import React from 'react';
import Tree from 'react-d3-tree';
import clone from "clone";
 
const TreeData = {
  nodeId: 1,
  name : "root",
  children: [
   
  ]
};

const svgSquare = {
  shape: 'rect',
  shapeProps: {
    width: 20,
    height: 20,
    x: -10,
    y: -10,
  }
}

const containerStyles = {
  width: "100%",
  height: "100vh"
};
 
class Root extends React.PureComponent {
  constructor(){
    super()
  this.state = {
    data : TreeData,
    DataId : "",
    title : "",
    content : ""
  };
}

    handleTitle = (e) => {
      this.setState({title : e.target.value})
    }

    handleContent = (e) => {
      this.setState({content : e.target.value})
    }
  
    generateId = () => {
      let letter = ["a", "b", "c", "d", "e", "f", "g","x","p","k","u","h","n","l","z","g"];
      let rand1 =Math.floor(Math.random()*10000);
      let rand2 =Math.floor(Math.random()*16);
      let rand3 =Math.floor(Math.random()*16);
      let rand4 =Math.floor(Math.random()*10000);
      return letter[rand3] + (rand1) + letter[rand2] + (rand4);
  }

  addNode = (data,id,newNode) => {
    var flag = false;
    if(data.nodeId == id) {
      flag = true;
      data.children.push(newNode);
    }
    if(flag == false) { 
      data.children.forEach(e => {
        if(id == e.nodeId) {
          flag =true;
          e.children.push(newNode);
        }
      })
    }
    if(flag == false){
      data.children.forEach(e => {
        this.addNode(e,id,newNode)
      })
    }
  }
 

  removeNode = (data,id) => {
    var flag = false;
    
    if(flag == false) {
      data.children.forEach(e => {
        if(id == e.nodeId) {
          flag = true;
          const index = data.children.findIndex(a => a.nodeId === id);
          console.log(index)
          if (index === -1) return;
          data.children.splice(index, 1);
        }
      })
    }
    if(flag == false) {
      data.children.forEach(e => {
        this.removeNode(e,id);
      })
    }
  }

render(){
    return(
      <div style={containerStyles}>
      {this.state.DataId ?
      <div>
        <input onChange={this.handleTitle}/>
        <input onChange={this.handleContent}/>
        <button onClick={() => {
          var data = clone(this.state.data)
          this.addNode(data,this.state.DataId,{nodeId:this.generateId(),parentId:this.state.DataId,name : this.state.title , content : this.state.content, children : []})
          this.setState({
            data : data
          })
        }} > Save </button>
         <button onClick={() => {
          var data = clone(this.state.data)
          this.removeNode(data,this.state.DataId)
          this.setState({
            data : data
          })
        }} > Remove </button>
      </div> : null
       }

        <Tree
            data = {this.state.data}
            nodeSvidgShape={svgSquare}
            translidate={this.state.translate}
            orientidation={"vertical"}
            onClick={(e) => {
              this.setState({
                DataId : e.nodeId
              })
            }} 
            onChange = {this.generateId}
            
        />
        
      </div>
      
    )
}
}

export default Root;