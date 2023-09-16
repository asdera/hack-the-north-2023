import React from 'react';

function Equipment(props) {
    // string, image, bool, func
    const { equiptment, selectedPiece, onClick } = props;

    let equipped = selectedPiece.weapon === equiptment.name || (equiptment.name === 'Vest' && selectedPiece.vest)

    const style = {
        backgroundColor: equipped ? '#9C9C9C' : '#CBCBCB'
    };
    
    return (
        <div className='Equipment' onClick={onClick} style = {style}>
            <div className='EquipmentVerticle'>
                <div className='TextSmall'>{equiptment.name}</div>
                <div className='TextSmall'>{equipped ? "EQUIPPED" : '$ ' + equiptment.cost}</div>
            </div>
        </div>
    );
}

export default Equipment