const form = document.querySelector("#register"),
groupName = form.querySelector('fieldset#name'),
part1 = document.querySelector('#part-1'),
part2 = document.querySelector("#part-2"),
templateName = document.querySelector("#template-name"),
type = document.querySelector('#type'),
btnType = document.querySelector('#btn-type');
    btnType.addEventListener('click', (e)=>{
        e.preventDefault();
        groupName.innerHTML = "";
        if(type.value == 'candidat'){
            part1.classList.add('d-none');
            part2.classList.remove("d-none");
            groupName.appendChild(templateBuild(templateName, "Prenom", "firstName", 2));
            groupName.appendChild(templateBuild(templateName, "nom", "lastName"), 2);

        }
        else if(type.value == 'employeur'){
            part1.classList.add('d-none');
            part2.classList.remove("d-none");
            groupName.appendChild(templateBuild(templateName, "nom", "name", 1));
        }
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
form.addEventListener('submit', (e)=>{
    
});