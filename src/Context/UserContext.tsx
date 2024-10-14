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
    name: "arpartners",
    id: 1
  });
  const [liquidationState, setLiquidationState] = useState({
    name: "arpartners",
    id: 1
  });
  const [adminState, setAdminState] = useState('Usuarios');
  const [adminComState, setAdminComState] = useState({
    compañía: "arpartners",
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
      name: "AR Partners",
      id: 1
    },
    {
      name: "Grupo IEB",
      id: 3
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
    role: 'root',
  })

  const [loaderOn, setLoaderOn] = useState(false);

  const handleLoginOn = () => {
    setLoginModal(true)
  }

  const handleLoginOff = () => {
    setLoginModal(false)
  }

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
    setEdicion
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};
