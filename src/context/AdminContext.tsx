import { createContext } from 'react';
import { TableRestaurant, PlateSelected } from "../interfaces/interfaces";


interface ContextProps {
	tablesRestaurantActives: TableRestaurant[];
	setTablesRestaurantActives: (description: TableRestaurant[]) => void;
/* 	tablesCallRestaurant: TableRestaurant[];
	setTablesCallRestaurant: (description: TableRestaurant[]) => void; */
	orderItem: PlateSelected [];
	setOrderItem: (description: PlateSelected[]) => void;
}

export const AdminContext = createContext({} as ContextProps);