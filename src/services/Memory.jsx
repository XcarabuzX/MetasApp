import { createContext, useReducer } from "react";

const memoria = localStorage.getItem("metas");
const estadoInicial = memoria
  ? JSON.parse(memoria)
  : {
      contadorId: 0,
      orden: [],
      objetos: {}
    };

function reductor(estado, accion) {
  switch (accion.tipo) {
    case "colocar": {
      const metas = accion.metas;
      const nuevoEstado = {
        contadorId: estado.contadorId,
        orden: metas.map((meta) => meta.id),
        objetos: metas.reduce(
          (objeto, meta) => ({ ...objeto, [meta.id]: meta }),
          {}
        ),
        completadas: { ...estado.completadas },
      };
      localStorage.setItem("metas", JSON.stringify(nuevoEstado));
      return nuevoEstado;
    }

    case "crear": {
      const id = String(Math.floor(Math.random() * 100) + 1);
      const nuevaMeta = { ...accion.meta, id };
      const nuevoEstado = {
        orden: [...estado.orden, id],
        objetos: { ...estado.objetos, [id]: nuevaMeta }
      };
      localStorage.setItem("metas", JSON.stringify(nuevoEstado));
      return nuevoEstado;
    }

    case "actualizar": {
      const id = accion.meta.id;
      estado.objetos[id] = {
        ...estado.objetos[id],
        ...accion.meta,
      };
      const nuevoEstado = { ...estado };
      localStorage.setItem("metas", JSON.stringify(nuevoEstado));
      return nuevoEstado;
    }

    case "borrar": {
      const id = accion.id;
      const nuevoOrden = estado.orden.filter((item) => item !== id);
      delete estado.objetos[id];
      const nuevoEstado = {
        orden: nuevoOrden,
        objetos: { ...estado.objetos },
        completadas: { ...estado.completadas },
      };
      localStorage.setItem("metas", JSON.stringify(nuevoEstado));
      return nuevoEstado;
    }

    case "completar": {
      const id = accion.id;
      const completadoActual = estado.objetos[id].completado;
      const completadoNuevo = completadoActual + 1;

      const terminada =
        completadoNuevo === estado.objetos[id].meta ? true : false;

      const nuevoObjeto = {
        ...estado.objetos[id],
        completado: completadoNuevo,
        terminada: terminada,
      };
      const nuevoEstado = {
        ...estado,
        objetos: {
          ...estado.objetos,
          [id]: nuevoObjeto,
        },
      };

      localStorage.setItem("metas", JSON.stringify(nuevoEstado));
      return nuevoEstado;
    }

    default:
      throw new Error();
  }
}

export const Contexto = createContext(null);

function Memory({ children }) {
  const [estado, enviar] = useReducer(reductor, estadoInicial);
  return (
    <Contexto.Provider value={[estado, enviar]}>{children}</Contexto.Provider>
  );
}

export default Memory;
