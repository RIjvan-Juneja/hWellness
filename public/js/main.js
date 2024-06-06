var socket = io();

const el = document.getElementById("wrapper");
const toggleButton = document.getElementById("menu-toggle");

toggleButton.onclick = function () {
  el.classList.toggle("toggled");
};

// for sidebar active class change
const list = document.querySelectorAll(".sidebar-list a");
list.forEach(el => {
  el.classList.remove("active");
});


document.querySelector("#logoutAll").addEventListener("click", async ()=>{
  try {
    const response = await fetch('/logout/all', {
        method: 'POST',
        body: ''
    });

    const resData = await response.json();
    if (response.status === 200) {
        alert("All Divice logout successful");
        socket.emit('logout_attempt_req', {});
    } else {
        alert("All Divice logout Failed");
        console.log(resData);
    }
} catch (error) {
    console.log(error);
}
});


socket.on('logout_attempt_res', (result) => {
  console.log("location");
  window.location.reload();
});	