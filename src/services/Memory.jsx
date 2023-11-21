import { createContext, useReducer } from "react";

const listaMock = [{
    "id":"1",
    "detalles":"Programar por 30 minutos",
    "periodo":"día",
    "eventos":1,
    "icono":"💻",
    "meta":365,
    "plazo":"2024-11-15",
    "completado":100
}];

const estadoInicial = {
    orden: [],
    objetos: {}
}

function reductor(estado, accion){
    switch(accion.tipo){
        case 'colocar':{
            const metas = accion.metas;
            const nuevoEstado ={
                orden: metas.map(meta => meta.id),
                objetos: metas.reduce((objeto, meta) => ({...objeto, [meta.id]: meta}),{})
            };
           return nuevoEstado;
        }

        case 'crear':{
            const id = Math.random();
            const nuevoEstado ={
                orden: [...estado.orden, id],
                objetos: {...estado.objetos, [id]: accion.meta}
            };
            return nuevoEstado;
        }

    }
}
const metas = reductor(estadoInicial, {tipo:'colocar', metas: listaMock});

export const Contexto = createContext(null);

function Memory({children}) {
    const [estado, enviar] = useReducer(reductor, metas);
    return ( 
        <Contexto.Provider value={[estado, enviar]}>
            {children}
        </Contexto.Provider>
     );
}

export default Memory;