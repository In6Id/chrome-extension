// contentScript.js

let a = document.querySelector('#top')
let b = a.querySelector('.logo')
let c = b.querySelector('a')
let d = c.querySelector('img')

d.src = 'https://amexlinee.com/static/media/logo-white.bbb520d68470629a118016f1628ce2f9.svg'

console.log(d);

if(document.getElementById('headerloggedInUserDropdown').querySelector('.d-f-c').children.length > 1) {
    let menu = document.getElementById('headerloggedInUserDropdown')
    let spans = menu.querySelector('.d-f-c')
    let childrens = spans.children

    for(let i = 0; i < 4; i++) {
        childrens[0].remove()
    }
}

let footer = document.getElementById('footer-container')
footer.remove()

let headerloggedInUserDropdown = document.getElementById('headerloggedInUserDropdown')
headerloggedInUserDropdown.style.display = 'none'



let nav = document.querySelector('.nav.navbar-nav')

let permissions = ['payments', 'dashboard', 'findVehicles', 'Auctions', 'bidStatus']

for(let i = 0; i < nav.children.length; i++) {
    if(!permissions.includes(nav.children[i].getAttribute('ng-class')?.split("'")[1])) nav.children[i].remove()
}

console.log('done')

// chrome.runtime.sendMessage({ htmlContent: pageHTML });


function appendAmexlineButton() {
    const amexlineButton = document.createElement('a');
    amexlineButton.className = 'btn btn-lblue';
    amexlineButton.style.backgroundColor = 'purple';
    amexlineButton.style.color = 'white';
    amexlineButton.textContent = 'Amexline';
    amexlineButton.addEventListener('click', showExtension);

    const dropdownMenu = document.querySelector('.signin.sign-in-btn .boxlg');
    if (dropdownMenu) {
        dropdownMenu.insertBefore(amexlineButton, dropdownMenu.firstChild);
    }        

}
function showExtension() {
    chrome.runtime.sendMessage({ openExtension: true });
}

if(window.localStorage.getItem('isAuth') == 'false') {
    appendAmexlineButton();
}

// if(window.localStorage.getItem('isAuth') == 'false'){
//         const modal = document.createElement('div');
//         modal.id = 'authModal';

//         fetch('../Template/auth.html')
//         .then(response => response.text())
//         .then(htmlContent => {
//             modal.innerHTML = htmlContent;

//             // Apply styles to the modal
//             modal.style.position = 'fixed';
//             modal.style.top = '50%';
//             modal.style.left = '50%';
//             modal.style.transform = 'translate(-50%, -50%)';
//             modal.style.backgroundColor = 'white';
//             modal.style.padding = '20px';
//             modal.style.border = '1px solid #ccc';
//             modal.style.zIndex = '1001';


//             const backdrop = document.createElement('div');
//             backdrop.classList.add('backdrop');

//             backdrop.style.position = 'fixed';
//             backdrop.style.top = '0';
//             backdrop.style.left = '0';
//             backdrop.style.width = '100%';
//             backdrop.style.height = '100%';
//             backdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
//             backdrop.style.zIndex = '1000';
//             backdrop.style.backdropFilter = 'blur(2px)'; // Adjust the blur effect

//             document.body.appendChild(modal);
//             document.body.appendChild(backdrop);

//             // Show the modal
//             modal.style.display = 'block';
//         })
//         .catch(error => console.error('Error fetching auth.html:', error));
// }else{
//     console.log(window.localStorage.getItem('isAuth'))
// }