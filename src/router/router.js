import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Introduction from '../pages/Introduction/Introduction';
import GameWaiting from '../pages/GameWaiting/GameWaiting';
import OwnerPage from '../pages/OwnerPage/OwnerPage';
import GamePage from '../pages/Game/GamePage';
import GameOwnerPage from '../pages/GameOwnerPage/GameOwnerPage';
import GameOwnerListPage from '../pages/GameOwnerListPage/GameOwnerListPage';
import Bankrupt from '../pages/Bankrupt/Bankrupt';

const Router = () => (
	<BrowserRouter>
		<Routes>
			<Route path='/' element={<Introduction />} />
			<Route path='/game-waiting' element={<GameWaiting />} />
			<Route path='/owner-page' element={<OwnerPage />} />			
			<Route path='/game' element={<GamePage />} />
			<Route path='/game-owner-page' element={<GameOwnerPage />} />
			<Route path='/game-owner-list-page' element={<GameOwnerListPage />} />
			<Route path='/bankrupt-page' element={<Bankrupt />} />
		</Routes>
	</BrowserRouter>
)

export default Router;