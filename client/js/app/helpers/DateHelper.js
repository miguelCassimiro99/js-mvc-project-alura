class DateHelper {

    constructor() {
        throw new Error('This class can not be instantiated');
    }

    static dataParaTexto(data) {

        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`

    }
    static textoParaData(texto) {

        if (!/^\d{4}-\d{2}-\d{2}$/.test(texto))
            throw new Error('The format is aaaa-mm-dd')

        return new Date(...texto.split('-').map((item, indice) => item - indice % 2));
    }
}