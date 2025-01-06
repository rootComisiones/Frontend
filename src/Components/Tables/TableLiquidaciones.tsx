import { FC, useContext, useEffect } from 'react';
import '../../Styles/Reutilized.css'
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

interface TableLiquidacionesProps {
    periodo_id: number;
    liquiData: any;
}

const TableLiquidaciones: FC<TableLiquidacionesProps> = ({ periodo_id, liquiData }) => {

    const { liquidationState } = useContext(UserContext);

    return (
        <table className="table marginYBox">
            <thead>
                <tr>
                    <th>Período</th>
                    <th>Productor</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    liquiData.length ?
                        liquiData.map((liquidacion: any) => {

                            const date = liquidacion.periodos.fecha_creacion.slice(0, 7);
                            const role = liquidacion.asesor_id !== null ? "asesor" : liquidacion.coordinador_id !== null ? "coordinador" : "manager"; 

                            return <tr key={liquidacion[`${role}_id`]}>
                                <td>{date}</td>
                                <td>{liquidacion[role].username}</td>
                                <td className='tdContainer'>
                                    <span>
                                        <Link to={`/liquidaciones/${liquidationState.id}/${periodo_id}-${date}/${liquidacion[`${role}_id`]}-${liquidacion[role].username}/${role}`}>
                                            Ver Liquidación
                                        </Link>
                                    </span>
                                </td>
                            </tr>
                        }) :
                        <tr>
                            <td colSpan={5}>No hay Liquidaciones disponibles en este período.</td>
                        </tr>
                }
            </tbody>
        </table>
    )
}

export default TableLiquidaciones;