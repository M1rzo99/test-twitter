import Auth from "@/components/auth"
import { authOptions } from "@/lib/auth-options"
import { getServerSession } from "next-auth"
import { Toaster } from "@/components/ui/toaster"
import NextTopLoader from 'nextjs-toploader';
import Sidebar from "@/components/sidebar/sidebar";
import Followbar from "@/components/shared/followbar";
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
return(
<div className="h-screen mx-auto lg:container lg:max-w-7xl">
<div className="flex">
  <Sidebar user={session.currentuser}/>
  <div className="flex w-full felx-1 border-x-[1px] border-neutral-800 lg:mx-4 ml-1">
   <div className="w-full">
    <NextTopLoader
    color="#2299dD"
    initialPosition={0.08}
    crawlSpeed={200}
    height={3}
    crawl={true}
    showSpinner={false}
    easing="ease"
    speed={200}
    shadow="0 0 10px #2299DD,0 0 5px #2299DD"
    />
    {children}
     <Toaster/>
     </div>
    </div>
    <Followbar/>
</div>
</div>
)
}

export default Layout
// agarda login bolgan bolsa Auth pageiga o'tkazvoradi/ Ya'ni Login bolgandan keyin boshqa Pagega o'tkazadigon functions