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
   setUrl(`${baseEndpoint}?Url=${serachQuery}`)
   setSearchQuery("")
 }

 useEffect(() => {
   const getData = async () => {
     setIsDataLoaded(false)

     try {
       const result = await axios(url)
       setData(result.data)
       setIsDataLoaded(true)
     } catch (error) {}
   }
   getData()
 }, [url])
 return (
   <div>
     <Head>
       <title>
         Save instagram photos, videos and profile pictures | Igramdl
       </title>
       <meta
         property="og:title"
         content="Save instagram photos, videos and profile pictures | Igramdl"
         key="title"
       />
       <meta
         name="description"
         content="Save instagram photos, videos and profile pictures"
       />
       <link
         rel="apple-touch-icon"
         type="image/svg+xml"
         href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22256%22 height=%22256%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%23dc2929%22></rect><path fill=%22%23fff%22 d=%22M23.21 74.30L12.47 74.30L12.47 25.70L23.21 25.70L23.21 74.30ZM42.89 74.30L30.47 74.30L30.47 25.70L42.77 25.70Q49.13 25.70 52.67 27.29Q56.21 28.88 57.65 32.27Q59.09 35.66 59.09 41.06L59.09 41.06L59.09 58.70Q59.09 64.16 57.65 67.61Q56.21 71.06 52.70 72.68Q49.19 74.30 42.89 74.30L42.89 74.30ZM41.21 33.20L41.21 66.86L42.89 66.86Q45.35 66.86 46.43 66.14Q47.51 65.42 47.78 63.98Q48.05 62.54 48.05 60.38L48.05 60.38L48.05 39.20Q48.05 37.04 47.72 35.72Q47.39 34.40 46.31 33.80Q45.23 33.20 42.83 33.20L42.83 33.20L41.21 33.20ZM87.53 74.30L65.63 74.30L65.63 25.70L76.37 25.70L76.37 67.04L87.53 67.04L87.53 74.30Z%22></path></svg>"
       />
     </Head>
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
