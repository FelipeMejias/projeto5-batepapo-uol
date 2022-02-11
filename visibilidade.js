function mostrarBarra(){
    const barraLateral=document.querySelector('.barraLateral');
    barraLateral.classList.toggle('esconde')
    const escurecedor=document.querySelector('.escurecedor');
    escurecedor.classList.toggle('esconde')
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