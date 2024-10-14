import React, { FC } from "react";
import '../../Styles/Reutilized.css'
import { TableProps } from "../../Types/Types";


const Table: FC<TableProps> = ({ headers }) => {
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
                    {headers.map((header, index) => {
                        return <td key={header + index}>{header}</td>
                    })}
                </tr>
                {/* <tr>
                    {headers.map((header, index) => {
                        return <td key={header + index}>{header}</td>
                    })}
                </tr>
                <tr>
                    {headers.map((header, index) => {
                        return <td key={header + index}>{header}</td>
                    })}
                </tr>
                <tr>
                    {headers.map((header, index) => {
                        return <td key={header + index}>{header}</td>
                    })}
                </tr> */}
            </tbody>
        </table>
    )
}

export default Table;