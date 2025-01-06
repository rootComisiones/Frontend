import { FC, useContext, useEffect, useState } from 'react';
import '../../Styles/Reutilized.css'
import getAllPeriodos from '../../DbFunctions/getAllPeriodos';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

interface TablePeriodosProps {
    company: {
        id: number,
        name: string
    };
    periodos: any;
}

const TablePeriodos: FC<TablePeriodosProps> = ({ company, periodos }) => {

    const { setPopupData } = useContext(UserContext);


    return (
        <table className="table marginYBox">
            <thead>
                <tr>
                    <th>Período</th>
                    <th>Archivos</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    periodos?.length ?
                        periodos.map((periodo: { id: number, fecha_creacion: string, compa_ia_id: number }) => {
                            const dateUrl = periodo.fecha_creacion.replace("/", "")

                            return <tr key={periodo.id}>
                                <td>{periodo.fecha_creacion}</td>
                                <td className='tdContainer'>
                                    <span>
                                        <Link to={`/periodos/${company.name}/${dateUrl}/${periodo.id}/archivo`}>
                                            Archivo de {company?.name.toUpperCase()}
                                        </Link>
                                    </span>
                                </td>
                                <td onClick={() => setPopupData({
                                    action: 'periodo',
                                    asesorId: periodo.id,
                                    text: 'Esta seguro de querer eliminar este periodo?'
                                })} style={{textAlign: 'center', color: '#29ce97', cursor: 'pointer'}}>Eliminar</td>
                            </tr>
                        }) :
                        <tr>
                            <td colSpan={2}>No hay periodos disponibles</td>
                        </tr>
                }
            </tbody>
        </table>
    )
}

export default TablePeriodos;