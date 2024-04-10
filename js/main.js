document.addEventListener('DOMContentLoaded', function() {
    function updateQuantity(element, increment) {
        let countInput = element.parentElement.querySelector('.count');
        let count = parseInt(countInput.value);
        if (increment && count < 10) {
            countInput.value = count + 1;
        } else if (!increment && count > 0) {
            countInput.value = count - 1;
        }
    }

    const minusButtons = document.querySelectorAll('.minus');
    const plusButtons = document.querySelectorAll('.plus');

    minusButtons.forEach(function(minusButton) {
        minusButton.addEventListener('click', function() {
            updateQuantity(this, false);
        });
    });

    plusButtons.forEach(function(plusButton) {
        plusButton.addEventListener('click', function() {
            updateQuantity(this, true);
        });
    });

    const selecionarButtons = document.querySelectorAll('.btn__selecionar');

    selecionarButtons.forEach(function(selecionarButton) {
        selecionarButton.addEventListener('click', function() {
            this.classList.toggle('selecionado');
            if (this.classList.contains('selecionado')) {
                this.textContent = 'Selecionado';
                let countInput = this.parentElement.parentElement.querySelector('.count');
                countInput.disabled = true;
                let imagemLanche = this.parentElement.parentElement.parentElement.querySelector('.card-area__foto');
                imagemLanche.style.opacity = '0.5';
            } else {
                this.textContent = 'Selecionar';
                let countInput = this.parentElement.parentElement.querySelector('.count');
                countInput.disabled = false;
                let imagemLanche = this.parentElement.parentElement.parentElement.querySelector('.card-area__foto');
                imagemLanche.style.opacity = '1';
            }
        });
    });

    const adicionarCarrinhoButton = document.querySelector('.btn__adicionar-carrinho');
    adicionarCarrinhoButton.addEventListener('click', function() {
        const lanchesSelecionados = document.querySelectorAll('.btn__selecionar.selecionado');
        lanchesSelecionados.forEach(function(lancheSelecionado) {
            let nomeLanche = lancheSelecionado.parentElement.parentElement.querySelector('.card-area__title').textContent;
            let quantidade = parseInt(lancheSelecionado.parentElement.parentElement.querySelector('.count').value);
            if (quantidade > 0) {
                let precoUnitario = parseFloat(lancheSelecionado.parentElement.parentElement.querySelector('.card-area__price').textContent.replace('R$', '').trim());
                let valorTotal = parseFloat(quantidade) * precoUnitario;
                adicionarAoCarrinho(nomeLanche, quantidade, valorTotal);
            }
        });
    });

    function adicionarAoCarrinho(nome, quantidade, total) {
        const carrinhoLista = document.querySelector('.carrinho__lista');
        const novoItemCarrinho = document.createElement('li');
        novoItemCarrinho.innerHTML = `
            <span>${nome} x ${quantidade}</span>
            <span>R$ ${total.toFixed(2)}</span>
        `;
        carrinhoLista.appendChild(novoItemCarrinho);
        atualizarTotalCarrinho(total);
    }

  
    function atualizarTotalCarrinho(valor) {
        const totalAmountElement = document.getElementById('total-amount');
        let totalAmount = parseFloat(totalAmountElement.textContent);
        totalAmount += valor;
        totalAmountElement.textContent = totalAmount.toFixed(2);
    }

    const carrinhoImagem = document.querySelector('.card-area__foto-carrinho');
    carrinhoImagem.addEventListener('click', function() {
        const carrinho = document.querySelector('.carrinho');
        carrinho.classList.toggle('carrinho--visivel');
    });
});
