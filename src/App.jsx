import { Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { QuizCart } from './components/QuizCart'
import { ResultPage } from './components/ResultPage`'

const App = () => {
	return (
		<div className='app'>
			<Header />
			<Routes>
				<Route path='/' element={<QuizCart />} />
				<Route path='/:pathname' element={<QuizCart />} />
				<Route path='/result' element={<ResultPage />} />
			</Routes>
		</div>
	)
}

export default App
