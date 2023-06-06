import { useContext } from "react";
import { AdminContext, /* SearchContext */ } from "../../context/AdminContext";
import styles from './AdminTablesActives.module.scss'
/* import {  updateTableNumberDesactive} from "../../services/admin"; */
/* import { ModalInfo } from "../ModalInfo"; */

export const AdminTablesActives = () => {

/*   const { modalInfo, setModalInfo } = useContext(SearchContext); */

  const { tablesRestaurantActives } = useContext(AdminContext);

  /* const numberTable = JSON.parse(localStorage.getItem('table') as any) */

  const handleDesactivate = () => {
   /*  updateTableNumberDesactive(numberTable);
    setModalInfo({
      state: true,
      description: `La mesa ${numberTable} ha sido desactivada`,
      section: 'admin',
    }); */
  };
  

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.header}>Mesas Activas</h1>
        {tablesRestaurantActives.length > 0 ?
          tablesRestaurantActives.map((table) => (
            <div key={table.table_number} className={styles.containerTable}>
              <h4 className={styles.numberTable}>Mesa: {table.table_number}</h4>
              {table.table_call === '1' && <button>Cancelar llamado</button>}
              <button onClick={handleDesactivate}>Desactivar mesa</button>
            </div>
          )) :
          'No hay llamadas de ninguna mesa en este momento.'}
      </div>
   {/*    {modalInfo.section === 'admin' && <ModalInfo />} */}
    </>
  )
}