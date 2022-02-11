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
    console.log('BOOOOOAAA');  // O que fazer quando der certo?
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
            printarMensagens(mensagem.from,mensagem.to,mensagem.text,mensagem.type,mensagem.time)
        }
        
    }
}

function printarMensagens(remetente,destinatario,conteudo,tipo,hora){
    const listaMensagens=document.querySelector('.listaMensagens');
        const penultimaMensagem=document.querySelector('.ultima');
        if(penultimaMensagem!=null){penultimaMensagem.classList.remove('ultima')}
        listaMensagens.innerHTML+=`<li class="ultima">${remetente} PARA ${destinatario} MANDOU ${conteudo} DO TIPO ${tipo} AS ${hora}</li>`
        const ultimaMensagem=document.querySelector('.ultima');
        ultimaMensagem.scrollIntoView();
}


function carregamentoMalSucedido(){
    console.log('RUUUUUIMMMM')  // O que fazer quando der errado?
}