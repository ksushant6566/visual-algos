var counter = 0;
var speed = 0;
export const getQuickSorted = (mainArray, superSpeed) => {

    const sortedArray = mainArray.map(item => item.val);

    counter = 0;
    speed = superSpeed
    quickSort(sortedArray, 0, sortedArray.length-1)
    counter+=5

    return { sortedArray, counter }
}

const quickSort = (arr, lo, hi) => {

    if(lo > hi ) return 

    let pivot = arr[hi]
    
    setTimeout(() => {
        document.getElementsByClassName('sorting-array-bar')[hi].style.backgroundColor = 'cyan'
    }, (counter++) * speed);
    
    let pi = partition(arr, pivot, lo, hi)

    setTimeout(() => {
        document.getElementsByClassName('sorting-array-bar')[pi].style.backgroundColor = 'green'
    }, (counter++) * speed);

    quickSort(arr, lo, pi-1)
    quickSort(arr, pi+1, hi)
}

const partition = (arr, pivot, lo, hi) => {
    let i = lo
    let j = lo

    while(i <= hi) {
        let a = i
        let b = j

        setTimeout(() => {
            document.getElementsByClassName('sorting-array-bar')[a].style.backgroundColor = 'cyan'
        }, (counter++) * speed);

        
        if(arr[i] > pivot) {
            setTimeout(() => {
                document.getElementsByClassName('sorting-array-bar')[a].style.backgroundColor = '#074478'
            }, (counter++) * speed);

            i++
        }
        else {
            setTimeout(() => {
                document.getElementsByClassName('sorting-array-bar')[a].style.backgroundColor = 'red'
                document.getElementsByClassName('sorting-array-bar')[b].style.backgroundColor = 'red'

                let temp = document.getElementsByClassName('sorting-array-bar')[a].style.height

                document.getElementsByClassName('sorting-array-bar')[a].style.height = document.getElementsByClassName('sorting-array-bar')[b].style.height
                document.getElementsByClassName('sorting-array-bar')[b].style.height = temp              

            }, (counter++) * speed);            

            setTimeout(() => {
                document.getElementsByClassName('sorting-array-bar')[a].style.backgroundColor = '#074478'
                document.getElementsByClassName('sorting-array-bar')[b].style.backgroundColor = '#074478'
            }, (counter++) * speed);

            swap(arr, i, j)
            i++
            j++
        }

    }
    return j-1
}

const swap = (arr, i, j) => {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}