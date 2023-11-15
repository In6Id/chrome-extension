let copartUrl = document.getElementById('copartUrl');

copartUrl.addEventListener('click', (e) => {
    e.preventDefault();

    chrome.tabs.create({
        url: 'https://www.copart.com/',
        active: true
    })
})

let logout = document.getElementById('logout');

logout.addEventListener('click', (e) => {
    e.preventDefault();

    chrome.runtime.sendMessage({logout: true})
    location.href = './auth.html';
})