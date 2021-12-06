'use strict';

import{openModal, closeModal} from './modal.js'; // importando o arquivo do modal.js
import{getProdutos,postProduto, deletarProduto} from './produtos.js'; //importando o arquivo do produtos.js
import{preview} from './preview.js';

/*Exemplo*/

{/* <tr>
                        <td>
                            <img src="./img/mouse.jpg" class="produto-image" />
                        </td>
                        <td>Mouse</td>
                        <td>120,50</td>
                        <td>Informática</td>
                        <td>
                            <button type="button" class="button green">
                                editar
                            </button>
                            <button type="button" class="button red">
                                excluir
                            </button>
                        </td>
     </tr> */}


//6 passo, vai receber o produto do map
const criarLinha = ({foto,nome,preco,categoria, id}) =>{ // recebvbendo o produto dentro do ({foto,nome})
    const linha= document.createElement('tr');
    linha.innerHTML = `
    <td>
         <img src="${foto}" class="produto-image" />
    </td>
    <td>${nome}</td>
    <td>${preco}</td>
    <td>${categoria}</td>
    <td>
         <button type="button" class="button green" data-idproduto=${id}>
             editar
        </button>
        <button type="button" class="button red" data-idproduto=${id}>
              excluir
        </button>
    </td>
    
    `

    return linha; //7 passo, ele vai retornar a linha e vai ir fazendo o laço
}

//inputFilme para abrir uma janela de fotos
//para ocutar ten qye colocar display none


//2 passo criar a funcao
const carregarProdutos = async () =>{
    const container = document.querySelector('.records tbody'); //8 passo criando o container para colocar a linha dentro dele
    const produtos = await getProdutos(); //criar uma variavel para armazenar os dados que vou receber do servidor, getProdutos(); ->requesição do meu servidor
    const linhas= produtos.map(criarLinha); // 5 passo criar as linhas, map array de produtos vai criar linha por linha //map - vai pegar o produto e vai mandar para criarLinha
    // console.log(produtos); // teste ele vai retornar promessa mais uma vez ai tem que usar o await
    // console.log(linhas);

    // container.replaceChildren(linhas[0], linhas[1], linhas[2]); //9 passo metodo, ele esta esperando por tag
    container.replaceChildren(...linhas); // esses ... ele retorna todos os dados, a vantagem de usar o replace ele subistitui

}

//11 passo, criando a funcao da imagem
// criando tambem uma função de preview
const imagemPreview =()=> preview('inputFile', 'imagePreview');

const salvarProduto = () => {
    const produto = {
        nome: document.getElementById('product').value, //.value para pegar o valor de dentro da caixa de texto
        preco:document.getElementById('price').value,
        categoria:document.getElementById('category').value,
        foto:document.getElementById('imagePreview').src
    };
    postProduto(produto);
    closeModal();
    carregarProdutos();
};

const  handleClickTbody = ({target}) => {
    // console.log(evento); para ver o que tem no target
    // console.log(target);
    if(target.type == 'button'){
        // console.log('teste123'); //fazzendo o teste para ver se só ta clicando no botão
        const acaoBotao = target.textContent.trim();
        if(acaoBotao == 'excluir'){
            deletarProduto(target.dataset.idproduto);
            carregarProdutos();
        }
    }
}

// 1 passo, carregar os produtos
carregarProdutos();


//eventos
document.getElementById('cadastrarCliente').addEventListener('click', openModal);

document.getElementById('modalClose').addEventListener('click', closeModal);

document.getElementById('cancel').addEventListener('click', closeModal);

document.getElementById('inputFile').addEventListener('change',imagemPreview); //10 passo adicionando o evento da imagem

document.getElementById('save').addEventListener('click', salvarProduto); //11 passo para salvar o produto


document.querySelector('.records tbody').addEventListener('click', handleClickTbody)