const listEmplois = document.querySelector("#list-emplois");
const templateEmplois = document.querySelector("#item-emplois");
for(let i = 0; i <= 10; i++){
    listEmplois.append(templateEmplois.content.cloneNode(true));
}