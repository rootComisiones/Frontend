import React, { FC, useContext } from "react";
import '../../Styles/Reutilized.css'
import { TableProps } from "../../Types/Types";


const Table: FC<TableProps> = ({ headers, tableData, empresa }) => {

    return (
        <table className="table marginYBox">
            <thead>
                <tr>
                    {
                        headers.map((header, index) => {
                            return <th key={header + index}>{header}</th>
                        })
                    }
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td key={tableData.nombre_archivo}>{tableData.nombre_archivo}</td>
                    <td key={tableData.tipo}>{empresa}</td>
                    <td key={tableData.total_de_prima}>${tableData.total_de_prima}</td>
                </tr>
            </tbody>
        </table>
    )
}

export default Table;