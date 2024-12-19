import { useEffect, useState } from "react"
import Footer from "./components/Footer"
import Main from "./components/Main"
import SideBar from "./components/SideBar"

function App() {
  const [data , setData]= useState(null)
  const [loadiing , setLoading]= useState(false)
  const [showSidebar , setShowSidebar]= useState(false)
  function handleToggleShow(){
    setShowSidebar(!showSidebar)
  }

  useEffect(()=>{
    async function fetchAPIData() {
      const NASA_KEY= import.meta.env.VITE_NASA_API_KEY
      const url='https://api.nasa.gov/planetary/apod' + `?api_key=${NASA_KEY}`

      const today= (new Date()).toDateString()
      const localKey = `NASA-${today}`
      if (localStorage.getItem(localKey)){
        const apiData= JSON.parse(localStorage.getItem(localKey))
        setData(apiData)
        console.log('Fetched from Cache today')
        return
      }
      localStorage.clear()

      try{
        const res= await fetch(url)
        const apiData= await res.json()
        localStorage.setItem(localKey, JSON.stringify(apiData))
        setData(apiData)
        console.log('Fetched from API today')
      }catch(err){
        console.log(err.message)
      }
    }
    fetchAPIData()
  },[])

  return (
    <>
      {data ? (<Main data={data}/>): (
        <div className="loadingState">
          <i className="fa-solid fa-gear"></i>
        </div>
      ) 
      }
      {showSidebar && <SideBar data={data} handleToggleShow={handleToggleShow}/>}
      {data && <Footer data={data} handleToggleShow={handleToggleShow}/>}
    </>
  )
}

export default App
