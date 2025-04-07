// be default load the workout page first
document.getElementById("workout").style.display = "block";

document.addEventListener("DOMContentLoaded", () => {
	const tabs = document.querySelectorAll(".navbar a");
	const pages = document.querySelectorAll(".page");

	// Set the default page to "workout"
	document.getElementById("workout").style.display = "block";
	document.getElementById("workout-link").classList.add("active");

	// Navigation functionality
	tabs.forEach((tab) => {
		tab.addEventListener("click", (event) => {
			event.preventDefault();
			const targetPage = tab.dataset.page;

			// Hide all pages
			pages.forEach((page) => (page.style.display = "none"));

			// Change all link colors to default
			tabs.forEach((tab) => tab.classList.remove("active"));

			// Show the target page
			document.getElementById(targetPage).style.display = "block";

			// Change target link's color to blue
			tab.classList.add("active");
		});
	});

	document.querySelectorAll(".add-set-button").forEach((button) => {
		button.addEventListener("click", () => {
			const container = button.previousElementSibling; // .exercise-sets-container
			const newSet = createSetElement();
			container.appendChild(newSet);
			updateSetNumbers(container);
		});
	});

	function createSetElement() {
		const setRow = document.createElement("div");
		setRow.classList.add("set-row");

		const halfOne = document.createElement("div");
		halfOne.classList.add("set-row-half-one");
		const setLabel = document.createElement("h1");
		setLabel.textContent = "Set"; // will be updated later
		halfOne.appendChild(setLabel);

		const halfTwo = document.createElement("div");
		halfTwo.classList.add("set-row-half-two");

		const inputContainer = document.createElement("div");
		inputContainer.classList.add("lbs-reps-input-container");
		const lbsInput = document.createElement("input");
		lbsInput.classList.add("lbs-input");
		const repsInput = document.createElement("input");
		repsInput.classList.add("reps-input");
		inputContainer.appendChild(lbsInput);
		inputContainer.appendChild(repsInput);

		const removeButton = document.createElement("button");
		removeButton.classList.add("remove-set-button");
		removeButton.textContent = "Remove";
		
		removeButton.addEventListener("click", () => {
			const container = setRow.parentElement;
			setRow.remove();
			const setRows = [...container.querySelectorAll(".set-row")];
			setRows.forEach((row, index) => {
				const label = row.querySelector(".set-row-half-one h1");
				label.textContent = `${index + 1}`;
			});
		});


		halfTwo.appendChild(inputContainer);
		halfTwo.appendChild(removeButton);

		setRow.appendChild(halfOne);
		setRow.appendChild(halfTwo);

		return setRow;
	}

	function updateSetNumbers(container) {
		const setRows = container.querySelectorAll(".set-row");
		setRows.forEach((row, index) => {
			const label = row.querySelector(".set-row-half-one h1");
			label.textContent = `${index + 1}`;
		});
	}
	
	// Automatically create the first set on page load
	document.querySelectorAll('.exercise-sets-container').forEach(container => {
		const initialSet = createSetElement();
		container.appendChild(initialSet);
		updateSetNumbers(container);
	});
	
	
});

document.addEventListener("DOMContentLoaded", () => {
	const toggleButtons = document.querySelectorAll(".dropdown-toggle");

	toggleButtons.forEach((button) => {
		button.addEventListener("click", () => {
			const panel = button.closest("div").nextElementSibling;

			if (panel.classList.contains("open")) {
				panel.style.height = panel.scrollHeight + "px"; // set fixed height to trigger animation
				requestAnimationFrame(() => {
					panel.style.height = "0";
				});
				panel.classList.remove("open");
				button.textContent = "▼";
			} else {
				panel.style.height = panel.scrollHeight + "px";
				panel.classList.add("open");
				button.textContent = "▲";

				// After animation completes, reset to auto so it can grow/shrink with content
				panel.addEventListener("transitionend", function handler() {
					panel.style.height = "auto";
					panel.removeEventListener("transitionend", handler);
				});
			}
		});
	});
});
