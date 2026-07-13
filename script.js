// Implementação da funcionalidade de busca de endereço pelo CEP usando a API ViaCEP

const cepInput = document.getElementById('CEP');

cepInput.addEventListener('blur', () => {
    const cep = cepInput.value.replace(/\D/g, '');
    if (cep.length === 8) {
        buscarCep(cep);
    } else {
        alert("CEP inválido. Digite novamente!");
    }
});

async function buscarCep(cep) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    
    try {
        // Faz a requisição para a API
        const resposta = await fetch(url);
        // Converte a resposta recebida para o formato JSON
        const dados = await resposta.json();
        
        // Verifica se o ViaCEP retornou um erro (CEP não encontrado)
        if (dados.erro) {
            alert("CEP não encontrado.");
            return;
        }
        
        preencherCampos(dados);
        
    } catch (erro) {
        console.error("Erro ao buscar o CEP:", erro);
    }
}

function preencherCampos(dados) {
    document.getElementById('rua').value = dados.logradouro;
    document.getElementById('bairro').value = dados.bairro;
    document.getElementById('cidade').value = dados.localidade;
    document.getElementById('estado').value = dados.estado;
}


// Implementação da funcionalidade de redirecionamento após o envio do formulário

const formulario = document.querySelector('#formulario'); 

formulario.addEventListener('submit', (event) => {
    event.preventDefault(); 
    window.location.href = "confirmacao-inscricao.html"; 
});