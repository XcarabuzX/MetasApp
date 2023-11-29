import { useContext, useEffect } from "react";
import estilos from "./Details.module.css";
import { Contexto } from "../../services/Memory";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import isEqual from "lodash/isEqual";


function Details() {
    const { id } = useParams();
    const [estado, enviar] = useContext(Contexto);
    const metaMemoria = estado.objetos[id];
    const metaCompletada = estado.objetos[id]
      ? estado.objetos[id].terminada || false
      : false;
  
    const navegar = useNavigate();
    
  const formik = useFormik({
    initialValues: {
      detalles: "",
      eventos: 1,
      periodo: "semana",
      icono: "🏃‍♂️",
      meta: 52,
      completado: 3,
      terminada: false,
      plazo: "2023-12-30",
    },
    validationSchema: Yup.object({
      detalles: Yup.string()
        .max(30, "Debe tener 30 caracteres o menos")
        .required("Campo obligatorio"),
      eventos: Yup.number()
        .positive("Intenta un numero positivo")
        .integer("Solo numeros enteros")
        .required("Campo obligatorio"),
      periodo: Yup.string().required("Campo obligatorio"),
      icono: Yup.string().required("Campo obligatorio"),
      meta: Yup.number()
        .positive("Intenta un numero positivo")
        .integer("Solo numeros enteros")
        .required("Campo obligatorio"),
      completado: Yup.number()
        .positive("Intenta un numero positivo")
        .integer("Solo numeros enteros")
        .required("Campo obligatorio"),
      plazo: Yup.date()
        .min(new Date(), "La fecha no puede ser anterior a hoy")
        .required("Campo obligatorio"),
    }),
    onSubmit: (values) => {
      enviar({ tipo: "crear", meta: values });
      navegar("/lista");
    },
  });



  useEffect(() => {
    if (!id) return;
    if (!metaMemoria) {
      return navegar("/lista");
    }
    if (!isEqual(metaMemoria, formik.values)) {
        formik.setValues(metaMemoria);
      }
  }, [id, metaMemoria,formik, navegar]);

  const actualizar = async () => {
    enviar({ tipo: "actualizar", meta: formik.values });
    navegar("/lista");
  };

  const borrar = async () => {
    enviar({ tipo: "borrar", id });
    navegar("/lista");
  };

  const cancelar = () => {
    if (!metaCompletada) {
      navegar("/lista");
    } else {
      navegar("/completada");
    }
  };

  const frecuencias = ["día", "semana", "mes", "año"];
  const iconos = ["💻", "🏃‍♂️", "✈️", "📚", "🥁", "🏡", "🔥"];
  return (
    <div className="tarjeta">
      <form className="p-4" onSubmit={formik.handleSubmit}>
        <label className="label">
          Describe tu meta
          <input
            className="input"
            type="text"
            placeholder="Ej.: 2 horas de limpieza"
            value={formik.values.detalles}
            onChange={formik.handleChange("detalles")}
            onBlur={formik.handleBlur("detalles")}
            readOnly={metaCompletada}
          />
          {formik.touched.detalles && formik.errors.detalles ? (
            <div>{formik.errors.detalles}</div>
          ) : null}
        </label>
        <label className="label">
          ¿Con que frecuencia deseas cumplir tu meta?
          <span>Ej.: 1 vez a la semana</span>
          <div className="flex mb-6">
            <input
              className="input mr-6"
              type="number"
              value={formik.values.eventos}
              onChange={formik.handleChange("eventos")}
              onBlur={formik.handleBlur("eventos")}
              readOnly={metaCompletada}
            />
            {formik.touched.detalles && formik.errors.eventos ? (
              <div>{formik.errors.eventos}</div>
            ) : null}

            <select
              className="input"
              value={formik.values.periodo}
              onChange={formik.handleChange("periodo")}
              onBlur={formik.handleBlur("periodo")}
              disabled={metaCompletada}
            >
              {frecuencias.map((opcion) => (
                <option key={opcion} value={opcion}>
                  {opcion}
                </option>
              ))}
            </select>
            {formik.touched.detalles && formik.errors.periodo ? (
              <div>{formik.errors.periodo}</div>
            ) : null}
          </div>
        </label>
        <label className="label">
          ¿Cuantas veces deseas completar esta meta?
          <input
            className="input"
            type="number"
            value={formik.values.meta}
            onChange={formik.handleChange("meta")}
            onBlur={formik.handleBlur("meta")}
            readOnly={metaCompletada}
          />
        </label>
        {formik.touched.detalles && formik.errors.meta ? (
          <div>{formik.errors.meta}</div>
        ) : null}

        <label className="label">
          ¿Tienes una fecha limite?
          <input
            className="input"
            type="date"
            value={formik.values.plazo}
            onChange={formik.handleChange("plazo")}
            onBlur={formik.handleBlur("plazo")}
            readOnly={metaCompletada}
          />
          {formik.touched.detalles && formik.errors.plazo ? (
            <div>{formik.errors.plazo}</div>
          ) : null}
        </label>
        <label className="label">
          ¿Cuantas veces ya has completado esta meta?
          <input
            className="input"
            type="number"
            value={formik.values.completado}
            onChange={formik.handleChange("completado")}
            onBlur={formik.handleBlur("completado")}
            readOnly={metaCompletada}
          />
        </label>
        {formik.touched.detalles && formik.errors.completado ? (
          <div>{formik.errors.completado}</div>
        ) : null}

        <label className="label">
          Escoge un icono para la meta
          <select
            className="input"
            value={formik.values.icono}
            onChange={formik.handleChange("icono")}
            onBlur={formik.handleBlur("icono")}
            disabled={metaCompletada}
          >
            {iconos.map((icono) => (
              <option key={icono} value={icono}>
                {icono}
              </option>
            ))}
          </select>
        </label>
        {formik.touched.detalles && formik.errors.icono ? (
          <div>{formik.errors.icono}</div>
        ) : null}
      </form>
      <div className={estilos.botones}>
        {!metaCompletada && !id && (
          <button className="boton boton--negro" onClick={() => formik.submitForm()}>
            Crear
          </button>
        )}
        {!metaCompletada && id && (
          <button className="boton boton--negro" onClick={actualizar}>
            Actualizar
          </button>
        )}
        {id && (
          <button className="boton boton--rojo" onClick={borrar}>
            Borrar
          </button>
        )}
        <button className="boton boton--gris" onClick={cancelar}>
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default Details;
