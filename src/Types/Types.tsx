import { ChangeEvent, Dispatch, FormEvent, MutableRefObject, SetStateAction } from "react";

/* CONTEXT */

export interface UserContextType {
    adminState: string;
    setAdminState: Dispatch<SetStateAction<string>>;
    periodState: {
        name: string,
        id: number
    };
    setPeriodState: Dispatch<SetStateAction<{
        name: string,
        id: number
    }>>;
    liquidationState: {
        name: string,
        id: number
    };
    setLiquidationState: Dispatch<SetStateAction<{
        name: string,
        id: number
    }>>;
    adminUsersState: {
        state: string,
        compañía: string,
    };
    setAdminUsersState: Dispatch<SetStateAction<{
        state: string,
        compañía: string,
    }>>;
    adminComState: {
        compañía: string,
        equipo: string,
        vendedor: string,
    };
    setAdminComState: Dispatch<SetStateAction<{
        compañía: string,
        equipo: string,
        vendedor: string,
    }>>;
    allSagencias: Sagencia[],
    setAllSagencias: Dispatch<SetStateAction<Sagencia[]>>,
    allTeams: Equipo[],
    setAllTeams: Dispatch<SetStateAction<Equipo[]>>,
    handleLoginOn: () => void,
    handleLoginOff: () => void,
    loginModal: boolean,
    setLoginModal: Dispatch<SetStateAction<boolean>>,
    allAsesores: AsesorData[],
    setAllAsesores: Dispatch<SetStateAction<AsesorData[]>>,
    companies: Company[];
    loaderOn: boolean,
    setLoaderOn: Dispatch<SetStateAction<boolean>>,
    allClientes: ClientData[];
    setAllClientes: Dispatch<SetStateAction<ClientData[]>>;
    userData: {
        nombre: string,
        apellido: string,
        username: string,
        email: string,
        id: string,
        role: string,
    };
    setUserData:Dispatch<SetStateAction<{
        nombre: string,
        apellido: string,
        username: string,
        email: string,
        id: string,
        role: string,
    }>>;
    edicion: any;
    setEdicion:any;
    popupData: {
        text: string,
        action: string,
        asesorId: number,
        refreshData?: ()=>void
    };
    setPopupData: Dispatch<SetStateAction<{
        text: string,
        action: string,
        asesorId: number,
        refreshData?: () => void
    }>>;
    dataFetched: boolean;
    setDataFetched: Dispatch<SetStateAction<boolean>>;
    periodos: any;
    setPeriodos: any;
}

interface Company {
    name: string;
    id: number;
}

/* ADMINISTRACION */


export interface ClientData {
    id: number,
    nombre: string,
    apellido: string,
    email: string,
    telefono: string,
    numero_cuenta: string,
    cuit: string,
    fecha_nacimiento: string,
    fecha_vinculacion: string,
    direccion: string,
    equipo_id: number,
    empresaUno: number,
    empresaDos: number,
    manager_id: number,
    coordinador_id: number,
    asesor_id: number,
    username_productor: string,
    nombre_completo_productor: string,
}

export interface FormCrearClienteProps {
    newClient: ClientData;
    setNewClient: React.Dispatch<React.SetStateAction<ClientData>>;
}

export interface AsesorData {
    id: number,
    username: string,
    apellido: string,
    cuit: string,
    email: string,
    fecha_ingreso: string,
    fecha_nacimiento: string,
    inscripto_iva: string,
    interno_externo: string,
    nombre: string,
    rol: string,
    sagencia_id: number,
    comisionEmpresa1: number,
    comisionEmpresa2: number,
    coordinador_id: number,
    manager_id: number,
}

export interface FormCrearAsesorProps {
    newAsesor: AsesorData;
    setNewAsesor: React.Dispatch<React.SetStateAction<AsesorData>>;
}

export interface Sagencia {
    id: number,
    username: string,
    rol?: string;
    contrasena: string,
    email: string,
    nombre_agencia: string,
    porcentaje_neto: number,
}

export interface Equipo {
    id: number,
    username: string,
    apellido: string,
    contrasena: string,
    cuit: string,
    email: string,
    fecha_ingreso: string,
    fecha_nacimiento: string,
    inscripto_iva: string,
    interno_externo: string,
    nombre: string,
}

export interface Coordinador {
    id: number,
    username: string,
    apellido: string,
    contrasena: string,
    cuit: string,
    email: string,
    fecha_ingreso: string,
    fecha_nacimiento: string,
    inscripto_iva: string,
    interno_externo: string,
    nombre: string,
}

export interface FormCrearProps<> {
    label: string;
    type: string;
    name: string;
    errors?: string[];
    value: any;
}

/*HEADER*/

export interface HeaderProps {
    setLoginOn: () => void;
}

export interface NavbarProps {
    setLoginOn: () => void;
    handleResetAdminState: () => void;
    actualLocation: string;
}

/* LOGIN */

export interface LoginModalProps {
    onVisible: boolean;
    closeModal: () => void;
    setOnVisible: any;
}

/* TABLE */

export interface TableProps {
    headers: string[];
    tableData: any;
    empresa: any;
}