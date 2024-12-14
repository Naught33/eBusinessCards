
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
const backCardBtns = document.getElementsByClassName('card-btn-grp')[0];
const frontCardBtns = document.getElementsByClassName('lead');
const engagements = document.getElementsByClassName('engagement-item');
const bottomModal = document.getElementById('bottom-modal');
const bottomModalClose = document.getElementById('close-modal-bottom');
const modalBody = document.getElementById('modal-body');
const headerMission = document.getElementById('mission');
const headerProducts = document.getElementById('products');
const modalHeader = document.getElementById('modal-header');
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
        darkBtn.style.color = "white";
        lightBtn.style.color = "black";
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
        lightBtn.style.color = "white";
        darkBtn.style.color = "black";
        darkMode = false;
        return;
    }

}

function flipCardBack(e){
    if(cardFace === "front"){
        card.style.transform = "rotateY(0deg)";
        document.getElementsByClassName('front')[0].style.zIndex = '0';
        cardFace = "back";
        e.target.style.backgroundColor = "var(--line-bg-light)";
        e.target.style.color = "white";
        document.getElementById('flipFront').style.backgroundColor = "transparent";
        return;
    }
    return;    
}

function flipCardFront(e){
    if(cardFace === "back"){
        card.style.transform = "rotateY(180deg)";
        document.getElementsByClassName('front')[0].style.zIndex = '9999';
        cardFace = "front";
        e.target.style.backgroundColor = "var(--line-bg-light)";
        e.target.style.color = "white";
        document.getElementById('flipBack').style.backgroundColor = "transparent";
        return;
    }
    return;  
}

function flipCardAndDoAction(){
    if(cardFace === "front"){
        card.style.transform = "rotateY(0deg)";
        cardFace = "back";
        document.getElementById('flipBack').style.backgroundColor = "var(--line-bg-light)";
        document.getElementById('flipBack').style.color = "white";
        document.getElementById('flipFront').style.backgroundColor = "transparent";
        document.getElementById('flipFront').style.color = "black";

        Array.from(engagements).forEach((element)=>{
            element.classList.add('blink');
            setTimeout(()=>{
                element.classList.remove('blink');
            },6000)
        })
    }
}

function initiateMail(recipient, subject, mailBody){
    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailBody)}`;
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
                title: 'Magellan Group',
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

flipControler.addEventListener('click',(e)=>{
    if(e.target === document.getElementById('flipBack')){
        flipCardBack(e);
        document.getElementById('flipFront').style.color = "black";
    }

    if(e.target === document.getElementById('flipFront')){
        flipCardFront(e);
        document.getElementById('flipBack').style.color = "black";
    }
});

qrBtn.addEventListener('click',()=>{
    openPopUp()
});

closeBtn.addEventListener('click',()=>{
    closePopUp();
});

backCardBtns.addEventListener('click',(e)=>{
    console.log(e.target);
    if(e.target.className === "transparent-btn website"){
        window.open("https://www.magellanes.org/", "_blank");
    }else if(e.target.className === "transparent-btn email"){
        initiateMail("info@magellanes.org", 
            "Request for Business Services[Edit subject]",
            "I would like to request for your services.[Edit However you like]");
    }
});

frontCardBtns[0].addEventListener('click',()=>{
    bottomModal.classList.add('bottom-modal-popup');
    modalBody.innerHTML = `<ul>
            <li>
                Building international network &
                 communities of empowered 
                 Entrepreneurs
            </li>

            <li>
                Developping Ecosystems & 
                infrastructure for Ventures to 
                acccelerate
            </li>
        </ul>`;
        headerMission.classList.add('selected');
        headerProducts.className = "";
});

frontCardBtns[1].addEventListener('click',()=>{
    bottomModal.classList.add('bottom-modal-popup');
    modalBody.innerHTML = `<ul>
            <li>
                Talent Circles & Development
            </li>
            <li>
                Entreprneurship & Business Programs
            </li>
            <li>
                Business Support Platforms
            </li>
            <li>
                Investor Relations
            </li>
            <li>
                Business & Financial Strategies
            </li>
        </ul>`;
        headerProducts.classList.add('selected');
        headerMission.className = "";
});

modalHeader.addEventListener('click',e=>{
    if(e.target === bottomModalClose){
        bottomModal.classList.remove('bottom-modal-popup');
        return;
    }

    if(e.target === headerMission){
        modalBody.innerHTML = `<ul>
            <li>
                Building international network &
                 communities of empowered 
                 Entrepreneurs
            </li>

            <li>
                Developping Ecosystems & 
                infrastructure for Ventures to 
                acccelerate
            </li>
        </ul>`;
        e.target.classList.add('selected');
        headerProducts.classList.remove('selected');
        return;
    }

    if(e.target === headerProducts){
        modalBody.innerHTML = `<ul>
            <li>
                Talent Circles & Development
            </li>
            <li>
                Entreprneurship & Business Programs
            </li>
            <li>
                Business Support Platforms
            </li>
            <li>
                Investor Relations
            </li>
            <li>
                Business & Financial Strategies
            </li>
        </ul>`;
        e.target.classList.add('selected');
        headerMission.classList.remove('selected');
        return;
    }
});

frontCardBtns[2].addEventListener('click',()=>{
    flipCardAndDoAction();
});

engagements[0].addEventListener('click',()=>{
    initiateMail("patners@magellanes.org", 
                "Patner Inquiry",
                "I would like to inquire about your patnership options.[Edit However you like]");
});

engagements[1].addEventListener('click',()=>{
    initiateMail("info@magellanes.org", 
                "Request for Business Services[Edit subject]",
                "I would like to request for your services.[Edit However you like]");
});


engagements[2].addEventListener('click',()=>{
    initiateMail("mfh.magellan@gmail.com", 
                "Investor Network Inquiry[Edit subject]",
                "I would like to inquire about your investment network.[Edit However you like]");
});


shareBtn.addEventListener('click',()=>{
    share();
});