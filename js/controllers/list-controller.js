function State() { 
    this.listSection = null
}

const state = new State();

export function init() {
    state.listSection = document.querySelector("#list-section");
}

export function addCard(address) {
    const card = createCard(address);
    state.listSection.appendChild(card)
}

function createCard(address){

    const div = document.createElement("div"); 
    div.classList.add("card-list-item");


    const line = document.createElement("p")
    line.classList.add("address-line")
    line.innerHTML = ` ${address.logradouro}, ${address.numero} `;
    
    const cep = document.createElement("p");
    cep.classList.add("address-cep")
    cep.innerHTML = address.cep

    const h3 = document.createElement("h3"); 
    h3.innerHTML = address.localidade; 

   
    div.appendChild(h3);
    div.appendChild(line);
    div.appendChild(cep)

    return div;
}
