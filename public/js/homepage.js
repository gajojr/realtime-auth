const socket = io.connect();

const $form = document.getElementById('shitty-form');
$form.addEventListener('submit', e => {
    e.preventDefault();
    const username = e.target.username.value;
    socket.emit('authenticate', { username });
});

socket.on('authenticated', message => {
    console.log(message);
})