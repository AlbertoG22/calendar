import React from 'react';

const Test = () => {

    const handle = () => {
        const arrayOriginal = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35];
    
        const arraysAgrupados = [];
    
        while (arrayOriginal.length > 0) {
            arraysAgrupados.push(arrayOriginal.splice(0, 7));
        }
    
        const elementosRenderizados = arraysAgrupados.map((array, index) => (
            <div key={index}>
                {array.map((elemento) => (
                    <p key={elemento}>{elemento}</p>
                ))}
            </div>
        ));
        return elementosRenderizados;
    };


    return <div>{handle()}</div>;
};

export default Test;


