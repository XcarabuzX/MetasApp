import estilos from './Header.module.css';
import LogoSVG  from '../../assets/img/logo.svg?react';
import PerfilSVG from '../../assets/img/perfil.svg?react';
import Vinculo from './Vinculo';
function Header (){
    return(
        <header className={estilos.header}>
            <div className={estilos.contenedor}>
                <LogoSVG className={estilos.logo}/>
                <a href="/" className={estilos.titulo}>Metas App</a>
            </div>
            <nav>
            <Vinculo 
                    href="/perfil" 
                    Icono={PerfilSVG}/> 
            </nav>
        </header>
    );
}

export default Header;