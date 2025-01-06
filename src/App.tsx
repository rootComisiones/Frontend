import { RouterProvider, createBrowserRouter } from "react-router-dom";

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
import { useContext, useEffect } from "react";
import getAllAsesores from "./DbFunctions/getAllAsesores";
import getTeams from "./DbFunctions/getTeams";
import getAllClientes from "./DbFunctions/getAllClientes";


const ContextWrapper = ({ children }: { children: JSX.Element }) => {
  const { setUserData, setLoaderOn, setAllAsesores, setAllTeams, setAllClientes, setDataFetched, dataFetched } = useContext(UserContext);

  const handleGetData = async () => {
    if (!dataFetched) {
      setLoaderOn(true);
      await getAllAsesores(setAllAsesores)
      await getTeams(setAllTeams)
      const clientes = await getAllClientes()
      setAllClientes(clientes)
      setDataFetched(true)
      setLoaderOn(false)
    }
  }
  
  useEffect(() => {
    handleGetData()
  }, [])

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
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
      path: 'periodos/:empresa/:periodo/:fechaId/:tipo_de_archivo',
      element: (
        <ContextWrapper>
          <Periodo />
        </ContextWrapper>
      ),
    },
    {
      path: 'liquidaciones/:empresa/:periodoId/:productorId/:rol',
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