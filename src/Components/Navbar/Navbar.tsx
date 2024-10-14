import React, { FC, useContext, useEffect, useState } from "react";
import './Navbar.css'
import '../../Styles/Reutilized.css'
import { Link, useLocation } from "react-router-dom";
import { HeaderProps } from "../../Types/Types";
import { UserContext } from "../../Context/UserContext";
import RegularNavbar from "./RegularNavbar";
import Hamburger from "./Hamburger";
import useWindowWidth from "../../Hooks/useWindowWidth";


const Navbar: FC<HeaderProps> = ({ setLoginOn }) => {

    const windowWidth = useWindowWidth();
    const isDesktopWidth = windowWidth > 768;

    const [actualLocation, setActualLocation] = useState('')
    const location = useLocation();
    const { setAdminComState, setAdminState } = useContext(UserContext);

    const handleResetAdminState = () => {
        setAdminState("Usuarios");
        setAdminComState({
            compañía: "arpartners",
            equipo: "",
            vendedor: "manager",
        })
    }

    useEffect(() => {
        setActualLocation(location.pathname.split("/")[1]);
    }, [location.pathname])

    return (
        <div className="navbarContainer flexRow">
            {
                isDesktopWidth ?
                    <RegularNavbar setLoginOn={setLoginOn} actualLocation={actualLocation} handleResetAdminState={handleResetAdminState} />
                    :
                    <div className="hamburgerBox">
                        <Hamburger actualLocation={actualLocation} handleResetAdminState={handleResetAdminState} setLoginOn={setLoginOn} />
                    </div>
            }
        </div>
    )
}

export default Navbar;