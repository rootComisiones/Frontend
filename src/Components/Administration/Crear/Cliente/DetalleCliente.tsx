import React, { useEffect } from 'react'
import './DetalleCliente.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const DetalleCliente = ({ detalle, setIsDetalleOn, setDetalleCliente }: { detalle: any, setIsDetalleOn: any, setDetalleCliente: any }) => {

    const closeModal = () => {
        setDetalleCliente({})
        setIsDetalleOn(false)
    }

    useEffect(() => {
        console.log(detalle);
    }, [])

    return (
        <div className='detalleOverlay'>
            <div className='detalleContainer'>
                <FontAwesomeIcon icon={faXmark} className='exitIcon' onClick={closeModal} />
                <p>Nombre completo: {detalle?.nombre?.toUpperCase()+" "+detalle?.apellido?.toUpperCase()}</p>
                <p>Email: {detalle?.email?.toUpperCase()}</p>
                <p>Telefono: {detalle?.telefono}</p>
                <p>Nro de cuenta: {detalle?.numero_cuenta}</p>
                <p>Cuit: {detalle?.cuit}</p>
                <p>Tipo de persona: {detalle?.tipo_persona?.toUpperCase()}</p>
                <p>Direccion: {detalle?.provincia?.toUpperCase()+", "+detalle?.localidad?.toUpperCase()+", "+detalle?.direccion?.toUpperCase()}</p>
                <p>CP: {detalle?.codigo_postal}</p>
                <p>Tipo de persona: {detalle?.tipo_persona?.toUpperCase()}</p>
                <p>Creado: {detalle?.fecha_creacion}</p>
                <p>Inicio de actividades: {detalle?.fecha_inicio_actividades}</p>
            </div>
        </div>
    )
}

export default DetalleCliente
