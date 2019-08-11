
export default class Node {
    constructor(name){

        this.name = name;
        // this.parentId = parentId;
        this.id = this.generateId;
        this.children = [];

    }
    generateId = () => {
        let letter = ["a", "b", "c", "d", "e", "f", "g"];
        let rand1 =Math.floor(Math.random()*1000);
        let rand2 =Math.floor(Math.random()*7);
        let rand3 =Math.floor(Math.random()*7);
        let rand4 =Math.floor(Math.random()*1000);
        return letter[rand3] + (rand1) + letter[rand2] + (rand4);
    }
    
}