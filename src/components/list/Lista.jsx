import { useContext } from "react";
import Meta from "./Meta";
import { Contexto } from "../../services/Memory";
import { Outlet } from "react-router-dom";

function Lista() {
    const [estado] = useContext(Contexto);
    if(estado.orden.length === 0){
        return(
            <div className="flex flex-col items-center justify-center h-full">
                <div className="mx-auto text-center text-gray-500">
                    <h3>Esto esta un poco vacio</h3>
                    <p>¡Agrega una meta!</p>
                </div>
            </div>
        );
    }
    return (
        <>
            {estado.orden.map(id => <Meta key={id} {...estado.objetos[id]}/>)}
            <Outlet/>
        </>
     );
}

export default Lista;