// filepath: [TableAsesores.tsx](http://_vscodecontentref_/3)
import React, { useContext, useEffect } from "react";
import '../../Styles/Reutilized.css'
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";

interface TableAsesoresProps {
    setDetalleAsesor: any;
    setIsDetalleOn: any;
    refreshData: () => void;
    asesoresToShow?: any[];
    isSearchMode?: boolean;
}

const TableAsesores: React.FC<TableAsesoresProps> = ({
    setDetalleAsesor,
    setIsDetalleOn,
    refreshData,
    asesoresToShow,
    isSearchMode = false
}) => {
    const { allAsesores, setEdicion, setPopupData } = useContext(UserContext);
    const navigate = useNavigate();

    // Usar asesoresToShow si está definido (aunque sea array vacío), sino usar allAsesores
    const asesores = typeof asesoresToShow !== 'undefined' ? asesoresToShow : allAsesores;

    console.log('Asesores a mostrar9999999999999:', asesores);

    const handleDetalle = (asesor: any) => {
        setDetalleAsesor(asesor);
        setIsDetalleOn(true);
    };

    const handleEdit = (asesor: any) => {
        setEdicion(asesor);
        navigate('/administracion/asesores/crear');
    };

    useEffect(() => {
        console.log('Asesores en TableAsesores:', asesores);
    }, [asesores]);

    return (
        <>
            <table className="table marginYBox">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Nombre</th>
                        {/* <th>Rol</th> */}
                        <th>Email</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {asesores && asesores.length > 0 ? (
                        asesores.map((asesor: any) => {
                            console.log('Renderizando asesor:', asesor);
                            return (
                                <tr key={"tabla_asesores_" + asesor.username+'_' + asesor.id }>
                                    <td>{asesor.username}</td>
                                    <td>{asesor.nombre + " " + asesor.apellido}</td>
                                    {/* <td>{asesor.rol.toUpperCase()}</td> */}
                                    <td>{asesor.email}</td>
                                    <td className="tdContainer">
                                        <p onClick={() => handleDetalle(asesor)}>Detalle</p>
                                        <p onClick={() => handleEdit(asesor)}>Editar</p>
                                        <p onClick={() => setPopupData({
                                            text: `Desea eliminar el asesor ${asesor.username}?`,
                                            action: asesor.rol,
                                            asesorId: Number(asesor.id),
                                            refreshData: refreshData
                                        })}>Eliminar</p>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={5} style={{ textAlign: 'center', padding: '20px' }}>
                                {isSearchMode ? 'No se encontraron resultados' : 'No hay asesores para mostrar'}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {isSearchMode && asesores.length > 0 && (
                <div style={{ textAlign: 'center', padding: '10px', color: '#666' }}>
                    Mostrando {asesores.length} resultado{asesores.length !== 1 ? 's' : ''} de búsqueda
                </div>
            )}
        </>
    );
};

export default TableAsesores;