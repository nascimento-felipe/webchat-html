const socket = io();

const urlSearch = new URLSearchParams(window.location.search);
const username = urlSearch.get("username");
const room = urlSearch.get("select-room")

// emit -> emitir alguma informacao
// on -> escutando alguma informacao

const usernameDiv = document.getElementById("username")

usernameDiv.innerHTML = `Ola ${username} - Voce esta na sala ${room}`

socket.emit("select-room", {
  username,
  room
}, response => {
  response.forEach(message => {
    createMessage(message)
  });
})

document.getElementById("message_input").addEventListener("keypress", (event) => {
  if (event.key === 'Enter') {
    const message = event.target.value;

    const data = {
      room,
      message,
      username
    }

    socket.emit("message", data);

    event.target.value = "";
  }
})

socket.on("message", (data) => {
  createMessage(data);
})

function createMessage(data) {
  const messageDiv = document.getElementById("messages")

  messageDiv.innerHTML += `
  <div class="new_message">
    <label class="form-label">
      <strong> ${data.username} </strong> <span>${data.text} - ${data.createdAt}</span>
    </label>
  </div>
  `
}

document.getElementById("logout").addEventListener("click", (event) => {
  window.location.href = "index.html"
})