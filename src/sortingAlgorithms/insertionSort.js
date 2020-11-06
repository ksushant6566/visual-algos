export const getInsertionSorted = (mainArray, speed) => {

    let arr = mainArray.map(item => item.val);

    let bars = document.getElementsByClassName('sorting-array-bar');

    let counter = 0;
    for(let i = 1; i < arr.length; i++) {
        let key = arr[i];
        setTimeout(() => {
            bars[i].style.backgroundColor = 'cyan'
        }, (counter++) * speed);
        counter+= 1;
        let j = i-1;

        while( j >= 0 && arr[j] > key) {
            let jcur = j;

            setTimeout(() => {
                bars[jcur+1].style.backgroundColor = 'red'
                bars[jcur+1].style.height = bars[jcur].style.height

            }, (counter++) * speed);
            setTimeout(() => {
                bars[jcur+1].style.backgroundColor = '#074478'

            }, (counter) * speed);

            arr[j+1] = arr[j]
            j--
        }

        setTimeout(() => {
            bars[j+1].style.backgroundColor = 'cyan'
            bars[j+1].style.height = `${key}px`

        }, (counter++) * speed);

        setTimeout(() => {
            bars[j+1].style.backgroundColor = '#074478'
        }, (counter+3) * speed);
        

        arr[j+1] = key;
    }
    counter+= 5

    return { arr , counter}

}