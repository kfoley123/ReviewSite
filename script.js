
const submitButton = document.getElementById("submit");
const inputFieldIds = ['fNameField', 'lNameField', 'emailField', 'inputField'];

submitButton.addEventListener("click", function (event) {
  event.preventDefault();

  // Capture values in the submission array
  let submission = inputFieldIds.map(id => {
    const inputElement = document.getElementById(id);
    return inputElement.value;
  });

  console.log(submission);

  // Clear values by looping through the array
  inputFieldIds.forEach(id => {
    const inputElement = document.getElementById(id);
    inputElement.value = "";
  });
});