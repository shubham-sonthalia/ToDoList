pragma solidity ^0.5.0;



contract ToDoList {
    // state variable -> stored on the blockchain 
    uint public taskCount = 0;
    // solidity is a static typed language 
    
    struct Task {
        uint id;
        string content; 
        bool completed;  
    }
    mapping(uint => Task) public tasks; 
    event TaskCreated (
    uint id, 
    string content,
    bool completed
);
    // a database for us
    // an id for the task that maps to the Task data type 
    // solidity gives a reader function for all public variables. 

    constructor() public {
        // a function that is called when the smart contract is 
        // deployed 
        createTask("Check out my Github profile at 'shubham-sonthalia'");
    }

    function createTask(string memory _content) public {
        taskCount++;
        tasks[taskCount] = Task(taskCount, _content,false);
        // solidity allows us to trigger events that are trigggered when something happens with the smart contract 
        // events are useful to listen to those events and know that they were completed. 

        emit TaskCreated(taskCount, _content, false);

    }


}