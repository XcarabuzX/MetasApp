import './Header.css';
import LogoSVG  from '../../assets/img/logo.svg?react';
import PerfilSVG from '../../assets/img/perfil.svg?react';
function Header (){
    return(
        <header className="header">
            <div className="contenedor">
                <LogoSVG className="logo"/>
                <a href="/" className="titulo">Metas App</a>
            </div>
            <nav>
                <a href="/perfil" className="vinculo">
                    <PerfilSVG className="icono"/>
                </a>
            </nav>
        </header>
    );
}

export default Header;