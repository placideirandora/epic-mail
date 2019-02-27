//variables

const modal = document.querySelector(".modal");
const resetLink = document.querySelector("#trigger");
const resetButton = document.querySelector("#reset");


//listeners
 
resetLink.addEventListener("click", togglemodal);
resetButton.addEventListener("click", notification1);
window.addEventListener("click", windowOnClick);


//helpers

function togglemodal() 
{
    modal.classList.toggle("show-modal");
}

function notification1()
{
    alert("Password reset link has been sent to the email");

    if (alert)
    {
        togglemodal();
    }
}

function windowOnClick(event) 
{
    if (event.target === modal) 
    {
        togglemodal();
    }
}

