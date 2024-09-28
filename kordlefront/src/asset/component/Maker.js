function Maker(){

    const divStyle={
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const makerStyle={
        fontFamily: "'Poppins', sans-serif",   // 세련된 sans-serif 글꼴
        fontSize: '48px',                      // 로고에 적당한 크기
        fontWeight: 'bold',                   
        WebkitBackgroundClip: 'text',          // 텍스트에만 배경 적용 (웹킷 전용)
        color: 'red',                  // 배경 그라디언트를 보이게 하기 위해 텍스트를 투명하게
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',  // 부드러운 그림자
        display: 'inline-block',
        padding: '10px 20px',
        transition: 'transform 0.3s ease',     // 마우스 오버 시 부드러운 애니메이션
        cursor: 'pointer',            
    }

    return(
        <div style={divStyle}>
            <h2 style={makerStyle}>Yudle</h2>
        </div>
    );
}

export default Maker;