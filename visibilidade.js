function mostrarBarra(){
    //const barraLateral=document.querySelector('.barraLateral');
    //barraLateral.classList.toggle('esconde')
    const escurecedor=document.querySelector('.escurecedor');
    escurecedor.classList.toggle('esconde')
}

let checkContatoAntigo=null;
let checkVisibilidadeAntigo=null;
let contatoEscolhido=null;
let visibilidadeEscolhida=null;

function selecionarContato(contato){
    if(checkContatoAntigo!=null){
        checkContatoAntigo.classList.toggle('esconde');
    }
    const check=document.querySelector('.'+contato+' .check');
    check.classList.toggle('esconde');
    checkContatoAntigo= check;
    contatoEscolhido=contato
    escolherContatoVisibilidade(contatoEscolhido,visibilidadeEscolhida);
}
function selecionarVisibilidade(visibilidade){
    if(checkVisibilidadeAntigo!=null){
        checkVisibilidadeAntigo.classList.toggle('esconde');
    }
    const check=document.querySelector('.'+visibilidade+' .check');
    check.classList.toggle('esconde');
    checkVisibilidadeAntigo= check;
    visibilidadeEscolhida=visibilidade
    escolherContatoVisibilidade(contatoEscolhido,visibilidadeEscolhida);

}

function escolherContatoVisibilidade(contato,visibilidade){
    if(contato!=null && visibilidade!=null){
        mostrarBarra();
        contatoEscolhido=null;
        visibilidadeEscolhida=null;
        const mensagemVisibilidade=document.querySelector('.infoContatoVisibilidade');
        mensagemVisibilidade.innerHTML='Enviando para '+contato+' ('+visibilidade+')'
    }
}