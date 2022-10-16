import React, {useState, useEffect} from 'react'
import './app.css'
import Header from './components/header/Header'
import CurrencyExchange from './components/currency_exchange/CurrencyExchange'

export default function App() {

  const [currencyData, setCurrencyData] = useState({});
  const [isListLoading, setIsListLoading] = useState(true)

  useEffect( () => {
    setIsListLoading(true);
    let url = `https://${process.env.REACT_APP_CURRENCY_CONVERSION_API_HOST}/symbols`
    fetch(url, {
          "method": "GET",
          "headers": {
            "x-rapidapi-host": `${process.env.REACT_APP_CURRENCY_CONVERSION_API_HOST}`,
            "x-rapidapi-key": `${process.env.REACT_APP_CURRENCY_CONVERSION_API_KEY}`
          }
        })
        .then(response => response.json())
        .then(response => {
          setCurrencyData(response['symbols']);
          setIsListLoading(false)
        })
        .catch(err => {
          console.error(err);
        }
    );

  },[])

  return (
    <div className='main-container'>
      <Header />
      <CurrencyExchange currencyData={currencyData} isListLoading={isListLoading}/>
    </div>
  )
}