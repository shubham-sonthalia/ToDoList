// first we require the contract we've created and assigned it to 
// a variable called "TodoList"

var ToDoList = artifacts.require("./ToDoList.sol");

module.exports = function(deployer){
    deployer.deploy(ToDoList);
};
