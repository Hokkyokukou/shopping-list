function myShoppingList() {
	let button = document.getElementById("enter");
	let input = document.getElementById("userinput");
	let ul = document.querySelector("ul");

	function inputLength() {
		return input.value.length;
	}

	function createListElement() {
		let li = document.createElement("li");
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

	let li = document.getElementsByTagName("li");

	for (let i = 0; i < li.length; i++) {
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
		let button = parent.appendChild(document.createElement("button"));
		button.appendChild(document.createTextNode("delete"));
		button.onclick = removeList;
	}
}

myShoppingList();