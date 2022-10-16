import React from 'react'
import './Header.css'
import 'materialize-css/dist/css/materialize.min.css'

export default function Header() {
	return(
		<nav className='custom'>
			<div className='custom nav-wrapper white'>
				<div className='center'>
					<span className='text flow-text'>CURRENCY CONVERTOR</span>
				</div>
			</div>
		</nav>
	)
}