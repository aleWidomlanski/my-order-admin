import AdminPage from '@/components/AdminPage';
import { AdminProvider } from '@/context/AdminProvider';


const HomePage = () => {
	return (
		<AdminProvider>
			<AdminPage/>
		</AdminProvider>
					
	);
};

export default HomePage;