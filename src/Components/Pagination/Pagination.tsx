import React from "react";
import '../../Styles/Reutilized.css';

const Pagination = ({
    page,
    totalPages,
    hasNextPage,
    hasPrevPage,
    onPageChange,
}: any) => (
    <div className="paginationContainer marginYBox flexRow centerCenter">
        <button className="btn" onClick={() => onPageChange(page - 1)} disabled={!hasPrevPage}>Anterior</button>
        <p style={{ width: '150px', textAlign: 'center', display: 'flex', justifyContent: 'center' , alignItems: 'center'}} className="ordinaryText marginXBtn">Página {page} de {totalPages}</p>
        <button className="btn" onClick={() => onPageChange(page + 1)} disabled={!hasNextPage}>Siguiente</button>
    </div>
);

export default Pagination;