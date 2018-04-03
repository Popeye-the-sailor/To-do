var addButton = document.getElementById('add');
var inputTask = document.getElementById('new-task');
var unfinishedTasks = document.getElementById('unfinished-tasks');
var finishedTasks = document.getElementById('finished-tasks');

function createNewElement (task){
	var listItem = document.createElement ('li');
	listItem.className = "lis1";
	var checkBox = document.createElement ('a');
	checkBox.innerText = 'done';
	checkBox.className = "ok";
	var label = document.createElement ('label');
	label.innerText = task;
	var input = document.createElement ('input');
	input.type = 'text';
	/*var editButton = document.createElement('a');
	editButton.className = "btn btn_edit";
	editButton.innerText = 'Edit';*/
	var deleteButton = document.createElement('a');
	deleteButton.className = "btn btn_delete";
	deleteButton.innerText = 'Delete';
	
	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	/*listItem.appendChild(input);*/
	listItem.appendChild(deleteButton);
	/*	listItem.appendChild(editButton); */
	return listItem;

};

function addTask(){
	if	(inputTask.value) {
		var listItem = createNewElement(inputTask.value);
		unfinishedTasks.appendChild(listItem);
		bindTaskEvents(listItem,finishTask);
		inputTask.value = '';
	}
	save();
};


addButton.onclick = addTask;

function deleteTask(){
 listItem = this.parentNode;
	var ul = listItem.parentNode;
	ul.removeChild(listItem);
	save();
};

function editTask(){	
	var editButton = this;
	
};

function finishTask(){
	listItem = this.parentNode;
	if (listItem.parentNode == finishedTasks) {
		unfinishedTasks.appendChild(listItem);
		this.innerText = "Done" ;
	} else {
		finishedTasks.appendChild(listItem);
		this.innerText = "Undo" ;
	};
	save();
		
};

function save (){
	var unfinishedArr = [],
			finishedArr = [];
	
	for (var i=0; i<unfinishedTasks.children.length; i++){
	  unfinishedArr[i] = unfinishedTasks.children[i]
			                             .getElementsByTagName('label')[0]
			                             .innerText;
	};
	
	for (var i=0; i<finishedTasks.children.length; i++){
	  finishedArr[i] = finishedTasks.children[i]
			                             .getElementsByTagName('label')[0]
			                             .innerText;
	};
  localStorage.removeItem('to_do');
	localStorage.setItem('to_do', JSON.stringify({
		unfinishedTasks: unfinishedArr,
		finishedTasks: finishedArr		
	}));
	
};

function load (){
	return JSON.parse(localStorage.getItem('to_do'));
};

function bindTaskEvents(listItem, checkboxEvent){
	var checkbox = listItem.querySelector('a.ok');
	var editButton = listItem.querySelector('a.btn_edit');
	var deleteButton = listItem.querySelector('a.btn_delete');
	
	checkbox.onclick = finishTask;
	/*editButton.onclick = editTask;*/
	deleteButton.onclick = deleteTask;	
};
