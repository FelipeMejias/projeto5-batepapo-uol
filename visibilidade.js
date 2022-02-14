function mostrarBarra(){
    const barraLateral=document.querySelector('.barraLateral');
    barraLateral.classList.toggle('esconde')
    const escurecedor=document.querySelector('.escurecedor');
    escurecedor.classList.toggle('esconde')
    carregarUsuarios()
}

let checkContatoAntigo=null;
let checkVisibilidadeAntigo=null;
let contatoEscolhido='Todos';
let visibilidadeEscolhida=null;
let tipoVisibilidade='message';
const mensagemVisibilidade=document.querySelector('.infoContatoVisibilidade');
mensagemVisibilidade.innerHTML='Enviando para Todos (publico)'


function selecionarContato(contato,constatoMaiusculo){
    if(checkContatoAntigo!=null){
        checkContatoAntigo.classList.toggle('esconde');
    }
    const check=document.querySelector('.'+contato+' .check');
    check.classList.toggle('esconde');
    checkContatoAntigo= check;

    contatoEscolhido=constatoMaiusculo
    escolherContatoVisibilidade(contatoEscolhido,visibilidadeEscolhida);
}

function selecionarVisibilidade(visibilidade,tipo){
    if(checkVisibilidadeAntigo!=null){
        checkVisibilidadeAntigo.classList.toggle('esconde');
    }
    const check=document.querySelector('.'+visibilidade+' .check');
    check.classList.toggle('esconde');
    checkVisibilidadeAntigo= check;

    visibilidadeEscolhida=visibilidade
    escolherContatoVisibilidade(contatoEscolhido,visibilidadeEscolhida);
    tipoVisibilidade=tipo
}

function escolherContatoVisibilidade(contato,visibilidade){
    if(contato!=null && visibilidade!=null){
        mostrarBarra();
        mensagemVisibilidade.innerHTML='Enviando para '+contato+' ('+visibilidade+')'
    }
}

function receberContatos(resposta){
    const listaRetornada=resposta.data
    listaRetornada.forEach(adicionarParticipanteNaLista)
    printarListaContatos()
}

let listaContatos=[]

function adicionarParticipanteNaLista(objetoContato){
    const nomeContato=objetoContato.name
    listaContatos.push(nomeContato)
}

function printarListaContatos(){
    const listaParticipantes=document.querySelector('.listaParticipantes')
    listaParticipantes.innerHTML=`
        <li onclick="selecionarContato('todos','Todos')" class="div-contatos todos">
        <ion-icon name="people-outline"></ion-icon>
        <span>Todos</span>
        <ion-icon class="check esconde" name="checkmark-outline"></ion-icon></li>`
    for(let k=0;k<listaContatos.length;k++){
        listaParticipantes.innerHTML+=`
            <li onclick="selecionarContato('contato_${listaContatos[k]}','${listaContatos[k]}')" class="div-contatos contato_${listaContatos[k]}">
                <ion-icon name="person-circle-outline"></ion-icon>
                <span>${listaContatos[k]}</span>
                <ion-icon class="check esconde" name="checkmark-outline"></ion-icon>
            </li>
        `
    }
}

