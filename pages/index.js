import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState, useEffect, Fragment } from "react"
import axios from "axios"

export default function Home() {
 const [datadog, setData] = useState([])
 const [serachQuery, setSearchQuery] = useState("")
 const [url, setUrl] = useState(null)
 const [dataLoaded, setIsDataLoaded] = useState(false)
 const baseEndpoint = "/api/download"

 const inputHandler = (event) => {
   setSearchQuery(event.target.value)
 }

 const buttonHandler = (event) => {
   event.preventDefault()
   setUrl(`${baseEndpoint}?Link=${serachQuery}`)
   setSearchQuery("")
 }

 useEffect(() => {
   const getData = async () => {
     setIsDataLoaded(false)
       const result = await axios(url)
       setData(result.data)
       setIsDataLoaded(true)
   }
   getData()
 }, [url])
 return (
   <div>
     <main className="container mx-auto">
       <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-kali-300 mt-10 mb-2 text-center">
         Instagram Photo and Video Downloader
       </h1>
       <h2 className="text-xl text-center font-medium mb-6">
         Save instagram photos and videos.
       </h2>

       <div className="flex bg-white flex-wrap justify-center border rounded-lg shadow-lg  mb-10 bg-kali-200 focus:outline-none">
         <form onSubmit={buttonHandler} className="my-10 text-center md:w-2/4">
           <label
             htmlFor="downloader"
             className="text-2xl text-indigo-50 font-extrabold tracking-tight"
           >
             Enter your link here 👇
           </label>
           <input
             className="rounded-lg text-gray-900 items-center border border-gray-300 rounded-lg shadow-lg bg-gray-100 focus:bg-white focus:border-blue-400 px-3 py-3 w-full placeholder-black mt-4"
             type="text"
             id="downloader"
             placeholder="https://www.instagram.com/p/CD39rk3A8I6/"
             value={serachQuery}
             onChange={inputHandler}
             required
           />
           <button
             className="w-1/2 mt-3 text-white font-bold text-xl text-center font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none px-3 py-3 inline-flex justify-center"
             type="submit"
           >
             Process ⚡
           </button>
         </form>
       </div>

       {dataLoaded ? (
         <div className="flex bg-gradient-to-r from-gray-200 via-white to-gray-200 flex-wrap justify-center border-2 rounded-lg shadow-lg  mb-10 bg-white focus:outline-none">
           <figure className="block">
             <img
               className="w-48 rounded-lg mt-2"
               src={datadog.thumbnailData}
               alt="post data"
             />

             <figcaption className="bg-gray-900 rounded font-bold text-white text-xlg text-center hover:bg-gray-700 my-2 px-3 py-3">
               <a
                 href={datadog.resData}
                 target="_blank"
                 download
                 rel="noreferrer noopener"
               >
                 Download
               </a>
             </figcaption>
           </figure>
         </div>
       ) : null}
     </main>
   </div>
 )
}
