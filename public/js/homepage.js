// const { token } = sessionStorage;
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDM2Yzk4NTBkYWUyNDNmYTgzNjZlMzMiLCJpYXQiOjE2MTQyMDMyNjksImV4cCI6MTYxNTA2NzI2OX0.PHIj0l343l8ofX1yh7ql_fwyFD0FORafzPdNSdz8xow";
const socket = io.connect();

// socket.on('connect', socket => {
//     socket
//         .on('authenticated', () => {
//             //do other things
//         })
//         .emit('authenticate', { token }); //send the jwt
// });

const btn = document.getElementById('send-data');
btn.addEventListener('click', () => {
    socket.emit('authenticate', { token });
});

socket.on('authenticated', message => {
    console.log(message);
})