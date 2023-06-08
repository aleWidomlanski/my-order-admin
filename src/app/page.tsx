import AdminPage from '@/components/AdminPage';
import { AdminProvider } from '@/context/AdminProvider';

/* import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig) 
 */
const HomePage = () => {
	return (
		<AdminProvider>
			<AdminPage/>
		</AdminProvider>
					
	);
};

export default HomePage;