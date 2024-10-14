import { FC, useEffect } from 'react';
import './HamburgerIcon.css'

interface HamburgerIconProps{
    toggleHamburger: () => void;
}

const HamburgerIcon:FC<HamburgerIconProps> = ({ toggleHamburger }) => {

    return(
        <div className="hamburgerContainer" onClick={toggleHamburger}>
            <span className="line first" />
            <span className="line second" />
            <span className="line third" />
        </div>
    )
}

export default HamburgerIcon;