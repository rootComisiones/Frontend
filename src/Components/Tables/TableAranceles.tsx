import { FC } from 'react';
import '../../Styles/Reutilized.css'

interface TableArancelesProps {
    liquiData: any,
    totalLiquiData?: number,
}

const TableAranceles: FC<TableArancelesProps> = ({ liquiData, totalLiquiData }) => {

    const totalBeneficiario = (array: any) => {
        let total = array.reduce((acumulador: any, elementoActual: any) => {
            return parseInt(acumulador) + parseInt(elementoActual.total);
        }, 0);
        return total;
    }

    const porcentajeComisionACargo = (data: any) => {
        if (data.rol_beneficiario === 'manager') {
            return data.porcentajeGananciaManager
        } else if (data.rol_beneficiario === 'coordinador') {
            return data.porcentajeGananciaCoordinador
        } else {
            return 0
        }
    }

    return (
        <table className="table marginYBox marginYTitle">
            <thead>
                <tr>
                    <th>Nº de Cuenta</th>
                    <th>Cliente</th>
                    <th>Prima</th>
                    {
                        liquiData[0]?.isComision &&
                        <th>% Comisión asesor a cargo</th>
                    }
                    <th>% Comision</th>
                    <th>Prima Comisionable c/ desc</th>
                    {
                        liquiData[0]?.isComision &&
                        <th>Asesor a cargo</th>
                    }
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
                                <td>{liquidacion.prima}</td>
                                <td>{liquidacion.porcentaje_comi}</td>
                                {
                                    liquiData[0]?.isComision &&
                                    <td>{porcentajeComisionACargo(liquidacion)}</td>
                                }
                                <td>{liquidacion.prima_desc}</td>
                                {
                                    liquiData[0]?.isComision &&
                                    <td>{liquidacion.beneficiarioNombre}</td>
                                }
                                <td>{liquidacion.total}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
            {
                totalLiquiData !== undefined ?

                    <tfoot>
                        <tr>
                            <td className='tdImportant' style={{ textAlign: "end" }} colSpan={7}>TOTAL liquidacion: ${parseFloat(totalLiquiData.toFixed(2))}</td>
                        </tr>
                    </tfoot>
                    :
                    <tfoot>
                        <tr>
                            <td className='tdImportant' style={{ textAlign: "end" }} colSpan={9}>TOTAL por Asesores a cargo de: ${totalBeneficiario(liquiData)}</td>
                        </tr>
                    </tfoot>
            }
        </table>
    )
}

export default TableAranceles;