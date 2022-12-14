import ApartmentTwoToneIcon from '@mui/icons-material/ApartmentTwoTone';
import BedTwoToneIcon from '@mui/icons-material/BedTwoTone';
import DesignServicesTwoToneIcon from '@mui/icons-material/DesignServicesTwoTone';
import FastfoodTwoToneIcon from '@mui/icons-material/FastfoodTwoTone';
import HotelTwoToneIcon from '@mui/icons-material/HotelTwoTone';
import LocationCityIcon from '@mui/icons-material/LocationCityTwoTone';
import PersonTwoToneIcon from '@mui/icons-material/PersonTwoTone';
import CleaningServicesTwoToneIcon from '@mui/icons-material/CleaningServicesTwoTone';
import { ReactNode } from 'react';

export interface MenuItem {
  link?: string;
  icon?: ReactNode;
  badge?: string;
  items?: MenuItem[];
  name: string;
}

export interface MenuItems {
  items: MenuItem[];
  heading: string;
}

const menuItems: MenuItems[] = [
  {
    heading: '',
    items: [
      {
        name: 'Início',
        link: '/home',
        icon: DesignServicesTwoToneIcon,
      },
    ],
  },
  {
    heading: 'Gerenciamento',
    items: [
      {
        name: 'Hotéis',
        icon: LocationCityIcon,
        link: '/hotels',
      },
      {
        name: 'Tipos de Apartamentos',
        icon: ApartmentTwoToneIcon,
        link: '/apartments/type',
      },
      {
        name: 'Apartamentos',
        icon: ApartmentTwoToneIcon,
        link: '/apartments',
      },
      {
        name: 'Clientes',
        icon: PersonTwoToneIcon,
        link: '/clients',
      },
      {
        name: 'Hospede',
        icon: PersonTwoToneIcon,
        link: '/hospedes',
      },
      {
        name: 'Reservas',
        icon: BedTwoToneIcon,
        link: '/reservations',
      },
      {
        name: 'Hospedagem',
        icon: HotelTwoToneIcon,
        link: '/accommodations',
      },
      {
        name: 'Consumos',
        icon: FastfoodTwoToneIcon,
        link: '/expenditures',
      },
      {
        name: 'Consumos Restaurante',
        icon: FastfoodTwoToneIcon,
        link: '/restaurantexpenditures',
      },
      {
        name: 'Faxinas',
        icon: CleaningServicesTwoToneIcon,
        link: '/cleanings',
      },
    ],
  },
];

export default menuItems;
