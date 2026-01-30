import React, { FC, createContext, useState, useEffect } from "react";
import { AsesorData, ClientData, Equipo, Sagencia, UserContextType } from "../Types/Types";

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [adminUsersState, setAdminUsersState] = useState({
    state: "Usuario",
    compañía: "none"
  });
  const [periodState, setPeriodState] = useState({
    name: "grupoieb",
    id: 2
  });
  const [liquidationState, setLiquidationState] = useState({
    name: "grupoieb",
    id: 2
  });
  const [adminState, setAdminState] = useState('Usuarios');
  const [adminComState, setAdminComState] = useState({
    compañía: "grupoieb",
    equipo: "",
    vendedor: "manager",
  })

  const [allSagencias, setAllSagencias] = useState<Sagencia[]>([])
  const [allTeams, setAllTeams] = useState<Equipo[]>([])
  const [allClientes, setAllClientes] = useState<ClientData[]>([])
  const [loginModal, setLoginModal] = useState(false);
  const [allAsesores, setAllAsesores] = useState<AsesorData[]>([])
  const [edicion, setEdicion] = useState<any>(null)

  const companies = [
    {
      name: "Grupo IEB",
      id: 2
    },
    {
      name: "Inviu",
      id: 1
    }
  ];

  // Persistencia de userData en localStorage
  const defaultUserData = {
    nombre: '',
    apellido: '',
    username: '',
    email: '',
    id: '',
    role: '',
  };

  const [userData, setUserData] = useState(() => {
    const stored = localStorage.getItem('userData');
    if (!stored) return defaultUserData;

    try {
      const parsed = JSON.parse(stored);
      // Validar que tenga la estructura esperada
      if (typeof parsed === 'object' && parsed !== null && 'id' in parsed) {
        return parsed;
      }
      return defaultUserData;
    } catch {
      return defaultUserData;
    }
  });

  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(userData));
  }, [userData]);

  const [loaderOn, setLoaderOn] = useState(false);

  const handleLoginOn = () => {
    setLoginModal(true)
  }

  const handleLoginOff = () => {
    setLoginModal(false)
  }

  const [popupData, setPopupData] = useState({
    text: '',
    action: '',
    asesorId: 0
  });

  const [dataFetched, setDataFetched] = useState(false);

  const [periodos, setPeriodos] = useState<unknown[]>([]);

  const contextValue: UserContextType = {
    adminState,
    setAdminState,
    periodState,
    setPeriodState,
    liquidationState,
    setLiquidationState,
    adminUsersState,
    setAdminUsersState,
    adminComState,
    setAdminComState,
    setAllSagencias,
    allSagencias,
    setAllTeams,
    allTeams,
    handleLoginOff,
    handleLoginOn,
    loginModal,
    setLoginModal,
    allAsesores,
    setAllAsesores,
    companies,
    loaderOn,
    setLoaderOn,
    allClientes,
    setAllClientes,
    userData,
    setUserData,
    edicion,
    setEdicion,
    popupData,
    setPopupData, 
    dataFetched,
    setDataFetched,
    periodos,
    setPeriodos
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};