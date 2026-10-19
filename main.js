document.querySelectorAll('.curiosidades').forEach(function (secao) {
    var itens = secao.querySelectorAll('.lista li');
    var contador = secao.querySelector('.contador');
    var anterior = secao.querySelector('.anterior');
    var proxima = secao.querySelector('.proxima');
    var texto = document.createElement('p');
    var atual = 0;
    var ocupado = false;

    texto.className = 'texto';
    secao.insertBefore(texto, secao.querySelector('.botoes'));
    secao.classList.add('ativo');

    function mostrar() {
        texto.textContent = itens[atual].textContent;
        contador.textContent = 'Curiosidade ' + (atual + 1) + ' de ' + itens.length;
        anterior.disabled = atual === 0;
        proxima.disabled = atual === itens.length - 1;
    }

    function trocar(novo, direcao) {
        if (ocupado || novo < 0 || novo >= itens.length) return;
        ocupado = true;
        texto.style.transform = 'translateX(' + (-30 * direcao) + 'px)';
        texto.style.opacity = '0';
        setTimeout(function () {
            atual = novo;
            mostrar();
            texto.style.transition = 'none';
            texto.style.transform = 'translateX(' + (30 * direcao) + 'px)';
            void texto.offsetWidth;
            texto.style.transition = '';
            texto.style.transform = 'translateX(0)';
            texto.style.opacity = '1';
            setTimeout(function () { ocupado = false; }, 200);
        }, 200);
    }

    anterior.addEventListener('click', function () { trocar(atual - 1, -1); });
    proxima.addEventListener('click', function () { trocar(atual + 1, 1); });
    mostrar();
});
