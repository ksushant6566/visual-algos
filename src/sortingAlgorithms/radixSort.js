var counter = 0;
var speed = 0;
export const getRadixSorted = (mainArray, superSpeed) => {
    const sortedArray = mainArray.map(item => item.val)

    counter = 0;
    speed = superSpeed;
    radixSort(sortedArray);
    counter += 10;
    return { sortedArray, counter }
} 

const radixSort = (arr) => {
    let max = -1;
    for(let i = 0; i < arr.length; i++) {
        max = Math.max(max, arr[i]);
    }

    for(let exp = 1; Math.floor(max/exp) > 0; exp*= 10) {
        countSort(arr, exp)
    }

    console.log(arr)
}

const countSort = (arr, exp) => {

    const freq = new Array(10);
    let sortedArray = new Array(arr.length);

    for(let i=0; i<freq.length; i++) freq[i] = 0;
    for(let i=0; i<sortedArray.length; i++) sortedArray[i] = 0;


    for(let i=0; i < arr.length; i++) {
        
        freq[ (Math.floor((arr[i] / exp) % 10)) % 10 ]++ ;
    }

    freq[0]--;
    for(let i=1; i < freq.length; i++) {
        freq[i] += freq[i-1];
    }


    for(let i = arr.length-1; i >= 0; i--) {

        let idx = (freq[Math.floor((arr[i] / exp) % 10)]);
        sortedArray[idx] = arr[i];
        
        let height = arr[i]
        setTimeout(() => {
            let bars = document.getElementsByClassName('sorting-array-bar');
            bars[idx].style.height = `${height}px`
            bars[idx].style.backgroundColor = 'red'
            
        }, (counter++)*speed);

        setTimeout(() => {
            let bars = document.getElementsByClassName('sorting-array-bar');
            bars[i].style.backgroundColor = 'cyan'
            
        }, (counter++)*speed);

        setTimeout(() => {
            let bars = document.getElementsByClassName('sorting-array-bar');
            bars[idx].style.backgroundColor = '#074478'
            bars[i].style.backgroundColor = '#074478'
            
        }, (counter++)*speed);

        freq[Math.floor((arr[i] / exp) % 10)]--;
    }



    for(let i = 0; i < arr.length; i++) {
        arr[i] = sortedArray[i];
    }

    return sortedArray

}