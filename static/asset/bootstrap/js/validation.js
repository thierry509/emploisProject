const form = document.querySelector('#enregistrer-form'),
    numBox = form.querySelector('.num'),
    numInput = numBox.querySelector('input'),
    nomBox = form.querySelector('.nom'),
    nomInput = nomBox.querySelector('input'),
    prenomBox = form.querySelector('.prenom'),
    prenomInput = prenomBox.querySelector('input'),
    nifBox = form.querySelector('.nif'),
    nifInput = nifBox.querySelector('input'),
    montantBox = form.querySelector('.montant'),
    montantInput = montantBox.querySelector('input');

numInput.addEventListener('keyup', ()=>{
    validation(/^\d{10}$/, numBox, 'Droit contenir 10 chiffre');
})
nomInput.addEventListener('keyup', ()=>{
    validation(/^[A-Z a-z-]+$/, nomBox, 'Votre nom doit contenir que des caracter alphabetique');
});    
prenomInput.addEventListener('keyup', ()=>{
    validation(/^[A-Z a-z-]+$/, prenomBox, 'Votre nom doit contenir que des caracter alphabetique');
});
nifInput.addEventListener('keyup', ()=>{
    validation(/^\d{10}$/, nifBox, 'Veuiller rentrex un NIF valide');
});
montantInput.addEventListener('keyup', ()=>{
    let validation = (parseFloat(montantInput.value) > 0)? 'is-valid' : 'is-invalid';
    let message = (parseFloat(montantInput.value) > 0)? 'valid-feedback' : 'invalid-feedback';
    let messageContent = (parseFloat(montantInput.value) > 0)? 'Correct': 'montant invalid';
    boxMessage(montantBox, message, messageContent);
    displayInput(montantInput, validation);
});
function validation(pattern, box, textError){
    const input = box.querySelector('input');
    let validation = pattern.test(input.value)? 'is-valid' : 'is-invalid';
    let message = pattern.test(input.value)? 'valid-feedback' : 'invalid-feedback';
    let messageContent = pattern.test(input.value)? 'Correct': textError;
    boxMessage(box, message, messageContent);
    displayInput(input, validation);
}
function manageClassToogle(element, class1, class2, class0){
    element.classList.remove(class1);
    element.classList.remove(class2);
    element.classList.add(class0);
}

function boxMessage(element, className, message){
    let messageBox = element.querySelector('.message');
    manageClassToogle(messageBox, 'valid-feedback', 'invalid-feedback', className);
    
    messageBox.innerText = message;
}
function displayInput(element, className){
    manageClassToogle(element, 'is-valid', 'is-invalid', className);
}

form.addEventListener('submit', (e)=>{
    
    if(!(numInput.classList.contains('is-valid') &&
        nomInput.classList.contains('is-valid') &&
        prenomInput.classList.contains('is-valid') &&
        nifInput.classList.contains('is-valid') &&
        montantInput.classList.contains('is-valid'))){
            e.preventDefault();
            let alert = document.querySelector('.no-submit')
            alert.classList.add('alert-danger')
            alert.innerText = 'veuiller remplir correctement le formulaire';
        }
        else{
        }
});