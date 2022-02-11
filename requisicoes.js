let meuUsuario=prompt('Qual será seu nome de usuário?');
postarNomeUsuario();

function postarNomeUsuario(){
    objetoUsuario={name:meuUsuario};
    const promise= axios.post('https://mock-api.driven.com.br/api/v4/uol/participants',objetoUsuario);
    promise.then(postagemUsuarioBemSucedida);
    promise.catch(postagemUsuarioMalSucedida);
}

function postagemUsuarioMalSucedida(erro){
    const numeroErro=erro.response.status
    if(numeroErro==400){
    meuUsuario=prompt('Esse nome já está em uso. Escolha outro:');
    postarNomeUsuario();
}
}
function postagemUsuarioBemSucedida(){
    carregarMensagens()
}

function manterConexao(){
    objetoUsuario={name:meuUsuario};
    const promise= axios.post('https://mock-api.driven.com.br/api/v4/uol/status',objetoUsuario);
}

const intervaloConexao= setInterval(manterConexao,5000)
const intervaloMensagens= setInterval(carregarMensagens,3000)


function carregarMensagens(){
    const promise= axios.get('https://mock-api.driven.com.br/api/v4/uol/messages');
    promise.then(filtrarMensagensRepetidas)
    promise.catch(carregamentoMalSucedido)
}

function carregamentoMalSucedido(){
    console.log('RUUUUUIMMMM')  // O que fazer quando der errado?
}


let horario=0;


function filtrarMensagensRepetidas(dados){
    let resposta=dados.data;
    console.log(resposta)
    for(let k=0; k<resposta.length; k++){
        const mensagem= resposta[k];
        const atributoTempo= mensagem.time;
        const array=atributoTempo.split(":")
        const stringHora= array[0]+array[1]+array[2]
        const horaMensagem=parseInt(stringHora)
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
        printarMensagemReservada(remetente,destinatario,conteudo,hora)
    }else{
        printarMensagemNormal(remetente,destinatario,conteudo,hora)
    }
    const ultimaMensagem=document.querySelector('.ultima');
    ultimaMensagem.scrollIntoView();
}

function printarMensagemEntrarSair(remetente,conteudo,hora){
    const listaMensagens=document.querySelector('.listaMensagens');
    listaMensagens.innerHTML+=`
            <li class="mensagem ultima cinza">
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
            <li class="mensagem ultima vermelho">
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
            <li class="mensagem ultima branco">
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
        from: meuUsuario,
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