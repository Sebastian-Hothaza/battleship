export { shipFactory }

const shipFactory = (size) => {
    let timesHit = 0;
    
    function hit(){
        timesHit++;
    }

    function isSunk(){
        return (timesHit >= size)? true:false;
    }

    return{
        get size(){return size;}, set size(newSize){size=newSize}, hit, isSunk
    }
}