import React from 'react';

const Criptomoneda = ({criptomoneda}) => {
    const {Name, FullName} = criptomoneda.CoinInfo

    return (
        <option value={Name}>{FullName}</option>
    );
};

export default Criptomoneda;