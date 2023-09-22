const form = document.querySelector("#register"),
typeFields = form.querySelectorAll(".form-check-input"),
groupName = form.querySelector('fieldset#name'),
templateName = document.querySelector("#template-name");
console.log(typeFields);
typeFields.forEach(item=>{
    item.addEventListener('change', ()=>{
        groupName.innerHTML = "";
        if(item.value == 'candidat'){
            groupName.appendChild(templateBuild(templateName, "Prenom", "firstName", 2));
            groupName.appendChild(templateBuild(templateName, "nom", "lastName"), 2);

        }
        else if(item.value == 'employeur'){
            groupName.appendChild(templateBuild(templateName, "nom", "name", 1));

        }
    })
})

const templateBuild = (template, label, name, nbre) =>{
    tmp = template.content.cloneNode(true)
    tmp.querySelector('label').textContent = label;
    tmp.querySelector('input').name = name;
    tmp.querySelector('input').id = name;
    tmp.querySelector('input').placeholder = label;
    if (nbre == 1){

    }
    return tmp;
}