function mascara(){
    var cpf = document.getElementById('cpf');
    if(cpf.value.length == 3 || cpf.value.length == 7){
        cpf.value += ".";
    } else if (cpf.value.length == 11){
        cpf.value += "-";
    }
}
function mascaraTel(){
    var tel = document.getElementById('tel');
    if(tel.value.length == 2){
        tel.value += " ";
    } else if (tel.value.length == 4){
        tel.value += " ";
    } else if(tel.value.length == 9){
        tel.value += "-";
    };
}



function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
        .then((res) => { return res.json() })
        .then(states => {

            for (state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`

            }
        })
}

populateUFs()


function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")


    console.log(event.target.value)

    const indexOfSelectedState = event.target.selectedIndex

    stateInput.value = event.target.options[indexOfSelectedState].text

    const ufValue = event.target.value

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios?orderBy=nome`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true


    fetch(url)
        .then((res) => { return res.json() })
        .then(cities => {

            for (city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }
            citySelect.disabled = false
        })

}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)



