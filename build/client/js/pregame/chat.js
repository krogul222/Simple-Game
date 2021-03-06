let chatText = document.getElementById('chat-text');
let chatInput = document.getElementById('chat-input');
let chatForm = document.getElementById('chat-form');
socket.on('addToChat', function (data) {
    chatText.innerHTML += '<div>' + data + '</div>';
});
socket.on('evalAnswer', function (data) {
    console.log(data);
});
chatForm.onsubmit = function (e) {
    e.preventDefault();
    if (chatInput.value[0] == '/') {
        socket.emit('evalServer', chatInput.value.slice(1));
    }
    else {
        socket.emit('sendMsgToServer', chatInput.value);
    }
    chatInput.value = '';
};
//# sourceMappingURL=chat.js.map