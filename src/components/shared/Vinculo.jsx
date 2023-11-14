function Vinculo({children, texto, href}){
    return(
        <a href={href} className="vinculo">
            {children}
            <span>{texto}</span>
        </a>
    );
}
export default Vinculo;