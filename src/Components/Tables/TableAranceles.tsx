import { FC, useContext } from 'react';
import '../../Styles/Reutilized.css'
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

interface TableArancelesProps {
    liquiData: any,
    totalLiquiData: number,
}

const TableAranceles: FC<TableArancelesProps> = ({ liquiData, totalLiquiData }) => {
    return (
        <table className="table marginYBox marginYTitle">
            <thead>
                <tr>
                    <th>Nº de Cuenta</th>
                    <th>Cliente</th>
                    <th>Tipo</th>
                    <th>Prima</th>
                    <th>Porcentaje Comisión</th>
                    <th>Prima Comisionable c/ desc</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {
                    liquiData.length &&
                    liquiData.map((liquidacion: any) => {
                        return (
                            liquidacion !== null &&
                            <tr key={liquidacion.id}>
                                <td>{liquidacion.numero_cuenta}</td>
                                <td>{liquidacion.cliente}</td>
                                <td>{liquidacion.tipo_de_arance}</td>
                                <td>{liquidacion.prima}</td>
                                <td>{liquidacion.porcentaje_comi}</td>
                                <td>{liquidacion.prima_desc}</td>
                                <td>{liquidacion.total}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
            <tfoot>
                <tr>
                    <td className='tdImportant' style={{textAlign: "end"}} colSpan={7}>TOTAL: {parseFloat(totalLiquiData.toFixed(2))}</td>
                </tr>
            </tfoot>
        </table>
    )
}

export default TableAranceles;