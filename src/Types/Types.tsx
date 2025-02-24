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
    name: string,
    id: number
}

/* ADMINISTRACION */


export interface ClientData {
    nombre: string;
    apellido: string;
    tipo_persona: string;
    cuit: string;
    fecha_inicio_actividades: string;
    direccion: string;
    codigo_postal: string;
    provincia: string;
    localidad: string;
    telefono: string;
    email: string;
    asesor: string;
    observacion: string;
    companias: { compania: string; numero_cuenta: string; }[];
}

export interface FormCrearClienteProps {
    newClient: ClientData;
    setNewClient: React.Dispatch<React.SetStateAction<ClientData>>,
}

export interface AsesorData {
    username: string;
    apellido: string;
    nombre: string;
    fecha_nacimiento: string;
    fecha_ingreso: string;
    inscripto_iva: boolean;
    cuit: string;
    email: string;
    interno_externo: string;
    contrasena: string;
    rol: string;
    manager_id: number,
    coordinador_id?: number,
    v_manager_manager?: number,
    v_manager_coordinador?: number,
    v_manager_asesor?: number,
    v_coordinador_coordinador?: number,
    v_coordinador_manager?: number,
    v_coordinador_asesor?: number,
    v_asesor_manager?: number,
    v_asesor_coordinador?: number,
    v_asesor_asesor?: number,
    v_asesor_sc_manager?: number,
    v_asesor_sc_asesor?: number,
    id?: string,
}

export interface FormCrearAsesorProps {
    newAsesor: AsesorData;
    setNewAsesor: React.Dispatch<React.SetStateAction<AsesorData>>;
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




