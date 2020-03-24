import React from 'react';

const Cotizacion = ({resultadoDefinitivo}) => {

    if (Object.keys(resultadoDefinitivo).length===0) return null

    return (
        <div className='resultado'>
            <h2>Resultado</h2>
            <p className="precio">El precio es <span>{resultadoDefinitivo.PRICE}</span> </p>

            <p>Precio más alto del día: <span>{resultadoDefinitivo.HIGHDAY}</span> </p>
            <p>Precio más bajo del día: <span>{resultadoDefinitivo.LOWDAY}</span> </p>
            <p>Variación últimas 24 horas: <span>{resultadoDefinitivo.CHANGEPCT24HOUR}%</span> </p>
            <p>Última Actualización: <span>{resultadoDefinitivo.LASTUPDATE}</span> </p>
        </div>
    );
};

export default Cotizacion;