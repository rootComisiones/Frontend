import { useContext, useEffect } from 'react';
import './Home.css';
import '../../Styles/Reutilized.css'
import { UserContext } from '../../Context/UserContext';
import getTeams from '../../DbFunctions/getTeams';
import Background from '../Background/Background';
import dotImage from '../../Assets/iconoLogoBlanco.png'

const Home = () => {

    const goToMainSite = () => {
        window.open('https://rootpartners.com.ar/', '_blank');
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
        });
    }, [])

    return (
        <Background>
            <div className='homeContainer'>
                <div className='homeMainBanner'>
                    <div className='homeTextContainer'>
                        <div className='dotContainer'>
                            <img className='dotPng' src={dotImage} alt="dotImg" />
                            <h1 className='homeTitle titleAnimated'>
                                SIMPLE
                            </h1>
                            <h1 className='homeTitle titleAnimated secondChild'>
                                PRÁCTICA
                            </h1>
                            <h1 className='homeTitle titleAnimated thirdChild'>
                                A <span className='purpleText'>TU</span> MEDIDA
                            </h1>
                            <div className='homeSubtitleContainer'>
                                <p className='homeSubtitle'>Tu plataforma para analizar y gestionar comisiones.</p>

                            </div>
                        </div>
                    </div>
                    {/* <div className='homeBannerContainer'>
                        <div className='homeBanner' onClick={goToMainSite}>
                            <h1 className='homeBannerTitle'>Loyalty Investments</h1>
                            <p className='homeBannerText'>Más de 25 años de trayectoria en el sistema financiero.</p>
                            <p className='homeBannerText'>Agente Productor registrado bajo el N°991 ante la CNV.</p>
                        </div>
                    </div> */}
                </div>
            </div>
        </Background>
    )
}

export default Home;