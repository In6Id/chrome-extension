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

// chrome.runtime.sendMessage({ htmlContent: pageHTML });
