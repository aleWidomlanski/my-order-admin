"use client"; 
import { useContext, useEffect } from 'react';
import { AdminOrdersActives, AdminTablesActives/* , MainLoading  */} from '../../components/index';
import { AdminContext, /* OrderContext  */} from '../../context/AdminContext';
import { fetchOrderItem, fetchTablesActive } from '../../services/admin';



const AdminPage = () => {
	
/* 	const { loadingOrder, setLoadingOrder } = useContext(OrderContext); */

	const { setTablesRestaurantActives, setOrderItem } = useContext(AdminContext);


	//la primera vez ejecuto este codigo
	useEffect(() => {
		//seteo el loading en false   
		/* setLoadingOrder(false) */
		//Busco las mesas activas
		fetchTablesActive()
			.then((data) => {
				setTablesRestaurantActives(data);
			})
			.catch((e) => {
				console.log(e);
			});

		//Busco todas las ordenes que no esten entregadas	
		fetchOrderItem().then((data) => {
			setOrderItem(data);
		})
			.catch((e) => {
				console.log(e);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])


	//cada 30 segundos ejecuto este codigo
	setTimeout(() => {
		//Busco las mesas activas
		fetchTablesActive()
			.then((data) => {
				console.log(data)
				setTablesRestaurantActives(data);
			})
			.catch((e) => {
				console.log(e);
			});

		//Busco todas las ordenes que no esten entregadas	
		fetchOrderItem().then((data) => {
			console.log(data)
			setOrderItem(data);
		})
			.catch((e) => {
				console.log(e);
			});
	}, 60000);





	return (
		<>
		{/* 	{loadingOrder ? (
				<div className={styles.mainContainerLoading}>
					<MainLoading />
				</div>
			) : (
				<> */}
					<AdminOrdersActives />
					<AdminTablesActives />
			{/* 	</>
			)} */}
		</>
	);
};

export default AdminPage;