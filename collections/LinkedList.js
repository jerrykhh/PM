const Node = require('./Node');
const LinkedListOutOfBoundsError = require('./errors/LinkedListOutOfBoundsError')

class LinkedList {
    constructor(){
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    size = () => {
        return this.length;
    }

    isEmpty = () => {
        return this.length === 0;
    }

    append = (obj) => {
        let newNode = new Node(obj);

        if(this.head == null){
            this.head = newNode
        }else{
            let current = this.head;
            while(current.next != null)
                current = current.next
            current.next = newNode;
        }
        this.length++;
    }

    insert(position, obj){
        if(position > -1 && position <= this.length){
            let newNode = new Node(obj);
            let current = this.head;
            
            if(position == 0){
                newNode.next = current;
                this.head = newNode;
            }else{
                let index = 0;
                let previousNode;
                while(index != position){
                    index++;
                    previousNode = current;
                    current = current.next;
                }
                newNode.next = current;
                previousNode = newNode;
            }
            this.length++;
            return true;

        }else{
            return false;
        }
    }

    getList = (startCount, endCount) => {
        /*if(this.isEmpty())
            throw LinkedListOutOfBoundsError();*/
        let count = 0;
        let objList = [];
        let current = this.head;
        
        while(count < endCount){
            if(count >= startCount)
                objList.push(current);
            current = current.next;
            count++;
        }

        return objList;
    }

    getList = () => {
        let objList = [];
        let current = this.head;
        while(current != this.tail){
            objList.push(current);
            current = current.next;
        }
        return objList;
    }


}

module.exports = LinkedList;