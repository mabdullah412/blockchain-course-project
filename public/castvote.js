// get address-field
const addressField = document.getElementById("address-field");

// get polingUnit-field
const polingUnitField = document.getElementById("poling-unit-field");

// get form-hint text
const formHint = document.getElementById("form-hint");

// get candidate buttons
const radioButtons = document.getElementById("custom-radio-button-field");
const candidate1Btn = radioButtons.children[0]
const candidate2Btn = radioButtons.children[1]

// get the hidden candidate field
const candidateField = document.getElementById("candidate-field");

// get the vote button
const voteBtn = document.getElementById("form-button");

// check if candidate was selected or not
var isCandidateSelected = false;

candidate1Btn.addEventListener("click", () => {
    // update css
    candidate2Btn.classList.remove("selected-radio");
    candidate1Btn.classList.add("selected-radio");

    // add data to hidden candidate field
    candidateField.value = candidate1Btn.innerHTML;

    // update VOTE btn status
    isCandidateSelected = true;
    UpdateVoteButtonStatus();
});

candidate2Btn.addEventListener("click", () => {
    // update css
    candidate1Btn.classList.remove("selected-radio");
    candidate2Btn.classList.add("selected-radio");

    // add data to hidden candidate field
    candidateField.value = candidate2Btn.innerHTML;

    // update VOTE btn status
    isCandidateSelected = true;
    UpdateVoteButtonStatus();
});

// update hint, doublecheck performed on both keyup and keydown
addressField.addEventListener("keydown", () => {
    formHint.innerHTML = (42 - addressField.value.length).toString() + " characters remaining";
    UpdateVoteButtonStatus();
});
addressField.addEventListener("keyup", () => {
    formHint.innerHTML = (42 - addressField.value.length).toString() + " characters remaining";
    UpdateVoteButtonStatus();
});

// function to make sure if VOTE button should be enabled or not
function UpdateVoteButtonStatus() {
    if (addressField.value.length != 42) {
        voteBtn.disabled = true;
        return;
    }

    if (!isCandidateSelected) {
        voteBtn.disabled = true;
        return;
    }

    voteBtn.disabled = false;
}