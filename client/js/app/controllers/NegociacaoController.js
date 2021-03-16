class NegociacaoController {

    constructor() {

        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._negociacoesView = new NegociacoesView($('#negociacoesView'));

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes,
            this._negociacoesView, 'adiciona', 'esvazia'
        );

        this._mensagemView = new MensagemView($('#mensagemView'));

        this._mensagem = new Bind(
            new Mensagem(),
            this._mensagemView, 'texto'
        );

    }
    adiciona(event) {

        event.preventDefault();

        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._mensagem.texto = 'Negociação adicionada com sucesso';
        this._limpaFormulario();

    }


    _importaNegociacoes() {

        let service = new NegociacaoService();

        service
            .obterNegociacoes()
            .then(negociacoes => {
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = 'Negociações do período importadas com sucesso';
            })
            .catch(error => this._mensagem.texto = error);

        // apart code
        // Promise.all([
        //         service.obterNegociacoesDaSemana(),
        //         service.obterNegociacoesDaSemanaAnterior(),
        //         service.obterNegociacoesDaSemanaRetrasada()
        //     ]).then(negociacoes => {
        //         negociacoes
        //             .reduce((arrayNova, array) => arrayNova.concat(array), [])
        //             .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
        //         this._mensagem.texto = 'Negociacoes importadas com sucesso'

        //     })
        //     .catch(error => this._mensagem.texto = error);
        // na funcao reduce o arrayNova recerá os itens de array e no final terá apenas uma dimensão
    }

    apaga() {

        this._listaNegociacoes.esvazia();
        this._mensagem.texto = 'Negociações apagadas com sucesso'

    }


    _criaNegociacao() {

        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    _limpaFormulario() {

        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 1.0;

        this._inputData.focus();

    }

}