import React, { useContext, useState } from "react";
import '../../Styles/Reutilized.css'
import { UserContext } from "../../Context/UserContext";
import { deleteUser } from "../../DbFunctions/deleteUser";
import { useNavigate } from "react-router-dom";


const TableAsesores = ({ setDetalleAsesor, setIsDetalleOn }: { setDetalleAsesor: any, setIsDetalleOn: any }) => {

    const { allAsesores, setEdicion } = useContext(UserContext)
    const navigate = useNavigate();

    const handleDetalle = ( asesor: any ) =>{
        setDetalleAsesor(asesor);
        setIsDetalleOn(true)
    }

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
                    <th>Rol</th>
                    <th>Email</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    allAsesores.length &&
                    allAsesores.map((asesor) => {
                        return <tr key={"tabla_asesores_" + asesor.username}>
                            <td>{asesor.username}</td>
                            <td>{asesor.nombre + " " + asesor.apellido}</td>
                            <td>{asesor.rol.toUpperCase()}</td>
                            <td>{asesor.email}</td>
                            <td className="tdContainer">
                                <p onClick={()=>handleDetalle(asesor)}>Detalle</p>
                                <p onClick={()=>handleEdit(asesor)}>Editar</p>
                                <p onClick={()=>deleteUser(asesor.id, asesor.rol)}>Eliminar</p>
                            </td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    )
}

export default TableAsesores;