import axios from "axios";

// fetcher.ts da GET so'rovlarni qaytaradi/ get So'rovlarni oladi va kerakli joydaa
const fetcher = (url:string)=> axios.get(url).then((res)=> res.data)
export default fetcher