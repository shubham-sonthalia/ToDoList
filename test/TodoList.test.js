var TodoList = artifacts.require("ToDoList.sol")
var assert = require("assert")

contract('TodoList', accounts => {
    let todoList; 
    beforeEach(async () => {
        todoList = await TodoList.deployed()
        })
          it('deploy successfully', async () => {
              const address = await todoList.address;
                assert.notEqual(address, 0x0)
                assert.notEqual(address, '')
                assert.notEqual(address, null)
                assert.notEqual(address, undefined)
          })
          it('lists tasks', async () => {
              const taskCount = await todoList.taskCount()
              const task = await todoList.tasks(taskCount)
              assert.equal(task.id.toNumber(), taskCount.toNumber())
          })
          it('correct content', async () => {
              const taskCount = await todoList.taskCount()
              const task = await todoList.tasks(taskCount)
              assert.equal(task.content, "Check out my Github profile at 'shubham-sonthalia'")
          })
          it("isCompleted Check", async () => {
            const taskCount = await todoList.taskCount();
            const task = await todoList.tasks(taskCount);
            assert.equal(
              task.completed,false
            );
          })
          it('create tasks', async () => {
              const result = await todoList.createTask("A new task");
              const taskCount = await todoList.taskCount();
              assert.equal(taskCount, 2);
              const event = result.logs[0].args
              assert.equal(event.content, "A new task")
              assert.equal(event.completed, false)
              assert.equal(event.id.toNumber(), 2)
          })
          it("toggles task completed", async () => {
              const result = await todoList.toggleCompleted(1);
              const task = await todoList.tasks(1)
              assert(task.completed, true)
              const event = result.logs[0].args
              assert.equal(event.id.toNumber(), 1)
              assert.equal(event.completed, true)
          })
})