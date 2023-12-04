import { useContext, useEffect } from "react";
import estilos from "./Details.module.css";
import { Contexto } from "../../services/Memory";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

function Details() {
  const { id } = useParams();
  const [estado, enviar] = useContext(Contexto);
  const metaMemoria = estado.objetos[id];
  const metaCompletada = estado.objetos[id]?.terminada || false;
  const navegar = useNavigate();

  const formik = useFormik({
    initialValues: {
      id: metaMemoria?.id || null,
      detalles: metaMemoria?.detalles || "",
      eventos: metaMemoria?.eventos || 1,
      periodo: metaMemoria?.periodo || "semana",
      icono: metaMemoria?.icono || "🏃‍♂️",
      meta: metaMemoria?.meta || 52,
      completado: metaMemoria?.completado || 3,
      terminada: metaMemoria?.terminada || false,
      plazo: metaMemoria?.plazo || "2023-12-30",
    },
    validationSchema: Yup.object({
      detalles: Yup.string()
        .max(30, "Debe tener 30 caracteres o menos")
        .required("Campo obligatorio"),
      eventos: Yup.number()
        .min(1, "Intenta al menos una")
        .integer("Intenta al menos una")
        .required("Campo obligatorio"),
      periodo: Yup.string().required("Campo obligatorio"),
      icono: Yup.string().required("Campo obligatorio"),
      meta: Yup.number()
        .min(1, "Intenta un numero mayor a cero")
        .integer("Solo numeros enteros")
        .required("Campo obligatorio"),
      completado: Yup.number()
        .min(0, "Intenta un numero positivo")
        .integer("Solo numeros enteros")
        .required("Campo obligatorio"),
      plazo: Yup.date()
        .min(new Date(), "La fecha no puede ser anterior a hoy")
        .required("Campo obligatorio"),
    }),
    onSubmit: (values) => {
      Swal.fire({
        title: "Meta creada con exito",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });
      enviar({ tipo: "crear", meta: values });
      navegar("/lista");
    },
  });

  useEffect(() => {
    if (!id) return;
    if (!metaMemoria) {
      return navegar("/lista");
    }
  }, [id, metaMemoria, navegar]);

  const actualizar = async () => {
    await formik.validateForm();
    if (formik.isValid) {
      Swal.fire({
        title: "Meta actualizada con éxito",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });
      enviar({ tipo: "actualizar", meta: formik.values });
      navegar("/lista");
    }
  };

  const borrar = async () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
    });
    swalWithBootstrapButtons
      .fire({
        title: "Se borrará la meta",
        text: "Esto será irreversible",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Borrar",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: "Borrada!",
            text: "Tu meta ha sido eliminada",
            icon: "success",
            showConfirmButton: false,
            timer: 1000,
          });
          enviar({ tipo: "borrar", id });
          if(!metaCompletada){
            navegar("/lista");
          }else{
            navegar("/completada")
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelado",
            text: "Tu meta esta a salvo",
            icon: "error",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      });
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
            <div className={estilos.error}>{formik.errors.detalles}</div>
          ) : null}
        </label>
        <label className="label">
          ¿Con que frecuencia deseas cumplir tu meta?
          <span>Ej.: 1 vez a la semana</span>
          <div className="flex">
            <input
              className="input mr-6"
              type="number"
              value={formik.values.eventos}
              onChange={formik.handleChange("eventos")}
              onBlur={formik.handleBlur("eventos")}
              readOnly={metaCompletada}
            />

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
            {formik.touched.periodo && formik.errors.periodo ? (
              <div className={estilos.error}>{formik.errors.periodo}</div>
            ) : null}
          </div>
          {formik.touched.eventos && formik.errors.eventos ? (
            <div className={estilos.error}>{formik.errors.eventos}</div>
          ) : null}
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
          {formik.touched.meta && formik.errors.meta ? (
            <div className={estilos.error}>{formik.errors.meta}</div>
          ) : null}
        </label>

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
          {formik.touched.plazo && formik.errors.plazo ? (
            <div className={estilos.error}>{formik.errors.plazo}</div>
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
          {formik.touched.completado && formik.errors.completado ? (
            <div className={estilos.error}>{formik.errors.completado}</div>
          ) : null}
        </label>

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
          {formik.touched.icono && formik.errors.icono ? (
            <div className={estilos.error}>{formik.errors.icono}</div>
          ) : null}
        </label>
      </form>
      <div className={estilos.botones}>
        {!metaCompletada && !id && (
          <button
            className="boton boton--negro"
            onClick={() => formik.submitForm()}
          >
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
