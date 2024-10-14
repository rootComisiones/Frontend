import React, { useContext } from "react";
import '../../Styles/Reutilized.css'
import { UserContext } from "../../Context/UserContext";
import { deleteUser } from "../../DbFunctions/deleteUser";


const TableClientes = ({ setDetalleCliente, setIsDetalleOn } : { setDetalleCliente: any, setIsDetalleOn: any})  => {

    const { allClientes } = useContext(UserContext)

    const handleDetalle = ( cliente: any ) =>{
        setDetalleCliente(cliente);
        setIsDetalleOn(true)
    }

    return (
        <table className="table marginYBox">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    allClientes.length &&
                    allClientes.map((cliente: any)=> {
                        return <tr key={"tabla_asesores_"+cliente.username}>
                            <td>{cliente.nombre}</td>
                            <td>{cliente.apellido}</td>
                            <td>{cliente.email}</td>
                            <td>{cliente.telefono}</td>
                            <td className="tdContainer">
                                <p onClick={()=>handleDetalle(cliente)}>Detalle</p>
                                <p>Editar</p>
                                <p onClick={()=>deleteUser(cliente.id, 'cliente')}>Eliminar</p>
                            </td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    )
}

export default TableClientes;