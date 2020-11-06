var count = 0;
export const getMergeSorted = (tempArr, speed) => {

    let arr = tempArr.map(item => item.val)
    count = 0;
    let sortedArray = mergeSort(0, arr.length-1, arr, speed)
    
    return {sortedArray, count};
}

const mergeSort = (lo, hi, arr, speed)  => {
    
    if(lo > hi) {
        let mr = []
        return mr;
    }

    if(lo === hi) {
        let mr = []
        mr.push(arr[lo])
        return mr;
    }
    
    let mid = Math.floor((lo + hi)/2)

    let a = mergeSort(lo, mid, arr, speed)
    let b = mergeSort(mid+1, hi, arr, speed)
    let mr = []
    let k = lo;
    let bars = document.getElementsByClassName('sorting-array-bar')

    let ai = 0, bi = 0;
    while(ai < a.length && bi < b.length) {

        let counter = count
        let barIdx = k

        if(a[ai] < b[bi]) {
            mr.push(a[ai]);

            let i = ai

            setTimeout(() => {
                bars[barIdx].style.backgroundColor = 'cyan'
                bars[barIdx].style.height = `${a[i]}px`
                
            } , (counter) * speed)

            setTimeout(() => {
                bars[barIdx].style.backgroundColor = 'red'
            } , (counter+1) * speed)
            setTimeout(() => {
                bars[barIdx].style.backgroundColor = '#074478'
            } , (counter+1.5) * speed)

            ai++;
        }
        else {
            mr.push(b[bi]);

            let i = bi

            setTimeout(() => {
                bars[barIdx].style.backgroundColor = 'cyan'
                bars[barIdx].style.height = `${b[i]}px`
                
            } , (counter) * speed)

            setTimeout(() => {
                bars[barIdx].style.backgroundColor = 'red'
            } , (counter+1) * speed)
            setTimeout(() => {
                bars[barIdx].style.backgroundColor = '#074478'
            } , (counter+1.5) * speed)

            bi++;
        }
        k++;
        count++
    }

    if(ai === a.length) {
        
        while(bi < b.length) {
            mr.push(b[bi]);
            let i = bi;
            let barIdx = k;
            let counter = count

            setTimeout(() => {
                bars[barIdx].style.backgroundColor = 'cyan'
                bars[barIdx].style.height = `${b[i]}px`
    
            } , (counter) * speed)

            setTimeout(() => {
                bars[barIdx].style.backgroundColor = 'red'
            } , (counter+1) * speed)
            setTimeout(() => {
                bars[barIdx].style.backgroundColor = '#074478'
            } , (counter+1.5) * speed)

            k++;
            bi++;
            count++;
        }
    }else if(bi === b.length) {
        
        for(let i = ai ; i < a.length; i++) {
            mr.push(a[i]);
            let barIdx = k;
            let counter = count

            setTimeout(() => {
                bars[barIdx].style.backgroundColor = 'cyan'
                bars[barIdx].style.height = `${a[i]}px`
                
            } , (counter) * speed)

            setTimeout(() => {
                bars[barIdx].style.backgroundColor = 'red'
            } , (counter+1) * speed)
            setTimeout(() => {
                bars[barIdx].style.backgroundColor = '#074478'
            } , (counter+1.5) * speed)

            k++;
            count++;
        }
    }

    return mr
}



// for(let i = 0; i < arr.length-1; i++) {
//     let swapped = false;
//     for(let j = 0; j < arr.length-i-1; j++) {
//         let swap = false;
//         if(arr[j] > arr[j+1]) {
//             swapped = true;
//             swap = true;

//             let temp = arr[j]
//             arr[j] = arr[j+1]
//             arr[j+1] = temp

//         }
//         animations.push({
//             i : j,
//             j : j+1,
//             swap : swap
//         })
//     }

//     if(swapped === false) break;
// }

