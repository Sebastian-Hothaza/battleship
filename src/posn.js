const posnFactory = (x, y) => {
    return{
        get x(){return x;}, set x(newX){x=newX},
        get y(){return y;}, set y(newY){y=newY}
    }
}


module.exports = { posnFactory }