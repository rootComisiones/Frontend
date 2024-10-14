import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from './Components/Home/Home';
import Administration from './Components/Administration/Administration';
import { UserContext, UserProvider } from './Context/UserContext';
import CrearAsesor from './Components/Administration/Crear/Asesor/CrearAsesor';
import CrearCliente from './Components/Administration/Crear/Cliente/CrearCliente';
import { action as crearCliente } from './Components/Administration/Crear/Cliente/FormCrearCliente';

import Periodos from './Components/Periodos/Periodos';
import Periodo from './Components/Periodos/Periodo';
import Liquidaciones from './Components/Liquidaciones/Liquidaciones';
import Page404 from './Components/Page404/Page404';
import Liquidacion from "./Components/Liquidaciones/Liquidacion";


function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/administracion',
      element: <Administration />,
    },
    {
      path: '/administracion/asesores/crear',
      element: <CrearAsesor />,
    }, {
      path: '/administracion/clientes/crear',
      element: <CrearCliente />,
      action: crearCliente,
    }, {
      path: 'periodos',
      element: <Periodos />
    }, {
      path: 'liquidaciones',
      element: <Liquidaciones />
    }, {
      path: 'periodos/:empresa/:periodo/:fechaId/:tipo_de_archivo',
      element: <Periodo />
    }, {
      path: 'liquidaciones/:empresa/:periodoId/:productorId/:rol',
      element: <Liquidacion />
    },
    {
      path: '*',
      element: <Page404 />
    },
  ])

  return (
    <UserProvider>
      {/* {
        isLoading && (
          <Loader />
        )
      } */}
      <RouterProvider router={router} />
    </UserProvider >
  );
}

export default App;