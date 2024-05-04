function Maker(){

    const divStyle={
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const makerStyle={
        fontFamily: 'Arial, sans-serif',
        fontSize: '36px',
        color: '#333',
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
        backgroundColor: '#f0f0f0',
        padding: '10px',
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
    }

    return(
        <div style={divStyle}>
            <h1 style={makerStyle}>Yudle 유들</h1>
        </div>
    );
}

export default Maker;