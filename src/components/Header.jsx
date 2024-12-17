export const Header = () => {
	return (
		<header className='header'>
			<nav>
				<ul className='menu'>
					<a href='/algorithm'>Алгоритм</a>
					<a href='/injenery'>Инженерия</a>
					<a href='/architecture'>Архитектура</a>
					<a
						style={{
							background: '#EAF6F4',
							color: 'black',
							padding: '5px',
							border: 'none',
							borderRadius: '5px',
						}}
						href='/result'
					>
						Результат
					</a>
				</ul>
			</nav>
		</header>
	)
}
