import { useContext } from "react";
import Meta from "./Meta";
import { Contexto } from "../../services/Memory";
import { Outlet } from "react-router-dom";

function Lista() {
  const [estado] = useContext(Contexto);
  const metasPendientes = Object.values(estado.objetos).filter(
    (meta) => !meta.terminada
  );

  if (metasPendientes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="mx-auto text-center text-gray-500">
          <h3>Esto está un poco vacío</h3>
          <p>¡Agrega una meta!</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {metasPendientes.map((meta) => (
        <Meta key={meta.id} {...meta} />
      ))}
      <Outlet />
    </>
  );
}

export default Lista;
