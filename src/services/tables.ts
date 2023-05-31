import axios from 'axios';
import { TableRestaurant } from '../interfaces';


async function fetchTable(tableID: string | null) {
	try {
		const response = await axios.get(`https://18eqrnlodc.execute-api.us-east-1.amazonaws.com/dev/tables?searchTable=${tableID}`);
		const data: TableRestaurant[] = response.data;
		return data[0]
	} catch (err) {
		console.log(err);
	}
}


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

async function updateTableNumberDesactive(tableID: string) {
	try {
		const response = await axios.put(
			/*or get*/ `https://18eqrnlodc.execute-api.us-east-1.amazonaws.com/dev/tables/?desactivate=${tableID}`
		);
		return response.data;
	} catch (err) {
		console.log(err);
	}
}

async function updateTableNumberCall(tableID: string) {
	try {
		const response = await axios.put(
			/*or get*/ `https://18eqrnlodc.execute-api.us-east-1.amazonaws.com/dev/tables/?call=${tableID}`
		);
		return response.data;
	} catch (err) {
		console.log(err);
	}
}

async function updateTableNumberNotCall(tableID: string) {
	try {
		const response = await axios.put(
			/*or get*/ `https://18eqrnlodc.execute-api.us-east-1.amazonaws.com/dev/tables/?notCall=${tableID}`
		);
		return response.data;
	} catch (err) {
		console.log(err);
	}
}


async function updateTableNumberActive(tableID: string | null) {
	try {
		const response = await axios.put(
			/*or get*/ `https://18eqrnlodc.execute-api.us-east-1.amazonaws.com/dev/tables/?activate=${tableID}`
		);
		return response.data;
	} catch (err) {
		console.log(err);
	}
}


async function peopleInTableFetch(tableID: string | null) {
	try {
		const response = await axios.get(`https://18eqrnlodc.execute-api.us-east-1.amazonaws.com/dev/tables/?peopleInTableSearch=${tableID}`);
		return response.data;
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

async function peopleInTable(idPeopleInTable: string, tableId: string | null) {
	try {
		const response = await axios.post(`https://18eqrnlodc.execute-api.us-east-1.amazonaws.com/dev/tables/${idPeopleInTable}/${tableId}?peopleInTable`);
		return response.data;
	} catch (err) {
		console.log(err);
	}
}


async function itemPeopleInTable(idItemPeopleInTable: string, idPeopleInTable: string, quantity: number, idItem: string) {
	try {
		const response = await axios.post(`https://18eqrnlodc.execute-api.us-east-1.amazonaws.com/dev/tables/${idItemPeopleInTable}/${idPeopleInTable}/${quantity}/${idItem}?itemPeopleInTable`);
		return response;
	} catch (err) {
		console.log(err);
	}
}



export {
	fetchTables,
	fetchTablesActive,
	fetchTablesActiveCall,
	fetchTable,
	fetchOrderItem,
	updateTableNumberActive,
	updateTableNumberDesactive,
	updateTableNumberCall,
	updateTableNumberNotCall,
	peopleInTableFetch,
	peopleInTable,
	itemPeopleInTable,
};
