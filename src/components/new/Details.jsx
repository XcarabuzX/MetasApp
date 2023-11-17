function Details() {
    const frecuencias = ["día","semana","mes","año",];
    const iconos = ["💻","🏃‍♂️","✈️","📚","🥁","🏡","🔥"];
    return ( 
        <div>
            <form action="">
                <label>
                    Describe tu meta
                    <input type="text" placeholder="Ej.: 2 horas de limpieza" />
                </label>
                <label>
                    ¿Con que frecuencia deseas cumplir tu meta?<span>Ej.: 1 vez a la semana</span>
                    <div>
                        <input type="number" />
                        <select>
                            {frecuencias.map(opcion => <option value={opcion}>{opcion}</option>)}
                        </select>
                    </div>
                </label>
                <label>
                    ¿Cuantas veces deseas completar esta meta?
                    <input type="number" />
                </label>
                <label>
                    ¿Tienes una fecha limite?
                    <input type="date" />
                </label>
                <label>
                    ¿Cuantas veces ya has completado esta meta?
                    <input type="number" />
                </label>
                <label>
                    Escoge un icono para la meta
                    <select>
                        {iconos.map(icono => <option value={icono}>{icono}</option>)}
                    </select>
                </label>
            </form>
            <div>
                <button>Crear</button>
                <button>Cancelar</button>
            </div>
        </div>
     );
}

export default Details;