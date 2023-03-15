import Address from '../models/address.js'
import * as listControler from './list-controller.js'
import * as addressService from '../../services/address-service.js'

function State () {
    this.address = new Address();
    //botoes
    this.btnSave = null; 
    this.btnClear = null; 
    //inputs
    this.inputCep = null; 
    this.inputStreet = null; 
    this.inputNumber = null; 
    this.inputCity = null;
    //error
    this.errorCep = null; 
    this.errorNumber = null;

}

const state = new State();


export function init () {
    state.inputCep =  document.forms.newAddress.cep
    state.inputStreet =  document.forms.newAddress.street
    state.inputNumber =  document.forms.newAddress.number
    state.inputCity =  document.forms.newAddress.city

    state.btnSave =  document.forms.newAddress.btnSave
    state.btnClear =  document.forms.newAddress.btnClear
    
    state.errorCep =  document.querySelector('[data-error="cep"]');
    state.errorNumber =  document.querySelector('[data-error="number"]');
    
    state.inputNumber.addEventListener('change', handleInputNumberChange);
    state.inputNumber.addEventListener('keyup', handleInputNumberKeyUp);    
    state.btnClear.addEventListener('click', handlebtnClearClick)
    state.btnSave.addEventListener('click', handlebtnSaveClick)
    state.inputCep.addEventListener('change', handleInputCepChange)


    }

    function handleInputNumberKeyUp (event){
    state.address.numero = event.target.value 
    }

    async function handleInputCepChange (event) { 
        const cep = event.target.value
       try{ 
        const address = await addressService.findByCep(cep)
        state.inputCity.value = address.localidade
        state.inputStreet.value = address.logradouro
        state.address = address  

        setFormError("cep",""); 
        state.inputNumber.focus
       } catch(e){
        state.inputCity.value = ""
        state.inputStreet.value = ""
        setFormError("cep", "informe um CEP válido")
       }
    }
    
function handlebtnSaveClick(event){
    event.preventDefault();
    
    const errors = addressService.getErrors(state.address);
    const keys = Object.keys(errors);
 
    if (keys.length > 0) {
        /*        for (let i = 0 ; i < keys.length; i++){ 
            console.log(setFormError(keys[i], errors[keys[i]])            )
            setFormError(keys[i], errors[keys[i]]);
        }*/

        keys.forEach(key => {setFormError(key,errors[key]);})
    }
    else {     
    console.log(errors)
    listControler.addCard(state.address)
    clearForm();
} 
}
function handlebtnClearClick(event) {
    event.preventDefault(); //nao enviar o formulario
    clearForm();
}

function clearForm(){
    state.inputCep.value = ""
    state.inputStreet.value = "" 
    state.inputNumber.value = "" 
    state.inputCity.value =  ""
  
    setFormError("cep","");
    setFormError("number","")

    state.address = new Address();
    state.inputCep.focus();
     
}

function handleInputNumberChange(event) {
    if (event.target.value == ""){
        setFormError("number", "campo requerido")
    }
    else{
        setFormError("number", "")
    }
}

function setFormError(key, value) {
    const element = document.querySelector(`[data-error="${key}"]`);
    element.innerHTML = value;

}

