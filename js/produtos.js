'use strict';

const url = 'http://10.107.142.2:8080/produtos';

//1 passo
const getProdutos = async () => {
        const response = await fetch(url); //criando uma variavel para ter a resposta do servido, fez uma requesicao com fetch, 2 passo
        // console.log(response.json()); //aqui vai retorna a promessa, se retornar a promessa tem que falar pra esperar await e colocar o async 3 passo
        return response.json();

    };



    const postProduto = (produto) => {
        const options = {
            method: 'POST',
            body: JSON.stringify(produto), //JSON.stringify(produto) -TRANSFORMA UM OBJETO EM STRING
            headers:{
                'content-type':'application/json'
            }
        };
        fetch(url,options)
    };


const deletarProduto = (id) =>{
    const options = {
        method: 'DELETE',
        headers:{
            'content-type':'application/json'
        }
    };
    fetch(`${url}/${id}`,options);
}

const putProduto = (produto) =>{
    const id = produto.id;
    const options = {
        method: 'PUT',
        body: JSON.stringify(produto), //JSON.stringify(produto) -TRANSFORMA UM OBJETO EM STRING
        headers:{
            'content-type':'application/json'
        }
    };

    fetch(`${url}/${id}`, options);
}


export{
    getProdutos, postProduto, deletarProduto
};