import { FC, useState } from "react";
import HamburgerIcon from "./HamburgerIcon";
import { Link } from "react-router-dom";
import { NavbarProps } from "../../Types/Types";

const Hamburger: FC<NavbarProps> = ({ handleResetAdminState, actualLocation, setLoginOn }) => {

    const [navbarOn, setNavbarOn] = useState(false);

    const navbarStyle = navbarOn ? { animationName: "hamburger" } : { animationName: "hamburgerOut" };

    const toggleHamburger = () => {
        setNavbarOn(prev => !prev)
    }

    return (
        <>
            <HamburgerIcon toggleHamburger={toggleHamburger} />
            <div className="navbarHamburger" style={navbarStyle}>
                <Link onClick={() => {
                    handleResetAdminState()
                    toggleHamburger()
                }} to={"/administracion"} className={`navItem ${actualLocation === "administracion" && "active"}`}>Administración</Link>
                <Link onClick={toggleHamburger} to={"/liquidaciones"} className={`navItem ${actualLocation === "liquidaciones" && "active"}`}>Liquidaciones</Link>
                <Link onClick={toggleHamburger} to={"/periodos"} className={`navItem ${actualLocation === "periodos" && "active"}`}>Períodos</Link>
                
                <p className="navItem log" onClick={() => {
                    setLoginOn()
                    toggleHamburger()
                }}>Iniciar sesión</p>
            </div>
        </>
    )
}

export default Hamburger;