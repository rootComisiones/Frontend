import { FC } from 'react';
import './Header.css';
import '../../Styles/Reutilized.css'
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import { HeaderProps } from '../../Types/Types';
import logoImage from '../../Assets/logoRoot.png';

const Header: FC<HeaderProps> = ({ setLoginOn }) => {

    return (
        <header className="headerContainer" >
            <Link to={"/"}>
                <img className='headerLogo' src={logoImage} alt="logo" />
            </Link>

            <Navbar setLoginOn={setLoginOn} />
        </header>
    )
}

export default Header;