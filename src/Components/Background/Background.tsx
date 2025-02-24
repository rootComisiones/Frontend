import { FC, useContext } from "react"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import { LoginModal } from "../Login/LoginModal";
import { UserContext } from "../../Context/UserContext";
import Loader from "../Loader/Loader";
import Popup from "../Popup/Popup";

interface BackgroundProps {
    children: React.ReactNode;
}

const Background: FC<BackgroundProps> = ({ children }) => {

    const { handleLoginOff, loginModal, handleLoginOn, setLoginModal } = useContext(UserContext)

    return (
        <>
            <Header setLoginOn={handleLoginOn} />
            <Popup />
            <LoginModal onVisible={loginModal} closeModal={handleLoginOff} setOnVisible={setLoginModal} />
            {children}
            <Loader />
            <Footer />
        </>
    )
}

export default Background;