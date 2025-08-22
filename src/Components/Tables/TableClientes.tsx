import React, { useContext } from "react";
import '../../Styles/Reutilized.css'
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";

interface TableClientesProps {
    setDetalleCliente: any;
    setIsDetalleOn: any;
    refreshData: () => void;
    clientesToShow?: any[];
    isSearchMode?: boolean;
}

const TableClientes: React.FC<TableClientesProps> = ({
    setDetalleCliente,
    setIsDetalleOn,
    refreshData,
    clientesToShow,
    isSearchMode = false
}) => {
    const { allClientes, setEdicion, setPopupData } = useContext(UserContext);
    const navigate = useNavigate();

    // Usar clientesToShow si está disponible, sino usar allClientes del contexto
    const clientes = clientesToShow || allClientes;

    const handleDetalle = (cliente: any) => {
        setDetalleCliente(cliente);
        setIsDetalleOn(true);
    };

    const handleEdit = (cliente: any) => {
        setEdicion(cliente);
        navigate('/administracion/clientes/crear');
    };

    return (
        <>
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
                    {clientes && clientes.length > 0 ? (
                        clientes.map((cliente: any) => (
                            <tr key={"tabla_clientes_" + cliente.id}>
                                <td>{cliente.nombre} {cliente.apellido}</td>
                                <td>{cliente.email ? cliente.email.slice(0, 30) : 'Sin email'}</td>
                                <td>{cliente.telefono || 'Sin teléfono'}</td>
                                <td>{cliente.numero_cuenta}</td>
                                <td className="tdContainer">
                                    <p onClick={() => handleDetalle(cliente)}>Detalle</p>
                                    <p onClick={() => handleEdit(cliente)}>Editar</p>
                                    <p onClick={() => setPopupData({
                                        text: `¿Desea eliminar el cliente ${cliente.nombre} ${cliente.apellido}?`,
                                        action: 'cliente',
                                        asesorId: cliente.id,
                                        refreshData: refreshData
                                    })}>Eliminar</p>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} style={{ textAlign: 'center', padding: '20px' }}>
                                {isSearchMode ? 'No se encontraron resultados' : 'No hay clientes para mostrar'}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {isSearchMode && clientes.length > 0 && (
                <div style={{ textAlign: 'center', padding: '10px', color: '#666' }}>
                    Mostrando {clientes.length} resultado{clientes.length !== 1 ? 's' : ''} de búsqueda
                </div>
            )}
        </>
    );
};

export default TableClientes;