import { useEffect, useState } from 'react'

// import './App.css'
import axios from 'axios'

function App() {
  const [data,setData]=useState([])
  const [filterData,setFilterData]=useState([])
  const [input,setInput]=useState("")
  const [debounceSearch,setDebounceSearch]=useState("")
  const [select,setSelect]=useState("")
  const [current,setCurrent]=useState(0)
  console.log("selectt",select)
  // console.log("setDebounceSearch",debounceSearch)
  // console.log(input)
  const fetchdata=async()=>{
    try {
      const res=await axios.get("https://fakestoreapi.com/products")
      console.log(res.data)
      setData(res.data)
      setFilterData(res.data)
    } catch (error) {
      console.log(error)
    }
  }

 useEffect(()=>{
    setTimeout(()=>{
        setDebounceSearch(input)
    },500)

 },[input])



  useEffect(()=>{
    let dubdata=[...data]
     if(debounceSearch!==""){
         dubdata=dubdata.filter((item)=>item.title.toLowerCase().includes(debounceSearch.toLowerCase()))
     }
     if(select!==""){
        dubdata=dubdata.slice(current*select,(current*select)+select)
     }

    
   

    setFilterData(dubdata)

  },[debounceSearch,select])
  
  useEffect(()=>{
    fetchdata()
  },[])

  const ItemPerPage=Math.ceil(filterData.length/select)
  console.log("ItemsPer",ItemPerPage)

  return (
   <>
   <h1 className='text-5xl font-bold text-center mt-10 mb-10'>Products</h1>
    <div><input className='border w-[40%]' type="text" name='filterData' placeholder='SearchByTitle' value={input} onChange={(e)=>setInput(e.target.value)}/>
    <select className='w-[20%]' value={select} onChange={(e)=>setSelect(Number(e.target.value))}>
      <option value="">All</option>
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="20">20</option>
    </select>
    </div> 

    <div className='grid grid-cols-4 gap-4 px-[20px]'>
   {filterData&& filterData.map((ele)=>{
       return(
          <>
          <div className='shadow-md p-[10px]'>
            <div className='flex justify-center'><img className='w-[100px] h-[100px] text-center' src={ele.image}/></div>
            <h3><b>Title:</b> {ele.title}</h3>
            <h4><b>Price:</b> {ele.price}</h4>
            <h5><b>Category:</b> {ele.category}</h5>
          </div>
      
          
          
          </>
         
       )
        
   })}
     </div>  


   </>
  )
}

export default App
