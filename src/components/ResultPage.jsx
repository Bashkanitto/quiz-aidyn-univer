import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const ResultPage = () => {
	const answers = localStorage.getItem('correctAnswers')
	const [correctAnswers, setCorrectAnswers] = useState(0)
	const navigate = useNavigate()
	useEffect(() => {
		// Получаем количество правильных ответов из localStorage
		const storedCorrectAnswers = answers
		if (storedCorrectAnswers) {
			setCorrectAnswers(parseInt(storedCorrectAnswers, 10))
		} else {
			setCorrectAnswers(0)
		}
	}, [answers])

	const reset = () => {
		localStorage.removeItem('currentQuestion')
		localStorage.removeItem('selectedAnswer')
		localStorage.removeItem('correctAnswers')
	}

	return (
		<div className='result-container'>
			<h1>Результаты теста</h1>
			<p>Вы ответили правильно на {correctAnswers} вопросов.</p>
			<div className='result-buttons'>
				{/* Кнопка для возвращения на главную страницу */}
				<Link to='/' className='retry-button'>
					Пройти тест снова
				</Link>
				{/* Кнопка для выхода или возвращения в другой раздел */}
				<Link onClick={() => navigate(-1)} className='home-button'>
					Назад
				</Link>
				<a onClick={reset} href='#'>
					Сброс
				</a>
			</div>
		</div>
	)
}
