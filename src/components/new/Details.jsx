import { useContext, useEffect, useState } from 'react';
import estilos from './Details.module.css';
import { Contexto } from '../../services/Memory';
import { useNavigate, useParams } from 'react-router-dom';
function Details() {

    const { id } = useParams();

    const [form, setForm] = useState({
        detalles: '',
        eventos: 1,
        periodo: 'semana',
        icono: '🏃‍♂️',
        meta: 52,
        completado:3,
        plazo: '2023-12-30'
    });

    const [estado,enviar] = useContext(Contexto);

    const {detalles,eventos,periodo,icono,meta,completado,plazo} = form;

    const onChange = (event, prop) =>{
        setForm(estado => ({...estado,[prop]:event.target.value}));
    }
    const navegar = useNavigate();
    const metaMemoria = estado.objetos[id];
    
    useEffect(()=>{
        if(!id) return;
        if(!metaMemoria){
            return navegar('/lista');
        }
        setForm(metaMemoria);
    },[id, metaMemoria, navegar]);


    const crear =  async () => {
        enviar({tipo: 'crear', meta: form});
        navegar('/lista');
    }
    const actualizar =  async () => {
        enviar({tipo: 'actualizar', meta: form});
        navegar('/lista');
    }

    const borrar = async () => {
        enviar({tipo: 'borrar', id});
        navegar('/lista');
    }

    const cancelar =  () => {
       navegar('/lista');
    }

    const frecuencias = ["día","semana","mes","año",];
    const iconos = ["💻","🏃‍♂️","✈️","📚","🥁","🏡","🔥"];
    return ( 
        <div className="tarjeta">
            <form className="p-4">
                <label className="label">
                    Describe tu meta
                    <input 
                        className="input" 
                        type="text" placeholder="Ej.: 2 horas de limpieza" 
                        value={detalles} 
                        onChange={e => onChange(e, 'detalles')}/>
                </label>
                <label className="label">
                    ¿Con que frecuencia deseas cumplir tu meta?<span>Ej.: 1 vez a la semana</span>
                    <div className="flex mb-6">
                        <input 
                            className="input mr-6" 
                            type="number" 
                            value={eventos}
                            onChange={e => onChange(e, 'eventos')}/>
                        <select 
                            className="input" 
                            value={periodo}
                            onChange={e => onChange(e, 'periodo')}>
                            {frecuencias.map(opcion => <option key={opcion} value={opcion}>{opcion}</option>)}
                        </select>
                    </div>
                </label>
                <label className="label">
                    ¿Cuantas veces deseas completar esta meta?
                    <input 
                        className="input" 
                        type="number" 
                        value={meta}
                        onChange={e => onChange(e, 'meta')}/>
                </label>
                <label className="label">
                    ¿Tienes una fecha limite?
                    <input 
                        className="input" 
                        type="date" 
                        value={plazo}
                        onChange={e => onChange(e, 'plazo')}/>
                </label>
                <label className="label">
                    ¿Cuantas veces ya has completado esta meta?
                    <input 
                        className="input" 
                        type="number" 
                        value={completado}
                        onChange={e => onChange(e, 'completado')}/>
                </label>
                <label className="label">
                    Escoge un icono para la meta
                    <select 
                        className="input" 
                        value={icono}
                        onChange={e => onChange(e, 'icono')}>
                        {iconos.map(icono => <option key={icono} value={icono}>{icono}</option>)}
                    </select>
                </label>
            </form>
            <div className={estilos.botones}>
                {!id && <button 
                    className="boton boton--negro"
                    onClick={crear}
                    >Crear</button>}
                {id && <button 
                    className="boton boton--negro"
                    onClick={actualizar}
                    >Actualizar</button>}
                {id && <button 
                    className="boton boton--rojo"
                    onClick={borrar}
                    >Borrar</button>}
                <button 
                    className="boton boton--gris"
                    onClick={cancelar}
                    >Cancelar</button>
            </div>
        </div>
     );
}

export default Details;