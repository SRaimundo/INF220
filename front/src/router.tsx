import { lazy, Suspense } from 'react';
import { PartialRouteObject } from 'react-router';
import { Navigate } from 'react-router-dom';
import SuspenseLoader from 'src/components/SuspenseLoader';
import BaseLayout from 'src/layouts/BaseLayout';
import SidebarLayout from 'src/layouts/SidebarLayout';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Dashboards

const Home = Loader(lazy(() => import('src/content/dashboards/Home')));

// Applications
// SECTION INF 220
// SECTION Hotel
const Hotels = Loader(lazy(() => import('src/content/applications/Hotels')));
const CreateHotel = Loader(
  lazy(() => import('src/content/applications/Hotels/create'))
);
// SECTION Tipo de Apartamento
const ApartmentTypes = Loader(
  lazy(() => import('src/content/applications/ApartmentTypes'))
);
const CreateApartmentTypes = Loader(
  lazy(() => import('src/content/applications/ApartmentTypes/create'))
);
// SECTION Clientes
const Clients = Loader(lazy(() => import('src/content/applications/Clients')));
const CreateClient = Loader(
  lazy(() => import('src/content/applications/Clients/create'))
);
// SECTION Reservas
const Reservations = Loader(
  lazy(() => import('src/content/applications/Reservations'))
);
const CreateReservation = Loader(
  lazy(() => import('src/content/applications/Reservations/create'))
);
// SECTION Apartamentos
const Apartments = Loader(
  lazy(() => import('src/content/applications/Apartments'))
);
const CreateApartments = Loader(
  lazy(() => import('src/content/applications/Apartments/create'))
);
// SECTION Hospedagens
const Accommodations = Loader(
  lazy(() => import('src/content/applications/Accommodations'))
);
const CreateAccommodation = Loader(
  lazy(() => import('src/content/applications/Accommodations/create'))
);
// SECTION Consumos
const Expenditures = Loader(
  lazy(() => import('src/content/applications/Expenditures'))
);
const CreateExpenditure = Loader(
  lazy(() => import('src/content/applications/Expenditures/create'))
);
// SECTION ConsumosResturante
const RestaurantExpenditures = Loader(
  lazy(() => import('src/content/applications/RestaurantExpenditures'))
);
const RestaurantCreateExpenditure = Loader(
  lazy(() => import('src/content/applications/RestaurantExpenditures/create'))
);
// SECTION Checkout
const Checkout = Loader(
  lazy(() => import('src/content/applications/Checkout'))
);
// SECTION Hotel
const Cleanings = Loader(
  lazy(() => import('src/content/applications/Cleanings'))
);
const CreateCleaning = Loader(
  lazy(() => import('src/content/applications/Cleanings/create'))
);

// Status
const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);
const Status500 = Loader(
  lazy(() => import('src/content/pages/Status/Status500'))
);
const StatusComingSoon = Loader(
  lazy(() => import('src/content/pages/Status/ComingSoon'))
);
const StatusMaintenance = Loader(
  lazy(() => import('src/content/pages/Status/Maintenance'))
);
const routes: PartialRouteObject[] = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/home" replace />,
      },
      {
        path: 'status',
        children: [
          {
            path: '/',
            element: <Navigate to="404" replace />,
          },
          {
            path: '404',
            element: <Status404 />,
          },
          {
            path: '500',
            element: <Status500 />,
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />,
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />,
          },
        ],
      },
      {
        path: '*',
        element: <Status404 />,
      },
    ],
  },
  {
    path: 'home',
    element: <SidebarLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
  {
    path: '',
    element: <SidebarLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/" replace />,
      },
      {
        path: 'hotels',
        children: [
          {
            path: '/',
            element: <Hotels />,
          },
          {
            path: 'new',
            element: <CreateHotel />,
          },
        ],
      },
      {
        path: 'apartments',
        children: [
          {
            path: '/',
            element: <Apartments />,
          },
          {
            path: 'new',
            element: <CreateApartments />,
          },
          {
            path: 'type',
            children: [
              {
                path: '/',
                element: <ApartmentTypes />,
              },
              {
                path: 'new',
                element: <CreateApartmentTypes />,
              },
            ],
          },
        ],
      },
      {
        path: 'clients',
        children: [
          {
            path: '/',
            element: <Clients />,
          },
          {
            path: 'new',
            element: <CreateClient />,
          },
        ],
      },
      {
        path: 'reservations',
        children: [
          {
            path: '/',
            element: <Reservations />,
          },
          {
            path: 'new',
            element: <CreateReservation />,
          },
        ],
      },
      {
        path: 'accommodations',
        children: [
          {
            path: '/',
            element: <Accommodations />,
          },
          {
            path: 'new',
            element: <CreateAccommodation />,
          },
        ],
      },
      {
        path: 'expenditures',
        children: [
          {
            path: '/',
            element: <Expenditures />,
          },
          {
            path: 'new',
            element: <CreateExpenditure />,
          },
        ],
      },
      {
        path: 'restaurantexpenditures',
        children: [
          {
            path: '/',
            element: <RestaurantExpenditures />,
          },
          {
            path: 'new',
            element: <RestaurantCreateExpenditure />,
          },
        ],
      },
      {
        path: 'checkout/:id',
        children: [
          {
            path: '/',
            element: <Checkout />,
          },
        ],
      },
      {
        path: 'cleanings',
        children: [
          {
            path: '/',
            element: <Cleanings />,
          },
          {
            path: 'new',
            element: <CreateCleaning />,
          },
        ],
      },
    ],
  },
];

export default routes;
