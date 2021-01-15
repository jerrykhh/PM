class LinkedListOutOfBoundsError extends Error{
    constructor(message = "LinkedList Out Of Bounds"){
        super(message);
    }
}

module.exports = LinkedListOutOfBoundsError;