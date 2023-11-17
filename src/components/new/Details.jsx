import estilos from './Details.module.css';
function Details() {
    const frecuencias = ["día","semana","mes","año",];
    const iconos = ["💻","🏃‍♂️","✈️","📚","🥁","🏡","🔥"];
    return ( 
        <div className="tarjeta">
            <form className="p-4">
                <label className="label">
                    Describe tu meta
                    <input className="input" type="text" placeholder="Ej.: 2 horas de limpieza" />
                </label>
                <label className="label">
                    ¿Con que frecuencia deseas cumplir tu meta?<span>Ej.: 1 vez a la semana</span>
                    <div className="flex mb-6">
                        <input className="input mr-6" type="number" />
                        <select className="input">
                            {frecuencias.map(opcion => <option value={opcion}>{opcion}</option>)}
                        </select>
                    </div>
                </label>
                <label className="label">
                    ¿Cuantas veces deseas completar esta meta?
                    <input className="input" type="number" />
                </label>
                <label className="label">
                    ¿Tienes una fecha limite?
                    <input className="input" type="date" />
                </label>
                <label className="label">
                    ¿Cuantas veces ya has completado esta meta?
                    <input className="input" type="number" />
                </label>
                <label className="label">
                    Escoge un icono para la meta
                    <select className="input">
                        {iconos.map(icono => <option value={icono}>{icono}</option>)}
                    </select>
                </label>
            </form>
            <div className={estilos.botones}>
                <button className="boton boton--negro">Crear</button>
                <button className="boton boton--gris">Cancelar</button>
            </div>
        </div>
     );
}

export default Details;