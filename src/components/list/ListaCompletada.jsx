import { useContext } from "react";
import { Contexto } from "../../services/Memory";
import Meta from "./Meta";

function ListaCompletada() {
  const [estado] = useContext(Contexto);
  const metasCompletadas = Object.values(estado.objetos).filter(
    (meta) => meta.terminada === true
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
      {metasCompletadas.map((meta) => (
        <Meta key={meta.id} {...meta} />
      ))}
    </>
  );
}

export default ListaCompletada;
