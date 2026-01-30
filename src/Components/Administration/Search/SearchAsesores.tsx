import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import getAsesorByUsername from '../../../DbFunctions/getAsesorByUsername';
import './SearchClients.css';

interface SearchAsesoresProps {
    onAsesorFound: (asesores: any[]) => void;
    onClearSearch: () => void;
    setLoaderOn: (loading: boolean) => void;
}

const SearchAsesores: React.FC<SearchAsesoresProps> = ({ onAsesorFound, onClearSearch, setLoaderOn }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [searchResult, setSearchResult] = useState<any>(null);
    const [searchError, setSearchError] = useState<string>('');

    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            setSearchError('Ingrese un username para buscar');
            return;
        }
        setIsSearching(true);
        setLoaderOn(true);
        setSearchError('');
        try {
            const result = await getAsesorByUsername(searchTerm.trim());

            if (result?.error) {
                setSearchResult(null);
                setSearchError(result.error);
                onAsesorFound([]);
            } else if (result?.asesor) {
                setSearchResult(result.asesor);
                onAsesorFound([result.asesor]);
                setSearchError('');
            } else {
                setSearchResult(null);
                setSearchError('Asesor no encontrado');
                onAsesorFound([]);
            }
        } catch (error) {
            setSearchError('Error al buscar asesor');
            setSearchResult(null);
            onAsesorFound([]);
        }
        setIsSearching(false);
        setLoaderOn(false);
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        setSearchResult(null);
        setSearchError('');
        setIsSearching(false);
        onClearSearch();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="searchContainer">
            <div className="searchInputContainer">
                <input
                    type="text"
                    placeholder="Buscar por username..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="searchInput"
                />
                <button 
                    onClick={handleSearch} 
                    className="searchBtn"
                    disabled={isSearching}
                >
                    <FontAwesomeIcon icon={faSearch} />
                </button>
                {(searchResult || searchError) && (
                    <button 
                        onClick={handleClearSearch} 
                        className="clearBtn"
                        title="Limpiar búsqueda"
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                )}
            </div>
            {searchError && (
                <div className="searchError">
                    {searchError}
                </div>
            )}
            {searchResult && (
                <div className="searchSuccess">
                    Asesor encontrado: {searchResult.username} - {searchResult.nombre} {searchResult.apellido}
                </div>
            )}
        </div>
    );
};

export default SearchAsesores;