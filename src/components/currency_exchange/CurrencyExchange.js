import React, { useState, useEffect } from 'react'
import { Facebook } from 'react-spinners-css'
import './CurrencyExchange.css'
import 'materialize-css/dist/css/materialize.min.css'


export default function CurrencyExchange({ currencyData, isListLoading }) {

	const [currencyFrom, setCurrencyFrom] = useState('INR')
	const [currencyTo, setCurrencyTo] = useState('INR')
	const [exchangeValue, setExchangeValue] = useState(1)
	const [enteredValue, setEnteredValue] = useState(1)
	const [isLoading, setLoading] = useState(true)


	const swapCurrency = () => {
		const temp = currencyFrom;
		setCurrencyFrom(currencyTo);
		setCurrencyTo(temp);
	}

	useEffect(() => {
		setEnteredValue(1)
		setLoading(true);
		let url = `https://${process.env.REACT_APP_CURRENCY_CONVERSION_API_HOST}/convert?from=${currencyFrom}&to=${currencyTo}&amount=${enteredValue}`
		fetch(url, {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": `${process.env.REACT_APP_CURRENCY_CONVERSION_API_HOST}`,
				"x-rapidapi-key": `${process.env.REACT_APP_CURRENCY_CONVERSION_API_KEY}`
			}
		})
			.then(response => response.json())
			.then(response => {
				setExchangeValue(response['result']);
			})
			.catch(err => {
				console.error(err);
			}).finally(() => {
				setLoading(false);
			});

	}, [currencyFrom, currencyTo])

	return (
		<div className='container'>
			<div className='card container'>
				<div className='row'>
					<div className='col s12 l5'>
						<div className='hide-on-med-and-up'>
							<label className='flow-text text' >Converted Currency </label>
							{(isLoading || isListLoading) ? <div className='center loading'><Facebook color='purple' size='5vmax' /></div> :
								<div className='flow-text center black-text'>{exchangeValue * enteredValue}</div>
							}
						</div>
						<label className='flow-text text'>From</label>
						<div className='input-field'>
							<select
								className='browser-default'
								value={currencyFrom}
								onChange={(event) =>
									setCurrencyFrom(event.target.value)
								}
							>
								{Object.keys(currencyData).map((key) =>
									<option
										key={key}
										value={key}>
										{currencyData[key]}
									</option>)}
							</select>
						</div>

						<p className='grey-text flow-text middle-text'>Selected currency: {currencyFrom}</p>
						<label className='flow-text text'>Enter amount</label>
						<input
							className='input-field'
							type='number'
							value={enteredValue}
							placeholder='Enter a number eg: 1'
							onChange={(event) =>
								setEnteredValue(event.target.value)
							}
						/>

					</div>
					<div className='col hide-on-med-and-down center swap'>
						<i className="material-icons btn-floating black-text white small center swap-icon"
							onClick={swapCurrency}
						>
							swap_horiz
						</i>
					</div>
					<div className='col hide-on-large-only center swap'>
						<i className="material-icons btn-floating black-text white small center swap-icon"
							onClick={swapCurrency}
						>
							swap_vert
						</i>
					</div>

					<div className='col s12 l5 right'>
						<label className='flow-text text'>To </label>
						<div className='input-field'>
							<select
								className='browser-default'
								value={currencyTo}
								onChange={(event) => setCurrencyTo(event.target.value)}
							>
								{Object.keys(currencyData).map((key) =>
									<option
										key={key}
										value={key}>
										{currencyData[key]}
									</option>)}							
							</select>
						</div>
						<p className='grey-text middle-label'>Selected currency: {currencyTo}</p>
						<div className='hide-on-small-only'>
							<label className='flow-text text' >Converted Currency </label>
							{(isLoading || isListLoading) ? <div className='center loading'><Facebook color='purple' size='5vmax' /></div> :
								<div className='flow-text center black-text'>{exchangeValue * enteredValue}</div>
							}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}