import { FC, useContext } from "react";
import { Link } from "react-router-dom"
import { NavbarProps } from "../../Types/Types";
import { UserContext } from "../../Context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

const RegularNavbar: FC<NavbarProps> = ({ setLoginOn, handleResetAdminState, actualLocation }) => {

    const { userData, setPopupData } = useContext(UserContext);

    const SesionUsuario = () => {
        if (userData.role === '') {
            return <p className="navItem log" onClick={setLoginOn}>Iniciar sesión</p>
        } else {

            const logout = {
                action: 'logout',
                asesorId: 1,
                text: "Esta seguro/a que desea cerrar sesion?"
            }

            return <div className="logoutDiv" onClick={() => setPopupData(logout)}>
                <p>{userData.username}</p>
                <FontAwesomeIcon icon={faCircleUser} className='exitIcon' style={{ position: 'initial' }} />
            </div>
        }
    }

    return (
        <>
            {
                userData.role === 'asesor' || userData.role === 'coordinador' || userData.role === 'manager' ?
                    <>
                        <Link to={"/liquidaciones"} className={`navItem ${actualLocation === "liquidaciones" && "active"}`}>Liquidaciones</Link>
                        <SesionUsuario />
                    </>
                    :
                    userData.role === 'root' ?
                        <>
                            <Link onClick={handleResetAdminState} to={"/administracion"} className={`navItem ${actualLocation === "administracion" && "active"}`}>Administración</Link>
                            <Link to={"/liquidaciones"} className={`navItem ${actualLocation === "liquidaciones" && "active"}`}>Liquidaciones</Link>
                            <Link to={"/periodos"} className={`navItem ${actualLocation === "periodos" && "active"}`}>Períodos</Link>
                            <SesionUsuario />
                        </>
                        :
                        <SesionUsuario />
            }
        </>
    )
}

export default RegularNavbar;