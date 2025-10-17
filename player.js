class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
    moveNext() {
        return this.next;
    }
    movePrev() {
        return this.prev;
    }
    getCurrent() {
        return this.data;
    }
}
class DoublyLinkedList {
    constructor() {
        this.head = null;   
        this.tail = null;
    }
    append(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
    }
    getHead() {
        return this.head;
    }
    getTail() {
        return this.tail;
    }
    isEmpty() {
        return this.head === null;
    }
    clear() {
        this.head = null;
        this.tail = null;
    }
    toArray() {
        const array = [];
        let current = this.head;
        while (current) {
            array.push(current.getCurrent());
            current = current.moveNext();
        }
        return array;
    }
    fromArray(array) {
        this.clear();
        for (const item of array) {
            this.append(item);
        }
    }
    getCurrent() {
        return this.head ? this.head.getCurrent() : null;
    }
    moveNext() {
        if (this.head) {
            this.head = this.head.moveNext();
        }
    }
    movePrev() {
        if (this.head) {
            this.head = this.head.movePrev();
        }
    }
    reset() {
        this.head = this.getHead();
    }
}


