import { FC, useContext } from "react"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import { LoginModal } from "../Login/LoginModal";
import { UserContext } from "../../Context/UserContext";
import Loader from "../Loader/Loader";

interface BackgroundProps {
    children: React.ReactNode;
}

const Background: FC<BackgroundProps> = ({ children }) => {

    const { handleLoginOff, loginModal, handleLoginOn } = useContext(UserContext)

    return (
        <>
            <Header setLoginOn={handleLoginOn} />
            <LoginModal onVisible={loginModal} closeModal={handleLoginOff} />
            {children}
            <Loader />
            <Footer />
        </>
    )
}

export default Background;