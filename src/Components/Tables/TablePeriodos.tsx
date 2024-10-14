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
    newPeriod: any;
}

const TablePeriodos: FC<TablePeriodosProps> = ({ company, newPeriod }) => {

    const [periodos, setPeriodos] = useState([]);
    const { setLoaderOn } = useContext(UserContext);


    const handleGetPeriodos = async () => {
        setLoaderOn(true)
        const allPeriodos = await getAllPeriodos(company.id)
        setPeriodos(allPeriodos)
        setLoaderOn(false)
    }

    useEffect(() => {
        handleGetPeriodos()
        console.log("actualizando periodos");
    }, [newPeriod])

    return (
        <table className="table marginYBox">
            <thead>
                <tr>
                    <th>Período</th>
                    <th>Archivos</th>
                </tr>
            </thead>
            <tbody>
                {
                    periodos.length ?
                        periodos.map((periodo: { id: number, fecha_creacion: string, compa_ia_id: number }) => {
                            const dateUrl = periodo.fecha_creacion.replace("/", "")

                            return <tr key={periodo.id}>
                                <td>{periodo.fecha_creacion}</td>
                                <td className='tdContainer'>
                                    <span>
                                        <Link to={`/periodos/${company.name}/${dateUrl}/${periodo.id}/aranceles`}>
                                            Aranceles
                                        </Link>
                                    </span>
                                    <span>
                                        <Link to={`/periodos/${company.name}/${dateUrl}/${periodo.id}/aranceles_publicos`}>
                                            Aranceles Públicos
                                        </Link>
                                    </span>
                                    <span>
                                        <Link to={`/periodos/${company.name}/${dateUrl}/${periodo.id}/fondos`}>
                                            Fondos
                                        </Link>
                                    </span>
                                </td>
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