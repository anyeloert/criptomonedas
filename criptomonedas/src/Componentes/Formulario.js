import React, {useEffect, useState} from 'react';
import axios from 'axios'
import Criptomoneda from './Criptomoneda'
import Error from './Error'


const Formulario = ({guardarMonedaConsulta, guardarCriptomonedaElegidaConsulta}) => {

    const [infoCriptos, guardarInfoCriptos] = useState([])
    const [moneda, guardarMoneda] = useState('')
    const [criptomonedaElegida, guardarCriptomonedaElegida] = useState('')
    const [error, guardarError] = useState(false)



    useEffect(() => {
    const llamadaApi = async () => {
        const url = 'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD'
        const resultado = await axios.get(url)
        guardarInfoCriptos(resultado.data.Data)
    }

    llamadaApi()
    }, [])

    const handleSubmit = e => {
        e.preventDefault()
        if(moneda === '' || criptomonedaElegida === '') {
            guardarError(true)
            return;
        }
        guardarMonedaConsulta(moneda)
        guardarCriptomonedaElegidaConsulta(criptomonedaElegida)
        guardarError(false)
    }

    const componente = (error) ? <Error mensaje='Ambos campos son obligatorios'/> : null

    return (
        
        <form
            onSubmit={handleSubmit}
        >
            {componente}
            <div className='row'>
                <label>Elige tu moneda</label>
                <select 
                    className='u-full-width'
                    onChange={e => guardarMoneda(e.target.value)}
                >
                    <option value=''>-Elige tu Moneda-</option>
                    <option value='USD'>Dólar Estadounidense</option>
                    <option value='GBP'>Libra Esterlina</option>
                    <option value='EUR'>Euro</option>
                </select>
            </div>
            <div className='row'>
                <label>-Elige tu Criptomoneda-</label>
                <select 
                    className='u-full-width'
                    onChange={e => guardarCriptomonedaElegida(e.target.value)}
                >
                <option value=''>Elige tu Criptomoneda</option>
                    {infoCriptos.map(criptomoneda => (
                        <Criptomoneda
                            key={criptomoneda.CoinInfo.Id}
                            criptomoneda={criptomoneda}
                        />
                    ))}
                </select>
            </div>
            <input type='submit' className='button-primary u-full-width' value='Calcular'/>
        </form>
    );
};

export default Formulario;