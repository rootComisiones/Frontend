import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from './Components/Home/Home';
import Administration from './Components/Administration/Administration';
import { UserContext, UserProvider } from './Context/UserContext';
import CrearAsesor from './Components/Administration/Crear/Asesor/CrearAsesor';
import CrearCliente from './Components/Administration/Crear/Cliente/CrearCliente';

import Periodos from './Components/Periodos/Periodos';
import Periodo from './Components/Periodos/Periodo';
import Liquidaciones from './Components/Liquidaciones/Liquidaciones';
import Page404 from './Components/Page404/Page404';
import Liquidacion from "./Components/Liquidaciones/Liquidacion";
import ReporteLiquidaciones from "./Components/ReporteLiquidaciones/ReporteLiquidaciones";
import { useContext, useEffect } from "react";
import getAllAsesores from "./DbFunctions/getAllAsesores";
import getTeams from "./DbFunctions/getTeams";
import getAllClientes from "./DbFunctions/getAllClientes";
import getAllSagencias from "./DbFunctions/getAllSagencias";
import { useNotification } from "./Context/NotificationContext";


const ContextWrapper = ({ children }: { children: JSX.Element }) => {
  const { setAllAsesores, setAllTeams, setAllClientes, setLoaderOn, setAllSagencias } = useContext(UserContext);
  const { showNotification } = useNotification();

  const handleGetData = async () => {
    setLoaderOn(true);
    const asesoresResponse = await getAllAsesores(1, 50, showNotification);
    setAllAsesores(asesoresResponse.asesores || []);
    await getTeams(setAllTeams, showNotification)
    const response = await getAllClientes(1, 50, showNotification);
    const clientes = response?.clients || [];
    setAllClientes(clientes)
    const sagencias = await getAllSagencias(showNotification);
    setAllSagencias(sagencias);
    setLoaderOn(false);
  }

  useEffect(() => {
    handleGetData();
  }, [])

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      console.log('Datos del usuario cargados desde localStorage:', parsedUserData);
    }
  }, []);

  return children;
};

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ContextWrapper>
          <Home />
        </ContextWrapper>
      ),
    },
    {
      path: '/administracion',
      element: (
        <ContextWrapper>
          <Administration />
        </ContextWrapper>
      ),
    },
    {
      path: '/administracion/asesores/crear',
      element: (
        <ContextWrapper>
          <CrearAsesor />
        </ContextWrapper>
      ),
    },
    {
      path: '/administracion/clientes/crear',
      element: (
        <ContextWrapper>
          <CrearCliente />
        </ContextWrapper>
      ),
    },
    {
      path: 'periodos',
      element: (
        <ContextWrapper>
          <Periodos />
        </ContextWrapper>
      ),
    },
    {
      path: 'liquidaciones',
      element: (
        <ContextWrapper>
          <Liquidaciones />
        </ContextWrapper>
      ),
    },
    {
      path: 'reporte-liquidaciones',
      element: (
        <ContextWrapper>
          <ReporteLiquidaciones />
        </ContextWrapper>
      ),
    },
    {
      path: 'periodos/:empresa/:periodo/:fechaId/:tipo_de_archivo/:moneda',
      element: (
        <ContextWrapper>
          <Periodo />
        </ContextWrapper>
      ),
    },
    {
      path: 'liquidaciones/:empresa/:periodoId/:productorId/:rol/:empresaName',
      element: (
        <ContextWrapper>
          <Liquidacion />
        </ContextWrapper>
      ),
    },
    {
      path: '*',
      element: <Page404 />,
    },
  ]);

  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider >
  );
}

export default App;