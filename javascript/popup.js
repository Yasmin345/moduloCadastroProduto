const botaoCad = document.getElementById('bot');
const botaoCat = document.getElementById('bot2')


botaoCad.addEventListener('click', () => {
    janela_popup.style.display = 'block';
});

botaoCat.addEventListener('click', () => {
    janela.style.display = 'flex';
});


window.addEventListener('click', (event) => {
    if (event.target === janela_popup | event.target === janela) {
        janela_popup.style.display = 'none';
        janela.style.display = 'none';
    }
});