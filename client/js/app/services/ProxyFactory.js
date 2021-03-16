class ProxyFactory {

    static create(objeto, props, acao) {

        return new Proxy(objeto, {
            get(target, prop, receiver) {
                // props => array das propriedades que quero verificar. Ex: adiciona, esvazia
                // acao => ação que será executada 
                if (props.includes(prop) && ProxyFactory._isFunction(target[prop])) {
                    return function() {
                        console.log(`Interceptando ${prop}`);
                        let retorno = Reflect.apply(target[prop], target, arguments)
                        acao(target);
                        return retorno;

                    }
                }

                return Reflect.get(target, prop, receiver)
            },

            set(target, prop, value, receiver) {
                if (props.includes(prop)) {
                    target[prop] = value;
                    acao(target);
                }
                return Reflect.set(target, prop, value, receiver);

            }
        })
    }

    static _isFunction(func) {
        return typeof(func) == typeof(Function);
    }
}