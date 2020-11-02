import { useEffect, useState } from "react"

const Searching = () => {
    
    const [mainArray, setMainArray] = useState([])
    const [size, setSize] = useState(50)
    const [searchValue, setSearchValue] = useState(9)

    const primaryColor = "pink"
    const secondaryColor = "red"

    useEffect( () => {
        getNewArray(size)
    },[size])

    const getNewArray = (size) => {
        let arr = [];
        for(let i=0; i < size; i++) {
            const item = {
                idx : i,
                val : getNumFromInterval(100, 500)
            }
            arr.push(item)
            if(document.getElementsByClassName("array-bar")[i] != null ) {
                document.getElementsByClassName("array-bar")[i].style.backgroundColor = primaryColor
            }
        }
        console.log(arr)
        setMainArray(arr)
    }

    const search = (value) => {
        for(let i = 0; i < size; i++) {
            if(value == mainArray[i].val) {
                setTimeout(() => {
                    document.getElementsByClassName("array-bar")[i].style.backgroundColor = "green"
                }, i * 50)
                console.log("found at idx : " + i)
                return
            }else {
                setTimeout(() => {
                    document.getElementsByClassName("array-bar")[i].style.backgroundColor = secondaryColor
                }, i * 50)
                setTimeout(() => {
                    document.getElementsByClassName("array-bar")[i].style.backgroundColor = primaryColor
                }, (i + 5) * 50)
            }
        }
        
    }

    const getNumFromInterval = (i, j) => {
        return i + Math.floor(Math.random() * (j-i))
    }

    return (
        <div className="searching-container">
            <div className="array-container">
                {mainArray.map(item => {
                    return (
                        <div className="array-bar" key ={item.idx} style={{height : item.val, backgroundColor : primaryColor}} > </div>
                    )
                })}
            </div>
            <div className="utility-container">
            <label>Element to be Searched</label>
                <input
                    type = "number"
                    value = {searchValue}
                    onChange = {(e) => setSearchValue(e.target.value)}
                >
                </input>
                
                <label>Length of Array</label>
                <input
                    type = "range"
                    value = {size}
                    onChange = {(e) => setSize(e.target.value)}
                    min = "20"
                    max = "100"
                >
                </input>

                <button onClick = {() => getNewArray(size)}> reset array </button>
                <button onClick = {() => search(searchValue)}> search </button>
            </div>
        </div>
    )
}


export default Searching