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
    promise.then(carregamentoBemSucedido)
}

let dadosCarregamento=null;

function carregamentoBemSucedido(dados){
    console.log(dados.data);
    dadosCarregamento=dados.data
}

function carregamentoMalSucedido(){
    console.log('RUUUUUIMMMM')  // O que fazer quando der errado?
}