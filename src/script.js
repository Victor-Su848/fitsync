// be default load the workout page first
document.getElementById("workout").style.display = "block";

// Code that runs when DOM content is loaded
// Contains multiple functions... Should seperate into separate code blocks for better organization
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

  // Add new exercise
  const addExerciseButton = document.querySelector(".add-exercise-button");
  const exercisesContainer = document.querySelector(".exercises-container");

  addExerciseButton.addEventListener("click", () => {
    const exerciseContainer = createExerciseContainer();
    exercisesContainer.appendChild(exerciseContainer);
  });

  // Create a new exercise container with the add set and remove exercise buttons
  function createExerciseContainer() {
    const exerciseContainer = document.createElement("div");
    exerciseContainer.classList.add("exercise-selection-container");

    const exerciseTitleContainer = document.createElement("div");
    exerciseTitleContainer.classList.add("exercise-title-container");

    const exerciseLabel = document.createElement("p");
    exerciseLabel.textContent = "Exercise:";

    const exerciseInput = document.createElement("input");

    // Remove exercise button
    const removeExerciseButton = document.createElement("button");
    removeExerciseButton.textContent = "Remove Exercise";
    removeExerciseButton.style.marginLeft = "10px";
    removeExerciseButton.addEventListener("click", () => {
      exerciseContainer.remove();
    });

    // Append title and remove button
    exerciseTitleContainer.appendChild(exerciseLabel);
    exerciseTitleContainer.appendChild(exerciseInput);
    exerciseTitleContainer.appendChild(removeExerciseButton);

    const setsContainer = document.createElement("div");
    setsContainer.classList.add("exercise-sets-container");

    const addSetButton = document.createElement("button");
    addSetButton.textContent = "+ Add Set";

    // Add set functionality
    addSetButton.addEventListener("click", () => {
      const setElement = createSetElement();
      setsContainer.appendChild(setElement);
    });

    // Append everything to the exercise container
    exerciseContainer.appendChild(exerciseTitleContainer);
    exerciseContainer.appendChild(setsContainer);
    exerciseContainer.appendChild(addSetButton);

    return exerciseContainer;
  }

  // Create a new set element with a remove button
  function createSetElement() {
    const newSet = document.createElement("div");
    newSet.classList.add("set");

    const weightLabel = document.createElement("p");
    weightLabel.textContent = "lbs:";

    const weightInput = document.createElement("input");

    const repsLabel = document.createElement("p");
    repsLabel.textContent = "reps:";

    const repsInput = document.createElement("input");

    // Remove set button
    const removeSetButton = document.createElement("button");
    removeSetButton.textContent = "Remove Set";
    removeSetButton.style.marginLeft = "10px";
    removeSetButton.addEventListener("click", () => {
      newSet.remove();
    });

    // Append elements to the new set
    newSet.appendChild(weightLabel);
    newSet.appendChild(weightInput);
    newSet.appendChild(repsLabel);
    newSet.appendChild(repsInput);
    newSet.appendChild(removeSetButton);

    return newSet;
  }

  // Initial exercise on load
  const initialExercise = createExerciseContainer();
  exercisesContainer.appendChild(initialExercise);
});

// Timer setup
document.addEventListener("DOMContentLoaded", () => {
  let secondsElapsed = 0;

  function formatTime(secs) {
    const hours = String(Math.floor(secs / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
    const seconds = String(secs % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }

  function updateTimer() {
    const timerDisplay = document.getElementById("workout-timer");
    if (timerDisplay) {
      timerDisplay.textContent = formatTime(secondsElapsed);
      secondsElapsed++;
    }
  }

  setInterval(updateTimer, 1000);
});
