import { useContext } from "react";
import Meta from "./Meta";
import { Contexto } from "../../services/Memory";
import { Outlet } from "react-router-dom";
import Swal from "sweetalert2";

function Lista() {
  const [estado] = useContext(Contexto);
  const metasPendientes = Object.values(estado.objetos).filter(
    (meta) => !meta.terminada
  );

  const handleMetaCompletada = (id, detalles, completado, meta) => {
    if (completado === meta) {
      console.log('meta completada');
      Swal.fire({
        title: "¡Completaste la meta!",
        text: `${detalles}`,
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });
    }
  };
  

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
      <div className="flex justify-center items-center">
        <h2 className="mt-4 p-2 text-lg text-gray-700">Metas pendientes</h2>
      </div>
      {metasPendientes.map((meta) => (
        <Meta
          key={meta.id}
          {...meta}
          onMetaCompletada={(id, detalles, completado, meta) =>
            handleMetaCompletada(id, detalles, completado, meta)
          }
        />
      ))}
      <Outlet />
    </>
  );
}

export default Lista;
