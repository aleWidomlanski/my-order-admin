import axios from 'axios';
import { TableRestaurant } from "../interfaces/interfaces";


async function fetchTables() {
	try {
		const response = await axios.get(`https://18eqrnlodc.execute-api.us-east-1.amazonaws.com/dev/tables`);
		return response.data;
	} catch (err) {
		console.log(err);
	}
}

async function fetchTablesActive() {
	try {
		const response = await axios.get(`https://18eqrnlodc.execute-api.us-east-1.amazonaws.com/dev/tables?active`);
		return response.data;
	} catch (err) {
		console.log(err);
	}
}

async function fetchTablesActiveCall() {
	try {
		const response = await axios.get(`https://18eqrnlodc.execute-api.us-east-1.amazonaws.com/dev/tables?activeCall `);
		return response.data;
	} catch (err) {
		console.log(err);
	}
}

async function fetchTable(tableNumber: string | null) {
	try {
		const response = await axios.get(`https://18eqrnlodc.execute-api.us-east-1.amazonaws.com/dev/tables/${tableNumber}?searchTable`);
		const data: TableRestaurant[] = response.data;
		return data[0]
	} catch (err) {
		console.log(err);
	}
}

async function fetchOrderItem() {
	try {
		const response = await axios.get(`https://18eqrnlodc.execute-api.us-east-1.amazonaws.com/dev/tables?itemPeopleInTableJoin`);
        return response.data;

	} catch (err) {
		console.log(err);
	}
}

export {
	fetchTables,
	fetchTablesActive,
	fetchTablesActiveCall,
	fetchTable,
    fetchOrderItem
};