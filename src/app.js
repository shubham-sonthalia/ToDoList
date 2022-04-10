App = {
  loading: false,
  contracts: {},
  load: async () => {
    //load app...
    await App.connectToBlockchain();
    await App.loadAccount();
    await App.loadContract();
    await App.render();
  },
  // (typeof window !== 'undefined' && typeof window.web3 !== 'undefined')
  connectToBlockchain: async () => {
    if (typeof window.web3 !== "undefined") {
      web3 = new Web3(window.web3.currentProvider);
      App.web3Provider = window.web3.currentProvider;
    } else {
      window.alert("Please connect to Metamask.");
    }
    //Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      try {
        // request account access if needed
        await ethereum.eth_requestAccounts();
        // Accounts now exposed
        eth.sendAsync({})
      } catch (error) {}
    }
    // legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = currentProvider;
      window.web3 = new web3(currentProvider);
      eth.sendTransaction({});
    }
    // Non-dapp browsers...
    else {
      console.log(
        "Non-Ethereum browser detected. You should consider trying Metamask!"
      );
    }
  },
  loadAccount: async () => {
    web3.eth.defaultAccount = web3.eth.accounts[0]
    App.account = web3.eth.accounts[0];
    console.log(App.account);
  },
  loadContract: async() => {
    const todoList = await $.getJSON("TodoList.json")
    App.contracts.TodoList = TruffleContract(todoList)
    App.contracts.TodoList.setProvider(App.web3Provider)
    console.log(todoList)
    App.todoList = await App.contracts.TodoList.deployed()

  },
  render: async() => {
    if(App.loading){
      return;
    }
    App.setLoading(true);

    $("#account").html(App.account);
    await App.renderTasks()


    App.setLoading(false);
  }, 

  createTask: async() => {
    App.setLoading(true)
    const content = $('#newTask').val()
    await App.todoList.createTask(content)
    window.location.reload() // refresh the page
  },
  setLoading: (boolean) => {
    App.loading = boolean;
    const loader = $('#loader');
    const content = $('#content');
    if(boolean){
      loader.show()
      content.hide()
    }
    else
    {
      loader.hide()
      content.show()

    }
  }, 
  renderTasks: async() => 
  {
    //load the total task count from the blockchain
    // render out each task with a new task template 
    const taskCount = await App.todoList.taskCount();
    console.log(taskCount.toNumber())
    const $taskTemplate = $('.taskTemplate')
    for(var i = 1; i <= taskCount.toNumber(); i++){
      const task = await App.todoList.tasks(i);
      const taskId = task[0].toNumber()
      console.log(taskId)
      const taskContent = task[1]
      console.log(taskContent)
      const taskCompleted = task[2]
      console.log(taskCompleted)

       const $newTaskTemplate = $taskTemplate.clone()
       $newTaskTemplate.find('.content').html(taskContent)
       $newTaskTemplate.find('input').prop('name', taskId).prop('checked', taskCompleted) //.on('click', App.toggleCompleted)

       if(taskCompleted){
         $('#completedTaskList').append($newTaskTemplate)
       }
       else{
         $('#taskList').append($newTaskTemplate) 
       }
       $newTaskTemplate.show()
    } 

  }
}

// what is this function doing?

$(() => {
  $(window).load(() => {
    App.load();
  });
});
