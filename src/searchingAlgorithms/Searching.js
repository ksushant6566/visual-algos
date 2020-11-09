import { useEffect, useState } from "react"

const Searching = () => {
    
    const [mainArray, setMainArray] = useState([])
    const [size, setSize] = useState(30)
    const [searchValue, setSearchValue] = useState(250)
    const [searchAlgo, setSearchAlgo] = useState('linearSearch')
    const [resultmsg, setResultmsg] = useState('')

    const primaryColor = "#074478"
    const secondaryColor = "cyan"

    useEffect( () => {
        searchAlgo === "linearSearch" ? getNewArray(size) : getNewSortedArray(size)
    },[size])

// generate new Array

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
        // console.log(arr)
        setMainArray(arr)

        displayResult("no-result")
    }

// generate new sorted Array

    const getNewSortedArray = (size) => {
        let arr = [];
        let lo = 100
        let hi = 200
        for(let i=0; i < size; i++) {
            lo = getNumFromInterval(lo, hi + i * 10)
            const item = {
                idx : i,
                val : lo
            }
            arr.push(item)
            if(document.getElementsByClassName("array-bar")[i] != null ) {
                document.getElementsByClassName("array-bar")[i].style.backgroundColor = primaryColor
            }
        }
        // console.log(arr)
        setMainArray(arr)
        
        displayResult("no-result")
    }

// LINEAR SEARCH

    const linearSearch = (value) => {
        let found = false;
        for(let i = 0; i < size; i++) {
            if(value == mainArray[i].val) {
                setTimeout(() => {
                    document.getElementsByClassName("array-bar")[i].style.backgroundColor = "#107834"
                    displayResult(i)
                }, i * 100)
                
                found = true;
                return
            }else {
                setTimeout(() => {
                    document.getElementsByClassName("array-bar")[i].style.backgroundColor = secondaryColor
                }, i * 100)
                setTimeout(() => {
                    document.getElementsByClassName("array-bar")[i].style.backgroundColor = primaryColor
                }, (i + 5) * 100)
            }
        }
        if(found === false) {
            setTimeout(() => {
                displayResult(-1)
            }, (size) * 100);
        }
    }

// BINARY SEARCH

    const binarySearch = (value) => {
        
        let lo = 0;
        let hi = size-1;
        let animations = [];
        let found = false;

        while(lo <= hi) {
            let mid = Math.floor((lo + hi)/2);

            animations.push({
                i : lo,
                j : hi,
                mid : mid
            })

            if(mainArray[mid].val == value) {
                found = true
                break;
            } else if(mainArray[mid].val > value ) {
                hi = mid - 1;
            }else {
                lo = mid + 1;
            }
        }
        
        if(!found) {
            animations.push({
                i : -1,
                j : -1,
                mid : -1
            })
        }

        // console.log(animations)
        binaryHelper(animations)

    }

    const binaryHelper = (animations) => {
        let bars = document.getElementsByClassName("array-bar")
        

        for(let k = 0; k < animations.length; k++) {
            if(animations[k].i == -1){
                setTimeout(() => {
                    
                    displayResult(-1)

                    bars[animations[k-1].mid].style.backgroundColor =  'grey';
                }, k * 1000)
                break;
            }

            if( mainArray[animations[k].mid].val == searchValue) {
                
                setTimeout(() => {
                    bars[animations[k].mid].style.backgroundColor =  '#107834';

                    displayResult(animations[k].mid)

                }, (k+1) * 1000)
            }

            setTimeout(() => {

                for(let m = 0; m < size; m++) {
                    
                    
                    if(m <= animations[k].j && m >= animations[k].i) bars[m].style.backgroundColor =  primaryColor;

                    else bars[m].style.backgroundColor =  'grey';

                    if(m == animations[k].mid) bars[m].style.backgroundColor =  secondaryColor;

                }
                
            },k * 1000);
            
        }
    }

    const getNumFromInterval = (i, j) => {
        return i + Math.floor(Math.random() * (j-i))
    }

//  HANDLE SELECT CHANGE
    useEffect(() => {
        // console.log(searchAlgo)
        searchAlgo === 'binarySearch' ? getNewSortedArray(size) : getNewArray(size)
    }, [searchAlgo] )

// SHOW RESULT
    const displayResult = (idx) => {
        console.log("called")

        if(idx === "no-result") {
            setResultmsg("")
            document.getElementById("result-box").classList.remove("red", "green")
        }

        else if(idx === -1) {
            // setResultmsg()
            setResultmsg(`not found !!!`)
            document.getElementById("result-box").classList.remove("red", "green")
            document.getElementById("result-box").classList.add("red")
        }else {
            setResultmsg(`found at idx ${idx}`)
            document.getElementById("result-box").classList.remove("red", "green")
            document.getElementById("result-box").classList.add("green")
        }
    }

    return (
        <div className="searching-container">
            <div className="array-container">
                <div id="result-box" className="result-box" >
                    {resultmsg}
                </div>

                {mainArray.map(item => {
                    return (
                        <div className="array-bar" key ={item.idx} style={{height : item.val, backgroundColor : primaryColor}} > <p>{item.val}</p> </div>
                    )
                })}
            </div>
            <div className="utility-container">
            <label>Search Element</label>
                <input
                    placeholder="try "
                    type = "number"
                    value = {searchValue}
                    onChange = {(e) => setSearchValue(e.target.value)}
                >
                </input>

                <div style = {{height:"10px"}} ></div>
                
                <label>Length of Array</label>
                <input
                    className="input-range"
                    type = "range"
                    value = {size}
                    onChange = {(e) => setSize(e.target.value)}
                    min = "15"
                    max = "34"
                >
                </input>

                <select className="select" value={searchAlgo} onChange = {(e) => {setSearchAlgo(e.target.value)}}>
                    
                    <option value="linearSearch">linearSearch</option>

                    <option value="binarySearch">binarySearch</option>

                </select>

                <div className="btn" onClick = {() => searchAlgo === 'linearSearch' ? getNewArray(size) : getNewSortedArray(size)}> reset array </div>
                <div className="btn" onClick = {() => searchAlgo === 'linearSearch' ? linearSearch(searchValue) : binarySearch(searchValue)}> search </div>
            </div>
        </div>
    )
}


export default Searching