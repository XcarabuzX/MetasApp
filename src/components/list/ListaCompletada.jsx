import { useContext } from "react";
import { Contexto } from "../../services/Memory";
import Meta from "./Meta";
import { Outlet } from "react-router-dom";

function ListaCompletada() {
  const [estado] = useContext(Contexto);
  const metasCompletadas = Object.values(estado.objetos).filter(
    (meta) => meta.terminada
  );

  if (metasCompletadas.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="mx-auto text-center text-gray-500">
          <h3>Esto está un poco vacío</h3>
          <p>¡Completa una meta!</p>
        </div>
      </div>
    );
  }

  return (
    <>
    <div className="flex justify-center items-center">
        <h2 className="mt-4 p-2 text-lg text-gray-700">Metas completadas</h2>
    </div>
      {metasCompletadas.map((meta) => (
        <Meta key={meta.id} {...meta} />
      ))}
      <Outlet />
    </>
  );
}

export default ListaCompletada;
