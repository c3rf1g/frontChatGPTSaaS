import React from 'react';

const CircularLoader = () => {
    // добавляем стиль для затемнения остального содержимого
    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9998, // меньше, чем zIndex самого лоадера, чтобы он был над слоем затемнения
        pointerEvents: 'none', // чтобы события мыши проходили сквозь слой затемнения
    };

    // добавляем стиль для кругового индикатора загрузки
    const loaderStyle = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
    };

    return (
        <div>
            {/* добавляем слой затемнения */}
            <div style={overlayStyle}></div>
            {/* добавляем круговой индикатор загрузки */}
            <div style={loaderStyle}>
                <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    border: '5px solid rgba(0, 0, 0, 0.1)',
                    borderTopColor: '#fff',
                    animation: 'spin 1s linear infinite'
                }}></div>
                <style>
                    {`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}
                </style>
            </div>
        </div>
    );
};

export default CircularLoader;
