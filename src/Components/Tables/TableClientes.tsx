import React, { useContext } from "react";
import '../../Styles/Reutilized.css'
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";


const TableClientes = ({ setDetalleCliente, setIsDetalleOn, refreshData } : { setDetalleCliente: any, setIsDetalleOn: any, refreshData: ()=> void})  => {

    const { allClientes, setEdicion, setPopupData } = useContext(UserContext)
    const navigate = useNavigate();

    const handleDetalle = ( cliente: any ) =>{
        setDetalleCliente(cliente);
        setIsDetalleOn(true)
    }

    const handleEdit = (detalle: any) => {
        setEdicion(detalle)
        navigate('/administracion/clientes/crear')
    }

    return (
        <table className="table marginYBox">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Nro de cuenta</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    allClientes.length &&
                    allClientes.map((cliente: any)=> {
                        return <tr key={"tabla_asesores_"+cliente.username}>
                            <td>{cliente.nombre} {cliente.apellido}</td>
                            <td>{cliente.email}</td>
                            <td>{cliente.telefono}</td>
                            <td>{cliente.numero_cuenta}</td>
                            <td className="tdContainer">
                                <p onClick={()=>handleDetalle(cliente)}>Detalle</p>
                                <p onClick={()=>handleEdit(cliente)}>Editar</p>
                                <p onClick={()=>setPopupData({
                                    text: `Desea eliminar el cliente ${cliente.nombre} ${cliente.apellido}?`,
                                    action: 'cliente',
                                    asesorId: cliente.id,
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

export default TableClientes;