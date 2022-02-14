//let meuUsuario=prompt('Qual será seu nome de usuário?');
//postarNomeUsuario();
let nomeUsuario=''
function pegarNomeInput(){
    nomeUsuario=document.querySelector('.inputLogin').value;
    postarNomeUsuario(nomeUsuario)
}

function postarNomeUsuario(nome){
    objetoUsuario={name:nome};
    const promise= axios.post('https://mock-api.driven.com.br/api/v4/uol/participants',objetoUsuario);
    promise.then(postagemUsuarioBemSucedida);
    promise.catch(postagemUsuarioMalSucedida);
}

function postagemUsuarioMalSucedida(erro){
    const numeroErro=erro.response.status
    if(numeroErro==400){
    alert('Esse nome já está em uso. Escolha outro'); 
    }
}
function postagemUsuarioBemSucedida(){
    carregarMensagens()
    const telaLogin=document.querySelector('.telaLogin');
    telaLogin.classList.toggle('sumir')
}

function manterConexao(){
    objetoUsuario={name:nomeUsuario};
    const promise= axios.post('https://mock-api.driven.com.br/api/v4/uol/status',objetoUsuario);
}




function carregarMensagens(){
    const promise= axios.get('https://mock-api.driven.com.br/api/v4/uol/messages');
    promise.then(filtrarMensagensRepetidas)
    promise.catch(carregamentoMalSucedido)
}

function carregamentoMalSucedido(){
    console.log('RUUUUUIMMMM')  // O que fazer quando der errado?
}


function carregarUsuarios(){
    const promise=axios.get('https://mock-api.driven.com.br/api/v4/uol/participants')
    promise.then(receberContatos)
}

const intervaloConexao= setInterval(manterConexao,5000)
const intervaloMensagens= setInterval(carregarMensagens,10000)
const intervaloContatos= setInterval(carregarUsuarios,10000)