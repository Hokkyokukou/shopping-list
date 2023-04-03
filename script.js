var button = document.getElementById("enter");
var input = document.getElementById("userinput");
var ul = document.querySelector("ul");

function inputLength() {
	return input.value.length;
}

function createListElement() {
	var li = document.createElement("li");
	// console.log(li);
	li.appendChild(document.createTextNode(input.value));
	addDeleteButton(li);
	ul.appendChild(li);
	input.value = "";
}

function addListAfterClick() {
	if (inputLength() > 0) {
		createListElement();
	}
}

function addListAfterKeypress(event) {
	if (inputLength() > 0 && event.keyCode === 13) {
		createListElement();
	}
}

button.addEventListener("click", addListAfterClick);

input.addEventListener("keypress", addListAfterKeypress);

/**
 * 
 * 1. If you click on the list item, it toggles the .done  
 * class on and off.
 * 

2. Add buttons next to each list item to delete the item 
when clicked on its corresponding delete button.

3. BONUS: When adding a new list item, it automatically 
adds the delete button next to it (hint: be sure to check 
	if new items are clickable too!)
 * 
 */

var li = document.getElementsByTagName("li");

for (var i = 0; i < li.length; i++) {
	li[i].addEventListener("click", toggleList);
	addDeleteButton(li[i]);
}

//function to add the 'line through' style
function toggleList() {
	this.classList.toggle("done");
}

function removeList() {
	this.parentElement.remove();
}

function addDeleteButton(parent) {
	//creo il bottone
	var button = parent.appendChild(document.createElement("button"));
	button.appendChild(document.createTextNode("delete"));
	
	button.onclick = removeList;
	
}

////////////////////////////////////////////////
//alternative

// var li = document.querySelectorAll("li");

// for (var i=0; i<li.length; i++) {
// 	li[i].addEventListener("click", toggleList);
// }

// function toggleList(event) {
// 	event.currentTarget.classList.toggle("done");
// }
