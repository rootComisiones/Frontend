import './Page404.css'
import '../../Styles/Reutilized.css'
import Background from "../Background/Background";
import notFoundImg from '../../Assets/404.png';
import dotLogo from '../../Assets/line.png'

const Page404 = () => {

    return (
        <Background>
            <section className="container">
                <h1 className="title"><img src={dotLogo} className="titlePng" />Página no encontrada</h1>
                <div className="notFoundContainer">
                    <img src={notFoundImg} alt="404" />
                </div>
            </section>
        </Background>
    )
}

export default Page404;