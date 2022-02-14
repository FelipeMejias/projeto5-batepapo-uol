let horario=0;

function ataulizarHorarioDe12_59Para01_00(horaMensagem){
    if(horaMensagem<200000 && horario>120000){
        horario=0
    }
}


function filtrarMensagensRepetidas(dados){
    let resposta=dados.data;
    console.log(resposta)
    for(let k=0; k<resposta.length; k++){
        const mensagem= resposta[k];
        const atributoTempo= mensagem.time;
        const array=atributoTempo.split(":")
        const stringHora= array[0]+array[1]+array[2]
        const horaMensagem=parseInt(stringHora)
        ataulizarHorarioDe12_59Para01_00(horaMensagem);
        if(horaMensagem>horario){
            horario=horaMensagem;
            filtrarTipoMensagem(mensagem.from,mensagem.to,mensagem.text,mensagem.type,mensagem.time)
        }
    }
}

function filtrarTipoMensagem(remetente,destinatario,conteudo,tipo,hora){
    const penultimaMensagem=document.querySelector('.ultima');
    if(penultimaMensagem!=null){
        penultimaMensagem.classList.remove('ultima')
    }
    if(tipo=="status"){
        printarMensagemEntrarSair(remetente,conteudo,hora)
    }else if(tipo=="private_message"){
        if(remetente==nomeUsuario || destinatario==nomeUsuario){
            printarMensagemReservada(remetente,destinatario,conteudo,hora)
        }
    }else{
        printarMensagemNormal(remetente,destinatario,conteudo,hora)
    }
    const ultimaMensagem=document.querySelector('.ultima');
    if (ultimaMensagem!=null){
    ultimaMensagem.scrollIntoView();
    }
}



function printarMensagemEntrarSair(remetente,conteudo,hora){
    const listaMensagens=document.querySelector('.listaMensagens');
    listaMensagens.innerHTML+=`
            <li data-identifier="message" class="mensagem ultima cinza">
                <p>
                <small>(${hora}) </small>
                <strong>${remetente} </strong>
                <span>${conteudo}</span>
                </p>
            </li>`
}
function printarMensagemReservada(remetente,destinatario,conteudo,hora){
    const listaMensagens=document.querySelector('.listaMensagens');
    listaMensagens.innerHTML+=`
            <li data-identifier="message" class="mensagem ultima vermelho">
                <p>
                <small>(${hora}) </small>
                <strong>${remetente} </strong>
                <span> reservadamente para </span>
                <strong>${destinatario}:</strong>
                <span>${conteudo}</span>
                </p>
            </li>`
}
function printarMensagemNormal(remetente,destinatario,conteudo,hora){
    const listaMensagens=document.querySelector('.listaMensagens');
    listaMensagens.innerHTML+=`
            <li data-identifier="message" class="mensagem ultima branco">
                <p>
                <small>(${hora}) </small>
                <strong>${remetente} </strong>
                <span> para </span>
                <strong>${destinatario}:</strong>
                <span>${conteudo}</span>
                </p>
            </li>`
}


function postarMensagens(){
    const inputMensagem= document.querySelector('.inputMensagem')
    const objetoMensagem= {
        from: nomeUsuario,
        to: contatoEscolhido,
        text: inputMensagem.value,
        type: tipoVisibilidade
    };
    const promise= axios.post('https://mock-api.driven.com.br/api/v4/uol/messages',objetoMensagem);
    promise.then(postagemMensagemBemSucedida);
    promise.catch(postagemMensagemMalSucedida);
    inputMensagem.value=null;
}

function postagemMensagemBemSucedida(){
    carregarMensagens()
}
function postagemMensagemMalSucedida(){
    window.location.reload()
}