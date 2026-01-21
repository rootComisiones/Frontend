import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import getClientByAccount from '../../../DbFunctions/getClientByAccount';
import './SearchClients.css';

interface SearchClientsProps {
    onClientFound: (cliente: any[]) => void;
    onClearSearch: () => void;
    setLoaderOn: (loading: boolean) => void;
}

const SearchClients: React.FC<SearchClientsProps> = ({ onClientFound, onClearSearch, setLoaderOn }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [searchResult, setSearchResult] = useState<any>(null);
    const [searchError, setSearchError] = useState<string>('');

    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            setSearchError('Ingrese un número de cuenta para buscar');
            return;
        }
        setIsSearching(true);
        setLoaderOn(true);
        setSearchError('');
        try {
            const result = await getClientByAccount(searchTerm.trim());
            if (result?.error || !result?.cliente) {
                setSearchResult(null);
                setSearchError(result.error || 'Cliente no encontrado');
                onClientFound([]);
            } else {
                setSearchResult(result.cliente);
                onClientFound([result.cliente]);
                setSearchError('');
            }
        } catch (error) {
            setSearchError('Error al buscar cliente');
            setSearchResult(null);
            onClientFound([]);
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

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="searchContainer">
            <div className="searchInputContainer">
                <input
                    type="text"
                    placeholder="Buscar por número de cuenta..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
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
                    Cliente encontrado: {searchResult.nombre} {searchResult.apellido} - {searchResult.cuenta}
                </div>
            )}
        </div>
    );
};

export default SearchClients;