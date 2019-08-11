import Node from './node'

export default class Tree {

    constructor(){
        this.tree = new Node("");
    }


    addNode (data, nodeObject) {
        if(nodeObject == undefined){
            this.tree.children.push(data)
        } else{
            nodeObject.children.push(data)
        }
    }
    
}