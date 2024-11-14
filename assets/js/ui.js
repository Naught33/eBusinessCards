
//DOM elements
const lightBtn = document.getElementById('lightbtn');
const darkBtn = document.getElementById('darkbtn');
const qrBtn = document.getElementById('qrbtn');
const websiteBtn = document.getElementById('website');
const emailBtn = document.getElementById('email');
const phoneBtn = document.getElementById('phoneicon');
const locationBtn = document.getElementById('locationicon');
const flipControler = document.getElementsByClassName('controler')[0];
const card = document.getElementById('card');
const shareBtn = document.getElementById('share');
const closeBtn = document.getElementById('close');
const popUp = document.getElementsByClassName('popup')[0];
const qrcode = document.getElementById('qrcode');
const loader = document.getElementById('loader');
// const message = document.getElementById('errorlog');

// global constants
const targetWebsite = "https://www.fasttracktalenthouse.com/";

//globals
let darkMode = false;
let cardFace = "back";
let generatedQRcode = null;

const image = document.createElement('img');


function lightSwitch(btn){
    if(!darkMode && btn === darkBtn){
        document.body.classList.add('darkmode');
        darkBtn.style.backgroundColor = "var(--line-bg-light)";
        lightBtn.style.backgroundColor = "transparent";
        darkMode = true;
        return;
    }

    if(!darkMode && btn === lightBtn){
        console.log('Already in light Mode');
        return;
    }

    if(darkMode===true && btn === darkBtn){
        console.log('Already in dark mode');
        return;
    }

    if(darkMode===true && btn === lightBtn){
        console.log('Switched to light mode');
        document.body.classList.remove('darkmode');
        darkBtn.style.backgroundColor = "transparent";
        lightBtn.style.backgroundColor = "var(--line-bg-light)";
        darkMode = false;
        return;
    }

}

function flipCardBack(e){
    if(cardFace === "front"){
        card.style.transform = "rotateY(0deg)";
        cardFace = "back";
        e.target.style.backgroundColor = "var(--line-bg-light)";
        document.getElementById('flipFront').style.backgroundColor = "transparent";
        return;
    }
    return;    
}

function flipCardFront(e){
    if(cardFace === "back"){
        card.style.transform = "rotateY(180deg)";
        cardFace = "front";
        e.target.style.backgroundColor = "var(--line-bg-light)";
        document.getElementById('flipBack').style.backgroundColor = "transparent";
        return;
    }
    return;  
}

function initiateMail(){
    const recipient = "fasttracktalenthouse@gmail.com";
    const subject = "Edit Subject";
    const body = "Edit Body";

    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
}


async function generateQRcode(){
    const data = window.location.href;
    const size = "238x238"; 
    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(data)}&size=${size}`;

    generatedQRcode = apiUrl;
}

// console.log(generateQRcode());


async function share(){    
    if (generatedQRcode === null) {
        console.log('QR code not generated yet.');
        return;
    }

    try {
        // Create a blob from the generated QR code image
        const response = await fetch(generatedQRcode);
        const blob = await response.blob();
        const file = new File([blob], "qrcode.png", { type: 'image/png' });

        // Check if the Web Share API is available
        if (navigator.share) {
            await navigator.share({
                title: 'Fasttrack QR code',
                text: 'Scan our QR code to view our business card online: \n \n' + generatedQRcode+ '\n \n You can also click this link to view it directly: \n \n' + window.location.href,
                files: [file],  // Share the generated QR code image
            });
            console.log('Shared successfully');
        } else {
          console.log('see you soon');
        }
    } catch (error) {
        console.error('Error sharing the QR code:', error);
    }
}

function closePopUp(){
    popUp.classList.remove('poppedup');
}

function openPopUp(){
    if(generatedQRcode===null){
        generateQRcode().then(()=>{
            qrcode.removeChild(loader);
            qrcode.appendChild(image);
            console.log(generatedQRcode)
            image.setAttribute('src',generatedQRcode);
            popUp.classList.add('poppedup');
        });
        return;
    }
    popUp.classList.add('poppedup');
    qrcode.appendChild(image);
    image.setAttribute('src',generatedQRcode);
}

lightBtn.addEventListener('click',()=>{
    lightSwitch(lightBtn);
});

darkBtn.addEventListener('click',()=>{
    lightSwitch(darkBtn);
});

websiteBtn.addEventListener("click",()=>{
    window.location.href = targetWebsite;
});

flipControler.addEventListener('click',(e)=>{
    if(e.target === document.getElementById('flipBack')){
        flipCardBack(e);
    }

    if(e.target === document.getElementById('flipFront')){
        flipCardFront(e);
    }
});

qrBtn.addEventListener('click',()=>{
    openPopUp()
});

closeBtn.addEventListener('click',()=>{
    closePopUp();
});

emailBtn.addEventListener('click', ()=>{
    initiateMail();
});

shareBtn.addEventListener('click',()=>{
    share();
})