import './Header.css';
import Logo  from '../../assets/img/logo.svg?react';
import Perfil from '../../assets/img/perfil.svg?react';
function Header (){
    return(
        <div className="header">
            <div className="contenedor">
                <Logo className="logo"/>
                <a href="/" className="titulo">Metas App</a>
            </div>
            <nav>
                <a href="/perfil" className="vinculo">
                    <Perfil className="icono"/>
                </a>
            </nav>
        </div>
    );
}

export default Header;