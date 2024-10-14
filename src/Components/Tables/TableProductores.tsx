import { FC } from 'react';
import '../../Styles/Reutilized.css'

interface TableProductoresProps {
}

const TableProductores: FC<TableProductoresProps> = () => {
    return (
        <table className="table sm marginYBox marginYTitle">
            <tbody>
                <tr>
                    <td>Liquidación del productor de INSERTE TIPO DE ARCHIVO</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Liquidación del productor de INSERTE TIPO DE ARCHIVO</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Liquidación del productor de INSERTE TIPO DE ARCHIVO</td>
                    <td></td>
                </tr>
                <tr>
                    <td className='tdImportant'>Liquidación del productor</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Liquidación de productores a cargo de INSERTE TIPO DE ARCHIVO</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Liquidación de productores a cargo de INSERTE TIPO DE ARCHIVO</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Liquidación de productores a cargo de INSERTE TIPO DE ARCHIVO</td>
                    <td></td>
                </tr>
                <tr>
                    <td className='tdImportant'>Liquidación de productores a cargo</td>
                    <td></td>
                </tr>
                <tr>
                    <td className='tdImportant'>Subtotal</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Impuesto CRÉDITO/DÉBITO(1,2)</td>
                    <td></td>
                </tr>
                <tr>
                    <td className='tdImportant'>Subtotal</td>
                    <td></td>
                </tr>
                <tr>
                    <td>IVA</td>
                    <td></td>
                </tr>
                <tr>
                    <td className='tdImportant'>Total Neto a cobrar</td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    )
}

export default TableProductores;