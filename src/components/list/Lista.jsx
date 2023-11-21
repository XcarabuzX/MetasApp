import { useContext } from "react";
import Meta from "./Meta";
import { Contexto } from "../../services/Memory";

function Lista() {
    const [estado,enviar] = useContext(Contexto);
    return ( 
        estado.orden.map(id => <Meta key={id} {...estado.objetos[id]}/>)
     );
}

export default Lista;