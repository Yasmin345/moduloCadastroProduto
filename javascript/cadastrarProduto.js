const url_api = "http://localhost/api_teste/public/produto";

const form_cadastro = document.getElementById("form_cadastro");

form_cadastro.addEventListener("submit", async (event) => {
    event.preventDefault();

    const novoProduto = {
        nome: form_cadastro.nome.value,
        descricao: form_cadastro.descricao.value,
        categoria: form_cadastro.categoria.value,
        quantidade: form_cadastro.quantidade.value,
        dt_fabricacao: form_cadastro.fabricacao.value,
        dt_validade: form_cadastro.validade.value,
        valor_compra: parseInt(form_cadastro.compra.value),
        valor_venda: parseInt(form_cadastro.venda.value)
    }

    await fetch (url_api, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(novoProduto)
    })
    .then(response => {

        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }
        return response.json();

    }).then (message =>{

        console.log('Mensagem de resposta: ', message.sucess);

    }).catch (error => {

        console.log(error);
        console.error('Erro ao fazer a requisição: ', error.message);

    });

    form_cadastro.reset();
    janelaPopup.style.display = "none";
    loadItems();
});

