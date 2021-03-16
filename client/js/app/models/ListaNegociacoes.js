class ListaNegociacoes {

    constructor() {

        this._negociacoes = [];

    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao);

    }

    get negociacoes() {
        // programação defensiva, retorna uma cópia do array
        // de negociações para que o original não seja alterado 
        return [].concat(this._negociacoes);
    }

    esvazia() {

        this._negociacoes = [];

    }

    get volumeTotal() {
        return this._negociacoes.reduce((total, n) => total + n.volume, 0.0);
    }

}