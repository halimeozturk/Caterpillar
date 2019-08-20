import React from 'react';
import Tree from 'react-d3-tree';
import clone from "clone";
import "./index.css"
import FontPicker from "font-picker-react";
import { BasicPicker } from 'react-color-tools';

const TreeData = {
  nodeId: 1,
  name : "root",
  children: [
   
  ]
};

const containerStyles = {
  width: "100%",
  height: "2000vh",
  backgroundColor:"#f7eeee",
};

class Node extends React.PureComponent {
  constructor(){
    super()
  this.state = {
    data : TreeData,
    DataId : "",
    title : "",
    content : "",
    activeFontFamily: "Open Sans",
    color: 'white',
    backgroundColor:'black'
  };
}

  card = ({ nodeData }) => (
    <div  className="apply-font">
      <div className="node-container" style={{backgroundColor:this.state.backgroundColor}}>
          <h5 style={{textAlign: "center", fontSize:30,overflow:"hidden",color:this.state.color}} className="card-title">
            {nodeData.name}
          </h5>
          <p style={{fontSize:25 ,overflow:"hidden",color:this.state.color}} className="card-text">
            {nodeData.content}
          </p>
      </div>
    </div>
  );

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
      <div style={containerStyles}  ref={tc => (this.treeContainer = tc)}>

      {this.state.DataId ?
      <div className="div-container ">
          <form action= "" className="main-form" >

            <div class="form-group">
              <input className ="form-control" style={{margin: "auto" , width: "420px",fontSize:30, height:50,overflow:"hidden",border: "2px solid#452121",borderRadius: "7px"}} onChange={this.handleTitle} placeholder="Title" />
            </div>

            <div class="form-group">
              <input className ="form-control" style={{ margin: "auto" ,width: "420px", fontSize:25, height:130,border: "2px solid#452121",borderRadius: "7px"}} onChange={this.handleContent} placeholder="Content"/>
            </div>
            
            <FontPicker
                apiKey="AIzaSyAU_jLt3CC5xoK2VZ0W295IMfiVDaMzn8Y"
                activeFontFamily={this.state.activeFontFamily}
                onChange={nextFont =>
                this.setState({
                    activeFontFamily: nextFont.family,
            })
          }
        />

            <h5 style={{color:"#783a3a"}}>Change Text Color</h5>
            <BasicPicker
              color={this.state.color}
              onChange={color => this.setState({ color })}
            />
          <h5 style={{color:"#783a3a"}}>Change Box Color</h5>
            <BasicPicker
              backgroundColor={this.state.backgroundColor}
              onChange={backgroundColor => this.setState({ backgroundColor })}
            />
      </form>
      
        <button  class="btn btn-dark" style={{ margin: "5px" , fontSize:25}} onClick={() => {
          var data = clone(this.state.data)
          this.addNode(data,this.state.DataId,{nodeId:this.generateId(),parentId:this.state.DataId,name : this.state.title , content : this.state.content, children : []})
          this.setState({
            data : data
          })
        }}> Save </button>
        
         <button  class="btn btn-dark"  style={{ margin: "5px" , fontSize:25}} onClick={() => {
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
            orientation={"vertical"}
            onClick={(e) => {
              this.setState({
                DataId : e.nodeId
              })
            }} 
            onChange = {this.generateId}
            translate={this.state.translate}
            // zoomable={true}
            scaleExtent={{ min: 1, max: 3 }}
            allowForeignObjects
            nodeSvgShape={{ shape: "none" }}
            translate={{ x: 700, y: 450 }}
            nodeSize={{ x: 300, y: 300 }}
             nodeLabelComponent={{
            render: <this.card />,
            foreignObjectWrapper: {
              style: {
                x: -90,
                y: -100,
                
              }
            }
          }}
            
        />

       
        </div>
      
    )
}
}

export default Node;