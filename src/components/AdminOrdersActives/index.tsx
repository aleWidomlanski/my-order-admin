import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { fetchOrderItem} from "../../services/tables";
import {makeDelivered } from "../../services/items"
import { PlateSelected } from "../../interfaces/interfaces";
import styles from './AdminOrdersActives.module.scss'

export const AdminOrdersActives = () => {

    const { orderItem, setOrderItem } = useContext(AdminContext);

    const handleClickDelivered = (orderProduct: PlateSelected) => () => {

		//seteo producto como entregado
	 	makeDelivered(orderProduct.ItemID) 

		//vuelvo a buscar las ordenes que están pedidas pero no entregadas
		fetchOrderItem()
			.then((data) => {
                console.log(data)
				return setOrderItem(data);
			})
			.catch((err) => {
				console.log(err);
                
			});
	}


    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.header}>Ordenes sin entregar</h1>
                {orderItem.length > 0 ?
                    orderItem.map((e) => (
                        <div key={e.ItemID} className={styles.containerOrder}>
                            <h4 className={styles.title}>{e.title}</h4>
                            <h4 className={styles.description}>Cantidad: {e.quantity}</h4>
                            <h4 className={styles.table}>Table: {e.id_table}</h4>
                            <button onClick={handleClickDelivered(e)}>Marcar como entregado.</button>
                        </div>
                    )) :
                    'No hay ordenes pendientes de ninguna mesa en este momento.'}
            </div>
        </>
    )
}
