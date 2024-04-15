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
            selecionarButton = minusButton.parentElement.parentElement.children[1].children[0].textContent;
            if(selecionarButton == "Selecionar"){
                updateQuantity(this, false);
            }
        });
    });

    plusButtons.forEach(function(plusButton) {
        plusButton.addEventListener('click', function() {
            
            selecionarButton = plusButton.parentElement.parentElement.children[1].children[0].textContent;
            if(selecionarButton == "Selecionar"){
                updateQuantity(this, true);
            }
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
        const lanchesSelecionados = document.querySelectorAll('.card-area > .card-area__card');
        console.log(lanchesSelecionados.length)
        lanchesSelecionados.forEach((lancheSelecionado) => {
            console.log(lancheSelecionado.className)
            let nomeLanche = lancheSelecionado.querySelector('.card-area__title').textContent;
            let quantidade = parseInt(lancheSelecionado.querySelector('.modal__unit-control :nth-child(2)').value);
            let selecionado = lancheSelecionado.querySelectorAll(':nth-child(4) :nth-child(2) :nth-child(1)')[0].textContent;
            if (quantidade > 0 && selecionado == 'Selecionado') {
                let precoUnitario = parseFloat(lancheSelecionado.parentElement.parentElement.querySelector('.card-area__price').textContent.replace('R$', '').trim());
                let valorTotal = parseFloat(quantidade) * precoUnitario;
                adicionarAoCarrinho(nomeLanche, quantidade, valorTotal);
            }
        });
    });

    function adicionarAoCarrinho(nome, quantidade, valorTotal) {
        const carrinhoLista = document.querySelector('.carrinho__lista');
        const novoItemCarrinho = document.createElement('li');

        nomeClasse = nome.replace(/\s/g, '')
        
        spanProduto = document.querySelector('#' + nomeClasse + ' #produto');
        spanValor = document.querySelector('#' + nomeClasse + ' #valor');
        spanQtProduto = document.querySelector('#' + nomeClasse + ' #qtProduto');

        if(spanProduto == null){
            novoItemCarrinho.innerHTML = `
            <div id="${nome.replace(/\s/g, '').trim()}">
            <span id="produto">${nome} x </span>
            <span id="qtProduto">${quantidade}</span>
            <span id="valor">R$ ${valorTotal.toFixed(2)}</span>
            </div>`;
            carrinhoLista.appendChild(novoItemCarrinho);
        }
        else {
            if(spanProduto.textContent.includes(nome)){
                valorAtual = parseFloat(spanValor.textContent.replace('R$', '').trim())
                quantidadeAtual = parseInt(spanQtProduto.textContent)
                novoValorTotal = valorTotal + valorAtual
                novaQuantidadeAtual = quantidade + quantidadeAtual
                spanValor.innerHTML = `<span id="valor">R$ ${novoValorTotal.toFixed(2)}</span>`
                spanQtProduto.innerHTML = `<span id="qtProduto">${novaQuantidadeAtual}</span>`;
                spanProduto.innerHTML = `<span id="produto">${nome} x </span>`;
            }
            else{
                
            novoItemCarrinho.innerHTML = `
            <div id="${nome.replace(/\s/g, '').trim()}">
            <span id="produto">${nome} x </span>
            <span id="qtProduto">${quantidade}</span>
            <span id="valor">R$ ${valorTotal.toFixed(2)}</span>
            </div>`;
            carrinhoLista.appendChild(novoItemCarrinho);
            }
        }
        atualizarTotalCarrinho(valorTotal);
        const carrinho = document.querySelector('.carrinho');
        carrinho.classList.toggle('carrinho--visivel');
    }

  
    function atualizarTotalCarrinho(valor) {
        const totalAmountElement = document.getElementById('total-amount');
        let totalAmount = parseFloat(totalAmountElement.textContent);
        totalAmount += valor;
        totalAmountElement.textContent = totalAmount.toFixed(2);

    }

    function zerarTotalCarrinho(){
        const totalAmountElement = document.getElementById('total-amount');
        let totalAmount = parseFloat(totalAmountElement.textContent);
        totalAmountElement.textContent = 0;
    }

    
    const limparCarrinhoButton = document.querySelector('.btn__limpar-carrinho');
    limparCarrinhoButton.addEventListener('click', function() {

        zerarTotalCarrinho();
        const carrinhoLista = document.querySelector('.carrinho__lista');
        carrinhoLista.innerHTML = '';
    });

    const carrinhoImagem = document.querySelector('.card-area__foto-carrinho');
    carrinhoImagem.chil
    carrinhoImagem.addEventListener('click', function() {
        const carrinho = document.querySelector('.carrinho');
        carrinho.classList.toggle('carrinho--visivel');
    });
});
