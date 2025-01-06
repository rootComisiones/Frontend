import { FC } from 'react';
import '../../Styles/Reutilized.css'

interface TableProductoresProps {
    resultsData: any
}

const TableProductores: FC<TableProductoresProps> = ({ resultsData }) => {

    return (
        <table className="table sm marginYBox marginYTitle">
            {
                resultsData !== null &&
                <tbody>
                    <tr>
                        <td>Liquidación del productor de Aranceles</td>
                        <td>{resultsData.totalAranceles}</td>
                    </tr>
                    <tr>
                        <td>Liquidación del productor de Aranceles Públicos</td>
                        <td>{resultsData.totalArancelesPu}</td>
                    </tr>
                    <tr>
                        <td>Liquidación del productor de Fondos</td>
                        <td>{resultsData.totalFondos}</td>
                    </tr>
                    <tr>
                        <td className='tdImportant'>Liquidación total del productor</td>
                        <td>${resultsData.totalLiquidacion}</td>
                    </tr>
                    <tr>
                        <td>Liquidación de productores a cargo de Aranceles</td>
                        <td>{resultsData.totalArancelesBeneficiario}</td>
                    </tr>
                    <tr>
                        <td>Liquidación de productores a cargo de Aranceles Públicos</td>
                        <td>{resultsData.totalArancelesPuBeneficiario}</td>
                    </tr>
                    <tr>
                        <td>Liquidación de productores a cargo de Fondos</td>
                        <td>{resultsData.totalFondosBeneficiario}</td>
                    </tr>
                    <tr>
                        <td className='tdImportant'>Liquidación total de productores a cargo</td>
                        <td>${resultsData.totalLiquidacionBeneficiario}</td>
                    </tr>
                    <tr>
                        <td className='tdImportant'>Subtotal</td>
                        <td>${resultsData.subtotal}</td>
                    </tr>
                    <tr>
                        <td>Impuesto CRÉDITO/DÉBITO(1,2)</td>
                        <td>{resultsData.impuestoCreditoDebito}</td>
                    </tr>
                    <tr>
                        <td>IVA</td>
                        <td>{resultsData.iva}</td>
                    </tr>
                    <tr>
                        <td className='tdImportant'>Total Neto a cobrar</td>
                        <td>${resultsData.total}</td>
                    </tr>
                </tbody>
            }
        </table>
    )
}

export default TableProductores;