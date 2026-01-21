import React, { useEffect } from 'react'
import './DetalleAsesor.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const DetalleAsesor = ({ detalle, setIsDetalleOn, setDetalleAsesor }: { detalle: any, setIsDetalleOn: any, setDetalleAsesor: any }) => {

    const closeModal = () => {
        setDetalleAsesor(null)
        setIsDetalleOn(false)
    }

    useEffect(() => {
        console.log('Detalleeeee:', detalle);
    }, [])

    return (
        <div className='detalleOverlay'>
            <div className='detalleContainer'>
                <FontAwesomeIcon icon={faXmark} className='exitIcon' onClick={closeModal} />
                <p>Usuario: {detalle?.username?.toUpperCase()}</p>
                <p>Rol: {detalle.rol}</p>
                <p>Nombre: {detalle?.nombre?.toUpperCase()}</p>
                <p>Apellido: {detalle?.apellido?.toUpperCase()}</p>
                <p>Email: {detalle?.email?.toUpperCase()}</p>
            </div>
        </div>
    )
}

export default DetalleAsesor
