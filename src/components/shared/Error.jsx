import { useRouteError } from "react-router-dom";

function Error() {
    const error = useRouteError();
    return ( 
        <>
            <h1>Oh No! 404</h1>
            <h3>Ah ocurrido un error</h3>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </>
     );
}

export default Error;