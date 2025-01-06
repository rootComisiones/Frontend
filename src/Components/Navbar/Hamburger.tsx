import { FC, useContext, useState } from "react";
import HamburgerIcon from "./HamburgerIcon";
import { Link } from "react-router-dom";
import { NavbarProps } from "../../Types/Types";
import { UserContext } from "../../Context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

const Hamburger: FC<NavbarProps> = ({ handleResetAdminState, actualLocation, setLoginOn }) => {

    const { userData, setPopupData } = useContext(UserContext)
    const [navbarOn, setNavbarOn] = useState(false);

    const navbarStyle = navbarOn ? { animationName: "hamburger" } : { animationName: "hamburgerOut" };

    const toggleHamburger = () => {
        setNavbarOn(prev => !prev)
    }

    const SesionUsuario = () => {
        if (userData.role === '') {
            return <p className="navItem log" onClick={() => {
                setLoginOn()
                toggleHamburger()
            }}>Iniciar sesión</p>
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
            <HamburgerIcon toggleHamburger={toggleHamburger} />
            <div className="navbarHamburger" style={navbarStyle}>
                {
                    userData.role === 'root' ?
                        <>
                            <Link onClick={() => {
                                handleResetAdminState()
                                toggleHamburger()
                            }} to={"/administracion"} className={`navItem ${actualLocation === "administracion" && "active"}`}>Administración</Link>
                            <Link onClick={toggleHamburger} to={"/liquidaciones"} className={`navItem ${actualLocation === "liquidaciones" && "active"}`}>Liquidaciones</Link>
                            <Link onClick={toggleHamburger} to={"/periodos"} className={`navItem ${actualLocation === "periodos" && "active"}`}>Períodos</Link>

                            <SesionUsuario />
                        </>
                        :
                        userData.role !== '' ?
                            <>
                                <Link onClick={toggleHamburger} to={"/liquidaciones"} className={`navItem ${actualLocation === "liquidaciones" && "active"}`}>Liquidaciones</Link>
                                <SesionUsuario />
                            </>
                            :
                            <SesionUsuario />


                }
            </div>
        </>
    )
}

export default Hamburger;