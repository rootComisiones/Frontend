import React, { useContext } from "react";
import '../../Styles/Reutilized.css'
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";


const TableSubAgencias = ({ refreshData }: { refreshData: ()=> void }) => {

    const { allSagencias, setEdicion, setPopupData } = useContext(UserContext)
    const navigate = useNavigate();

    const handleEdit = (detalle: any) => {
        setEdicion(detalle)
        navigate('/administracion/asesores/crear')
    }

    return (
        <table className="table marginYBox">
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Comision</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    allSagencias.length &&
                    allSagencias.map((sagencia) => {
                        return <tr key={"tabla_asesores_" + sagencia.username}>
                            <td>{sagencia.username}</td>
                            <td>{sagencia.nombre_agencia}</td>
                            <td>{sagencia.email}</td>
                            <td>{sagencia.porcentaje_neto}</td>
                            <td className="tdContainer">
                                <p onClick={()=>handleEdit(sagencia)}>Editar</p>
                                <p onClick={()=>setPopupData({
                                    text: `Desea eliminar la Sub Agencia ${sagencia.username}?`,
                                    action: 'sagencia',
                                    asesorId: Number(sagencia.id),
                                    refreshData: refreshData
                                })}>Eliminar</p>
                            </td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    )
}

export default TableSubAgencias;