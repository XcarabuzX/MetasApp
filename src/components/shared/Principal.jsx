import estilos from './Principal.module.css';
import Vinculo from './Vinculo';
import ListaSVG from '../../assets/img/lista.svg?react';
import NuevaSVG from '../../assets/img/nueva.svg?react';
import CompletadaSVG from '../../assets/img/completada.svg?react';
function Principal ({ children }){
    return(
        <div className={estilos.principal}>
            <aside className={estilos.aside}>
                <Vinculo 
                    to="/lista" 
                    texto="Metas Pendientes" 
                    Icono={ListaSVG}/>   
                <Vinculo 
                    to="/crear" 
                    texto="Nueva Meta" 
                    Icono={NuevaSVG}/>
                <Vinculo
                    to="/completada"
                    texto="Metas completadas"
                    Icono={CompletadaSVG}
                />
            </aside>
            <main className={estilos.main}>
                {children}
            </main>
        </div>
    );
}

export default Principal;