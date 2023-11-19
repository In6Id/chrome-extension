let login = document.getElementById('username');
let password = document.getElementById('password');
let submit = document.getElementById('login');
let copartUrl = document.getElementById('copartUrl');

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

    fetch('https://api.amexlinee.com/api/v1/auth/copart-login?username=tnakopia2&password=ramses2aaf8', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    })
        .then((res) => res.json())
        .then((response) => {

            console.log(response)

            if(response.status == true) {

                const token = response.data.token;

                chrome.runtime.sendMessage({token: token})
                chrome.runtime.sendMessage({credentials: JSON.stringify(response.data)})

                window.localStorage.setItem('amexIsAuth', true);
                window.localStorage.setItem('token', token);
                window.localStorage.setItem('credentials', JSON.stringify(response.data.user));

                copartLogin();

            }

        })
        .catch((err) => console.log(err))


    function copartLogin() {

        fetch('https://www.copart.com/processLogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                username: '255912',
                password: 'marneuli1998',
                accountType: "0",
                accountTypeValue: "0",
            })
        })
        .then((res) => res.json())
        .then((response) => {
            
            chrome.runtime.sendMessage({isAuth: true})
            window.localStorage.setItem('isAuth', true);

            chrome.tabs.query({ url: 'https://www.copart.com/*' }, function (tabs) {

                if (tabs.length > 0) {
                    chrome.tabs.update(tabs[0].id, { active: true });
                } else {
                    chrome.tabs.create({ url: 'https://www.copart.com/', active: true });
                }

            });
                
                location.href = './userPage.html';

            })

        .catch((err) => console.log(err))

    }

})
