'use strict';

//o objetivo é pegar o arquivo que foi selecionado
const preview = (idFile,idImg) => {
    const file = document.getElementById(idFile).files[0]; // isso é a tag do inputType file, .files serve para varios arquivos, sempre retorna um array
    const imagePreview = document.getElementById(idImg); //pegando a imagem pelo id
    const fileReader = new FileReader(); // instanciando um objeto que é um leitor fileReader()- leitor

    fileReader.onloadend = () => imagePreview.src = fileReader.result;//substitui qualquer outro evento q tiver

    if(file){
        fileReader.readAsDataURL(file); //lendo a imagem
    }else{
        imagePreview.src='./img/foto.png';
    }



};// colocando a posição 0

export{
    preview
};