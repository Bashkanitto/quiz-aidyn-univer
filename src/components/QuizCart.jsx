import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { algorithmData } from './Algorithm'
import { architectureData } from './Architecture'
import { injeneryData } from './Injenery'

export const QuizCart = () => {
	const { pathname } = useParams()
	const navigate = useNavigate() // Хук для навигации
	let quizData = algorithmData
	let title = 'Алгоритм'

	switch (pathname) {
		case 'injenery':
			quizData = injeneryData
			title = 'Инженерия'
			break
		case 'architecture':
			quizData = architectureData
			title = 'Архитектура'
			break
		case 'algorithm':
			quizData = algorithmData
			title = 'Алгоритм' // Исправление названия
			break
		default:
			quizData = algorithmData
	}

	const [currentQuestion, setCurrentQuestion] = useState(() => {
		const savedQuestion = localStorage.getItem('currentQuestion')
		return savedQuestion ? parseInt(savedQuestion, 10) : 0
	})
	const [selectedAnswer, setSelectedAnswer] = useState(() => {
		const savedAnswer = localStorage.getItem('selectedAnswer')
		return savedAnswer || ''
	})
	const [showAnswers, setShowAnswers] = useState(false)
	const [shuffledOptions, setShuffledOptions] = useState([])
	const [correctAnswers, setCorrectAnswers] = useState(() => {
		const savedCorrectAnswers = localStorage.getItem('correctAnswers')
		return savedCorrectAnswers ? parseInt(savedCorrectAnswers, 10) : 0
	})

	// Shuffle the options for each question
	const shuffleOptions = options => {
		return options.sort(() => Math.random() - 0.5)
	}

	useEffect(() => {
		const { a, b, c, d, e } = quizData[currentQuestion]
		const options = [
			{ key: 'a', value: a },
			{ key: 'b', value: b },
			{ key: 'c', value: c },
			{ key: 'd', value: d },
			{ key: 'e', value: e },
		]

		// Shuffle options only when the question changes
		setShuffledOptions(shuffleOptions(options))
	}, [currentQuestion, quizData])

	useEffect(() => {
		localStorage.setItem('currentQuestion', currentQuestion.toString())
		localStorage.setItem('selectedAnswer', selectedAnswer)
		localStorage.setItem('correctAnswers', correctAnswers.toString())
	}, [currentQuestion, selectedAnswer, correctAnswers])

	// Handle answer selection
	const handleAnswerClick = option => {
		setSelectedAnswer(option)
		setShowAnswers(true)

		// Check if the selected answer is correct and store it in localStorage
		const { correct } = quizData[currentQuestion]
		if (option === correct) {
			setCorrectAnswers(prev => prev + 1)
		}
	}

	// Handle next question
	const handleNextQuestion = () => {
		setShowAnswers(false)
		setSelectedAnswer('')
		if (currentQuestion < quizData.length - 1) {
			setCurrentQuestion(currentQuestion + 1)
		} else {
			// Завершаем тест и перенаправляем на страницу с результатами
			alert(
				`Тест аяқталды! Вы ответили правильно на ${correctAnswers} вопросов.`
			)
			localStorage.removeItem('currentQuestion')
			localStorage.removeItem('selectedAnswer')
			localStorage.removeItem('correctAnswers')

			// Перенаправляем на страницу с результатами
			navigate('/result')
		}
	}

	// Reset function to clear all data
	const reset = () => {
		setCurrentQuestion(0)
		setSelectedAnswer('')
		setShowAnswers(false)
		setCorrectAnswers(0)
		localStorage.removeItem('currentQuestion')
		localStorage.removeItem('selectedAnswer')
		localStorage.removeItem('correctAnswers')
	}

	const { question, correct } = quizData[currentQuestion]

	return (
		<div className='container'>
			<h1>{title}</h1>
			<p className='breadcrumbs'>
				Вопрос {currentQuestion + 1} из {quizData.length}
			</p>
			<h2 className='question'>{question}</h2>
			<div className='options'>
				{shuffledOptions.map(({ key, value }) => (
					<button
						key={key}
						className={`option 
              ${showAnswers && key === correct ? 'correct' : ''} 
              ${
								showAnswers && selectedAnswer === key && key !== correct
									? 'incorrect'
									: ''
							}`}
						onClick={() => handleAnswerClick(key)}
					>
						{value}
					</button>
				))}
			</div>
			<div className='controlButtons'>
				<button
					className='nextButton'
					onClick={handleNextQuestion}
					disabled={!selectedAnswer}
				>
					Следующее
				</button>
				<a onClick={reset} href='#'>
					Сброс
				</a>
			</div>
		</div>
	)
}
