import React, { useEffect, useState } from 'react'
import { getBubbleSortAnimation } from './bubbleSort'
import { getMergeSortAnimation } from './mergeSort'

const Sorting = () => {

    const [mainArray, setMainArray] = useState([])
    const [size, setSize] = useState(30)
    const [speed, setSpeed] = useState(30)
    const [sortAlgo, setSortAlgo] = useState('bubbleSort')

    const primaryColor = "#074478"
    const secondaryColor = "cyan"
    const thirdColor = "red"

    useEffect( () => {
        getNewArray(size)
    },[size, sortAlgo])

    const sort =() => {
        if(sortAlgo === 'bubbleSort') bubbleSort()
        else if(sortAlgo === 'mergeSort') mergeSort()
    }

    const getNewArray = (size) => {
        let arr = [];
        for(let i=0; i < size; i++) {
            const item = {
                idx : i,
                val : getNumFromInterval(100, 500)
            }
            arr.push(item)
            if(document.getElementsByClassName("sorting-array-bar")[i] != null ) {
                document.getElementsByClassName("sorting-array-bar")[i].style.backgroundColor = primaryColor
            }
        }
        // console.log(arr)
        setMainArray(arr)

    }

    const bubbleSort = () => {
        const {animations, arr} = getBubbleSortAnimation(mainArray)
        const bars = document.getElementsByClassName("sorting-array-bar")
        let m = 0;
        for(let k = 0; k < animations.length; k++) {
            let i = animations[k].i
            let j = animations[k].j

            setTimeout(() => {
                bars[i].style.backgroundColor = secondaryColor
                bars[j].style.backgroundColor = secondaryColor
                
            }, m * speed)
            
            if(animations[k].swap) {
                setTimeout(() => {
                    bars[i].style.backgroundColor = thirdColor
                    bars[j].style.backgroundColor = thirdColor
                    
                    let temp = bars[i].style.height
                    bars[i].style.height = bars[j].style.height
                    bars[j].style.height = temp

                }, (m+1) * speed)
                m ++
            }

            setTimeout(() => {
                bars[i].style.backgroundColor = primaryColor
                bars[j].style.backgroundColor = primaryColor

            }, (m+1) * speed)
            m++
        }

        setTimeout(() => {
            let sortedArray = []
            for(let i = 0; i < size; i++) {
                bars[i].style.backgroundColor = 'purple'
                sortedArray.push({
                    idx : i,
                    val : arr[i]
                })
            }
            setMainArray(sortedArray)

        }, (m+1) * speed)

    }

    const mergeSort = () => {
        let { sortedArray, count } = getMergeSortAnimation(mainArray, speed)


        const newArr = []
        for(let i = 0; i < size; i++) {
            newArr.push({
                idx : i,
                val : sortedArray[i]
            })
        }

        setTimeout(() => {
            setMainArray(newArr)
            
            for(let i = 0; i < size; i++) {
                document.getElementsByClassName('sorting-array-bar')[i].style.backgroundColor = 'purple'
            }
        }, (count+10) * speed);

    }

    const getNumFromInterval = (i, j) => {
        return i + Math.floor(Math.random() * (j-i))
    }

    return (
        <div className="sorting-container" >
            <div className="array-container">

                {
                    mainArray.map(item => {
                    return (
                        <div 
                        className="sorting-array-bar" 
                        key ={item.idx} 
                        style={{
                            height : item.val, 
                            backgroundColor : primaryColor
                        }} 
                        ></div>
                    )
                })}

            </div>

            <div className="utility-container">
                
                <label>Length of Array</label>
                <input
                    className="input-range"
                    type = "range"
                    value = {size}
                    onChange = {(e) => setSize(e.target.value)}
                    min = "5"
                    max = "100"
                >
                </input>

                <label>Speed</label>
                <input
                    className="input-range"
                    type = "range"
                    value = {500 - speed}
                    onChange = {(e) => setSpeed(500 - e.target.value)}
                    min = "350"
                    max = "499.5"
                >
                </input>

                <select className="select" value={sortAlgo} onChange = {(e) => {setSortAlgo(e.target.value)}}>
                    
                    <option value="bubbleSort">bubbleSort</option>

                    <option value="quickSort">quickSort</option>

                    <option value="mergeSort">mergeSort</option>

                    <option value="radixSort">radixSort</option>

                    <option value="shellSort">shellSort</option>

                    <option value="insertionSort">insertionSort</option>

                </select>

                <div className="btn" onClick = {() => getNewArray(size)}> reset array </div>
                <div className="btn" onClick = {() => sort()}> sort </div>
            </div>

        </div>
    )
}

export default Sorting