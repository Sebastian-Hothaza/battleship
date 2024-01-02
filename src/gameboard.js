

const gameboardFactory = (size) => {


    return{
        get size(){return size;}, set size(newSize){size=newSize}
    }
}


module.exports = { gameboardFactory }