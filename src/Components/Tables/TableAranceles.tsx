import { FC, useContext } from 'react';
import '../../Styles/Reutilized.css'
import { UserContext } from '../../Context/UserContext';

interface TableArancelesProps {
    liquiData: any,
    totalLiquiData?: number,
}

const TableAranceles: FC<TableArancelesProps> = ({ liquiData, totalLiquiData }) => {

    const { userData } = useContext(UserContext);

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
        <div style={{ overflowX: 'auto', width: '100%' }}>
            <table className="table marginYBox marginYTitle">
                <thead>
                    <tr>
                        <th>Nº de Comitente</th>
                        <th>Comitente</th>
                        <th>Base de calculo</th>
                        {/* <th>Prima comisionable c/desc.</th> */}
                        <th>Condicion</th>
                        <th>Broker</th>
                        <th>Productor</th>
                        <th>Sit. Impositiva</th>
                        <th>% Comision</th>
                        <th>Comision Asesor</th>
                        <th>Plus Coordinador</th>
                        <th>Plus Team Leader</th>
                        <th>Plus Referral</th>
                        <th>Equipo</th>
                        <th>Coordinador</th>
                        <th>Team Leader</th>
                        {
                            userData.role === 'root' &&
                            <>
                                <th>Rentabilidad Subagencia</th>
                                <th>Rentabilidad Root</th>
                            </>
                        }
                        {
                            userData.role === 'sagencia' &&
                            <th>Rentabilidad Subagencia</th>
                        }

                        {/* // Asesor ve hasta comision asesor + equipo + pf/pj
                    // Coordinador ve hasta plus coordinador +equipo + pf/pj + Coordinador
                    // Manager ve todo menos Rentabilidades
                    // Subagencia ve todo menos Rentabilidad Root */}

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
                                    <td>{liquidacion.base_de_calculo}</td>
                                    {/* <td>{liquidacion.prima_desc}</td> */}
                                    <td>{liquidacion.condicion}</td>
                                    <td>{liquidacion.compania_nombre}</td>
                                    <td>{liquidacion.productor_nombre}</td>
                                    <td>{liquidacion.situacion_impositiva}</td>
                                    <td>{liquidacion.porcentaje_comi}</td>
                                    <td>{liquidacion.comision_asesor}</td>
                                    <td>{liquidacion.plus_coordinador}</td>
                                    <td>{liquidacion.plus_teamleader}</td>
                                    <td>{liquidacion.plus_referral}</td>
                                    <td>{liquidacion.cabeza_agencia_nombre}</td>
                                    <td>{liquidacion.coordinador_name}</td>
                                    <td>{liquidacion.teamleader_name}</td>
                                    {
                                        userData.role === 'root' &&
                                        <>
                                            <td>{liquidacion.rentabilidad_sub_agencia}</td>
                                            <td>{liquidacion.rentabilidad_root}</td>
                                        </>
                                    }
                                    {
                                        userData.role === 'sagencia' &&
                                        <>
                                            <td>{liquidacion.rentabilidad_sub_agencia}</td>
                                        </>
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
                {/* {
                    totalLiquiData !== undefined ?

                        <tfoot>
                            <tr>
                                <td className='tdImportant' style={{ textAlign: "end" }} colSpan={17}>TOTAL liquidacion: ${parseFloat(totalLiquiData.toFixed(2))}</td>
                            </tr>
                        </tfoot>
                        :
                        <tfoot>
                            <tr>
                                <td className='tdImportant' style={{ textAlign: "end" }} colSpan={17}>TOTAL por Asesores a cargo de: ${totalBeneficiario(liquiData)}</td>
                            </tr>
                        </tfoot>
                } */}
            </table>
        </div>
    )
}

export default TableAranceles;