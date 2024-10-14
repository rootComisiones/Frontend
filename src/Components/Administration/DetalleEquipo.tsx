import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../Context/UserContext'
import getCoordinadores from '../../DbFunctions/getCoordinadores';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const DetalleEquipo = ({ detalleManager, setIsDetalleOn }: { detalleManager: any, setIsDetalleOn: any }) => {

    const { setLoaderOn } = useContext(UserContext);
    const [equipo, setEquipo] = useState<any>(null)

    const handleGetCoordinadores = async (manager_id: any) => {
        setLoaderOn(true)
        console.log("este es el manager id: ", manager_id);

        const team = await getCoordinadores(Number(manager_id))
        setEquipo(team)
        setLoaderOn(false)
    }

    const closeModal = () => {
        setEquipo(null)
        setIsDetalleOn(false)
    }

    useEffect(() => {
        console.log("manager id: ", detalleManager);
        handleGetCoordinadores(detalleManager.id)
    }, [])

    return (
        <div className='detalleOverlay'>
            <div className='detalleContainer'>
                <FontAwesomeIcon icon={faXmark} className='exitIcon' onClick={closeModal} />
                <h3>Manager</h3>
                <p>{detalleManager.apellido.toUpperCase() + ', ' + detalleManager.nombre.toUpperCase()}</p>

                <h3>Coordinador/es</h3>
                {
                    equipo?.coordinadores.length > 0 ?
                    equipo.coordinadores.map((coordinador: any) => {
                        return <p key={coordinador.id}>{coordinador.apellido.toUpperCase() + ', ' + coordinador.nombre.toUpperCase()}</p>
                    })
                    :
                    <p>No hay coordinadores en este equipo.</p>
                }
                <h3>Asesor/es</h3>
                {
                    equipo?.asesores.length > 0 ?
                    equipo.asesores.map((asesor: any) => {
                        return <p key={asesor.id}>{asesor.apellido.toUpperCase() + ', ' + asesor.nombre.toUpperCase()}</p>
                    })
                    :
                    <p>No hay asesores en este equipo.</p>
                }
            </div>
        </div>
    )
}

export default DetalleEquipo
