import { FC, useContext } from "react";
import { Link } from "react-router-dom"
import { NavbarProps } from "../../Types/Types";
import { UserContext } from "../../Context/UserContext";

const RegularNavbar: FC<NavbarProps> = ({ setLoginOn, handleResetAdminState, actualLocation }) => {

    const { userData } = useContext(UserContext);

    return (
        <>
            {
                userData.role === 'asesor' || userData.role === 'coordinador' || userData.role === 'manager' ?
                    <>
                        <Link to={"/liquidaciones"} className={`navItem ${actualLocation === "liquidaciones" && "active"}`}>Liquidaciones</Link>
                        <p className="navItem log" onClick={setLoginOn}>Iniciar sesión</p>
                    </>
                    :
                    userData.role === 'root' ?
                        <>
                            <Link onClick={handleResetAdminState} to={"/administracion"} className={`navItem ${actualLocation === "administracion" && "active"}`}>Administración</Link>
                            <Link to={"/liquidaciones"} className={`navItem ${actualLocation === "liquidaciones" && "active"}`}>Liquidaciones</Link>
                            <Link to={"/periodos"} className={`navItem ${actualLocation === "periodos" && "active"}`}>Períodos</Link>
                            <p className="navItem log" onClick={setLoginOn}>Iniciar sesión</p>
                        </>
                        :
                        <p className="navItem log" onClick={setLoginOn}>Iniciar sesión</p>
            }
        </>
    )
}

export default RegularNavbar;