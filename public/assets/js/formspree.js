let contactForm = document.getElementById('js-contact-form');
let flashMessagesContainer = document.getElementById('js-contact-flash-messages');
let submitButton = contactForm.querySelector('button[type="submit"]');
let defaultSubmitText = submitButton.textContent;


function setFlashMessage(success) {
    while (flashMessagesContainer.firstChild) {
        flashMessagesContainer.removeChild(flashMessagesContainer.firstChild);
    }

    let messageElem = document.createElement('div');
    let messageType = success ? 'success' : 'danger';
    messageElem.classList.add('c-alert');
    messageElem.classList.add(`c-alert-${messageType}`);

    if (success) {
        // messageElem.innerHTML = `Sent! Download <a class='o-linkUnderline' href='/download'>three proven ways to make effective change</a>.`;
        messageElem.innerHTML = `Message sent!`;
    } else {
        messageElem.innerHTML = 'Woops, something went wrong. Please try again.';
    }

    flashMessagesContainer.appendChild(messageElem);
}


function submitForm(event) {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                let response = JSON.parse(xhr.responseText);
                setFlashMessage(true);
            } else {
                setFlashMessage(false);
            }

            submitButton.removeAttribute('disabled');
            submitButton.textContent = defaultSubmitText;
        }
    };

    let formData = {};
    const acceptedTags = ['input', 'textarea'];

    [].map.call(contactForm.elements, (element) => {
        const tagName = element.tagName.toLowerCase();

        if (acceptedTags.includes(tagName)) {
            formData[element.name] = element.value;
        }
    });

    xhr.open('POST', contactForm.action, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(formData));
}


contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    submitButton.setAttribute('disabled', 'true');
    submitButton.textContent = 'Sending...';
    submitForm();
});
