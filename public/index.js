// code to close the response box that appears after voting
const responseBox = document.getElementsByClassName("response-box")[0];
if (typeof responseBox != 'undefined') {
    const closeBtn = responseBox.children[2];
    closeBtn.addEventListener("click", () => {
        responseBox.style.display = 'none';
    });
}