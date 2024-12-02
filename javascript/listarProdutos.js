const api_url = "http://localhost/api_teste/public/produto";

const lista = document.getElementById("listagem");
const edicao_delete = document.getElementById('popup_edicao');
const btn_deletar = document.getElementById('deletar');
const btn_editar = document.getElementById('editar');
const form_edit = document.getElementById('form_edit');

async function loadItems() {
        const response = await fetch(api_url);
        const items = await response.json();

        if (items.length > 0) {

            lista.innerHTML = '';
            items.forEach(item => {

                const registro = document.createElement('div');
                registro.classList.add('registro');

                registro.innerHTML = `
                    <p class="codigo">${item.id}</p>
                    <p class="nome">${item.nome}</p>
                    <p class="categoria">${item.categoria}</p>
                    <p class="descricao">${item.descricao}</p>
                    <p class="quantidade">${item.quantidade}</p>
                    <button id="btn_mais">
                        <svg width="800px" height="800px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none">
                            <path fill="currentColor" fill-rule="evenodd" d="M9 17a1 1 0 102 0v-6h6a1 1 0 100-2h-6V3a1 1 0 10-2 0v6H3a1 1 0 000 2h6v6z" />
                        </svg>
                    </button>
                `;

                lista.appendChild(registro);

                const btnMais = registro.querySelector("#btn_mais");
                btnMais.addEventListener("click", () => {
                    openEditPopup(item);
                });
            });
        } 
        else {
            lista.innerHTML = '<p>Sem produtos cadastrados.</p>';
        }
}

function openEditPopup(item) {
    edicao_delete.style.display = "block";

    form_edit.novo_id.value = item.id;
    form_edit.novo_nome.value = item.nome;
    form_edit.novo_descricao.value = item.descricao;
    form_edit.novo_categoria.value = item.categoria;
    form_edit.novo_quantidade.value = item.quantidade;
    form_edit.novo_fabricacao.value = item.dt_fabricacao;
    form_edit.novo_validade.value = item.dt_validade;
    form_edit.novo_compra.value = item.valor_compra;
    form_edit.novo_venda.value = item.valor_venda;
}

btn_editar.addEventListener('click', async (event) => {
    event.preventDefault();

    const novoProduto = {
        id: form_edit.novo_id.value,
        nome: form_edit.novo_nome.value,
        descricao: form_edit.novo_descricao.value,
        categoria: form_edit.novo_categoria.value,
        quantidade: form_edit.novo_quantidade.value,
        dt_fabricacao: form_edit.novo_fabricacao.value,
        dt_validade: form_edit.novo_validade.value,
        valor_compra: parseInt(form_edit.novo_compra.value),
        valor_venda: parseInt(form_edit.novo_venda.value)
    };

    await fetch (api_url, {
        method : 'PUT',
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

    })
    .then (message =>{

        console.log('Mensagem de resposta: ', message.sucess);

    })
    .catch (error => {

        console.log(error);
        console.error('Erro ao fazer a requisição: ', error.message);

    });


    form_edit.reset();
    edicao_delete.style.display = "none";
    loadItems();
});

btn_deletar.addEventListener('click', async (event) => {
    event.preventDefault();

    const id = form_edit.novo_id.value;

    await fetch (`${api_url}/${id}`, {
        method: 'DELETE'
    })
    .then(response => {

        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }
        return response.json();

    })
    .then (message =>{

        console.log('Mensagem de resposta: ', message.sucess);

    })
    .catch (error => {

        console.log(error);
        console.error('Erro ao fazer a requisição: ', error.message);

    });


    edicao_delete.style.display = "none";
    loadItems();
})

window.addEventListener('click', (event) => {
    if (event.target === edicao_delete) {
        edicao_delete.style.display = 'none';
    }
});

loadItems();
