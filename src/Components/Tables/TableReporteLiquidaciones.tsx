import { FC } from 'react';
import '../../Styles/Reutilized.css';

interface TableReporteLiquidacionesProps {
    reporteData: any[];
    sagenciaId: number;
    empresaId: number;
    periodoId: number;
}

const TableReporteLiquidaciones: FC<TableReporteLiquidacionesProps> = ({ 
    reporteData, 
    sagenciaId, 
    empresaId, 
    periodoId 
}) => {

    return (
        <div style={{ overflowX: 'auto', width: '100%' }}>
            <table className="table marginYBox marginYTitle">
                {/* <thead>
                    <tr>
                        <th>ID</th>
                        <th>Productor</th>
                        <th>Cliente</th>
                        <th>Período</th>
                        <th>Empresa</th>
                        <th>Comisión</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {reporteData.length > 0 ? (
                        reporteData.map((item: any, index: number) => (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.productor}</td>
                                <td>{item.cliente}</td>
                                <td>{item.periodo}</td>
                                <td>{item.empresa}</td>
                                <td>{item.comision}</td>
                                <td>{item.estado}</td>
                                <td className="tdContainer">
                                    <span style={{ color: '#29ce97', cursor: 'pointer' }}>
                                        Ver Detalle
                                    </span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={8} style={{ textAlign: 'center', padding: '2rem' }}>
                                No hay datos disponibles para los criterios seleccionados
                            </td>
                        </tr>
                    )}
                </tbody> */}
            </table>
        </div>
    );
};

export default TableReporteLiquidaciones;