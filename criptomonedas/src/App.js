import React, {useEffect, useState} from 'react';
import imagen from './cryptomonedas.png'
import Formulario from './Componentes/Formulario'
import Cotizacion from './Componentes/Cotizacion'
import axios from 'axios'
import Spinner from './Componentes/Spinner/Spinner'



function App() {

  const [monedaConsulta, guardarMonedaConsulta] = useState('')
  const [criptomonedaElegidaConsulta, guardarCriptomonedaElegidaConsulta] = useState('')
  const [cargando, guardarCargando] = useState(false)
  const [resultadoDefinitivo, guardarResultadoDefinitivo] = useState({})

  useEffect(() => {
    const consultarPrecios = async () => {
      if (monedaConsulta === '') return null
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${monedaConsulta}&tsyms=${criptomonedaElegidaConsulta}`
      const resultado = await axios.get(url)
      guardarCargando(true)
      console.log(resultado);
      setTimeout(() =>{
        guardarCargando(false)
        guardarResultadoDefinitivo(resultado.data.DISPLAY[monedaConsulta][criptomonedaElegidaConsulta])
      },3000)
    }

    consultarPrecios()
    
    
  }, [monedaConsulta, criptomonedaElegidaConsulta])
  console.log(resultadoDefinitivo);

  const componente = (cargando)?<Spinner/>:<Cotizacion resultadoDefinitivo={resultadoDefinitivo}/>


  return (
    <div className="container">
      <div className='row'>
        <div className='one-half column'>
          <img 
            src={imagen} 
            alt='logo criptomonedas'
            className='logotipo' 
          />
        </div>
        <div className='one-half column'>
          <h1>Cotiza Criptomoneda al Instante</h1>
          <Formulario 
            guardarMonedaConsulta = {guardarMonedaConsulta}
            guardarCriptomonedaElegidaConsulta = {guardarCriptomonedaElegidaConsulta}
          />
          {componente}
        </div>
      </div>
    </div>
  );
}

export default App;
