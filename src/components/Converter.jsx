import React, { useState, useEffect } from 'react';

function Converter() {
  const [usdAmount, setUsdAmount] = useState(1); // Valor en dolares
  const [btcAmount, setBtcAmount] = useState(0); //Valor en btc
  const [btcPrice, setBtcPrice] = useState(null); // Valor btc actual

  // Función para obtener el precio actual de Bitcoin
  useEffect(() => {
    const valueBtc = async () => {
      const resultado = await fetch(
        'https://api.coinbase.com/v2/exchange-rates?currency=BTC'
      );
      const data = await resultado.json();

      const usdToBtcRate = data.data.rates.USD;
      setBtcPrice(1 / usdToBtcRate);
    };
    valueBtc();
  }, []);

  //Funcion para actualizar el BTC segun el valor ingresado al input
  const handleChange = (e) => {
    const value = e.target.value;
    setUsdAmount(value);
    if (btcPrice) {
      setBtcAmount(value * btcPrice);
    }
  };

  return (
    <>
      <div className="card text-center mt-4">
        <div className="card-header">USD a Bitcoin</div>
        <div className="card-body">
          <h5 className="card-title">Conversor USD a Bitcoin</h5>
          <label for="basic-url" className="form-label">
            Monto en USD:
          </label>
          <div className="input-group">
            <input
              type="number"
              value={usdAmount}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <p>Equivalente en Bitcoin: {btcAmount}</p>
          {btcPrice && <p>Precio actual de 1 BTC: ${1 / btcPrice} USD</p>}
        </div>
        <div className="card-footer text-body-secondary">2 days ago</div>
      </div>
    </>
  );
}

export default Converter;
