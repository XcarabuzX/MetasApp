import Meta from "./Meta";

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
function Lista() {
    return ( 
        listaMock.map(meta => <Meta {...meta}/>)
     );
}

export default Lista;