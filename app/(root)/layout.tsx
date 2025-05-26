import Auth from "@/components/auth"
import { authOptions } from "@/lib/auth-options"
import { getServerSession } from "next-auth"

interface Props {
  children:React.ReactNode
}
const Layout = async ({children}:Props)=>{
const session = await getServerSession(authOptions)
if(!session){
  return  <div className='container h-screen mx-auto max-w-7xl'>
  <Auth/>
  </div>
}
return <div>{children}</div>
}

export default Layout
// agarda login bolgan bolsa Auth pageiga o'tkazvoradi/ Ya'ni Login bolgandan keyin boshqa Pagega o'tkazadigon functions