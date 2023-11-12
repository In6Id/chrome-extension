let copartUrl = document.getElementById('copartUrl');

copartUrl.addEventListener('click', (e) => {
    e.preventDefault();

    chrome.tabs.create({
        url: 'https://www.copart.com/',
        active: true
    })
})
