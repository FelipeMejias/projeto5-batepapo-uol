let meuUsuario=prompt('Qual será seu nome de usuário?');
postarNomeUsuario();

function postarNomeUsuario(){
    objetoUsuario={name:meuUsuario};
    const promise=axios.post('https://mock-api.driven.com.br/api/v4/uol/participants',objetoUsuario);
    promise.then(seDerCerto);
    promise.catch(seDerErro);
}

function seDerErro(erro){
    meuUsuario=prompt('Esse nome já está em uso. Escolha outro:');
    postarNomeUsuario();
}

function seDerCerto(){
    console.log('hjbdehc');
}