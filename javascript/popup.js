const botaoCad = document.getElementById('bot');
const botaoCat = document.getElementById('bot2');
const janelaPopup = document.getElementById('janela_popup');
const janelaCat = document.getElementById('janela');
const botaoCancelar = document.getElementById('cancelar'); 
const botaoCancelar2 = document.getElementById('cancelar2');


botaoCad.addEventListener('click', () => {
    janelaPopup.style.display = 'block';
});

botaoCat.addEventListener('click', () => {
    janelaCat.style.display = 'block';
});

window.addEventListener('click', (event) => {
    if (event.target === janelaPopup) {
        janelaPopup.style.display = 'none';
    }
    if (event.target === janelaCat) {
        janelaCat.style.display = 'none';
    }
});

botaoCancelar.addEventListener('click', () => {
    janelaPopup.style.display = 'none'; 
});

botaoCancelar2.addEventListener ('click',() =>{
    janelaCat.style.display ='none';
});
