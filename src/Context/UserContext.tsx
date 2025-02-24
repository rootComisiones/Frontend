import React, { FC, createContext, useState } from "react";
import { AsesorData, ClientData, Equipo, UserContextType } from "../Types/Types";


interface UserProviderProps {
  children: React.ReactNode;
}

export const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [adminUsersState, setAdminUsersState] = useState({
    state: "Asesor",
    compañía: "none"
  });
  const [periodState, setPeriodState] = useState({
    name: "grupoieb",
    id: 1
  });
  const [liquidationState, setLiquidationState] = useState({
    name: "grupoieb",
    id: 1
  });
  const [adminState, setAdminState] = useState('Usuarios');
  const [adminComState, setAdminComState] = useState({
    compañía: "grupoieb",
    equipo: "",
    vendedor: "manager",
  })

  const [allTeams, setAllTeams] = useState<Equipo[]>([])
  const [allClientes, setAllClientes] = useState<ClientData[]>([])

  const [loginModal, setLoginModal] = useState(false);

  const [allAsesores, setAllAsesores] = useState<AsesorData[]>([])

  const [edicion, setEdicion] = useState<any>(null)

  const companies = [
    {
      name: "Grupo IEB",
      id: 1
    },
    {
      name: "Inviu",
      id: 2
    }
  ];

  const [userData, setUserData] = useState({
    nombre: '',
    apellido: '',
    username: '',
    email: '',
    id: '',
    role: '',
  })

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

  const [periodos, setPeriodos] = useState([]);

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
