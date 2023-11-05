let login = document.getElementById('username');
let password = document.getElementById('password');
let submit = document.getElementById('login');

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}


submit.addEventListener('click', (e) => {
    e.preventDefault();

    // fetch('https://api.amexlinee.com/api/v1/auth/copart-login?username=nik11&password=12345678', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json',
    //         'Access-Control-Allow-Origin': '*'
    //     }
    // })
    //     .then((res) => res.json())
    //     .then((response) => {
    //         const token = response.data.token;
            
    //         const { acc , psw } = parseJwt(token);


    //         console.log(acc, psw);

    //     })
    //     .catch((err) => console.log(err))


    fetch('https://www.copart.com/processLogin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            username: 'vanikogogaladze@gmail.com',
            password: 'Cotne123',
            accountType: "0",
            accountTypeValue: "0",
        })
    })
        .then((res) => res.json())
        .then((response) => {
            console.log('sent message to background.js');
            chrome.runtime.sendMessage({reloadPage: true})
            location.href = './userPage.html';
        })
        .catch((err) => console.log(err))

})