import Navbar from "../../components/Dashboards/general/ui/Navbar"
import Footer from "../../components/base/Footer";
export default function DashBoard () {
    return (
        <div className="grid grid-cols-5">
            <div className="">
                <Navbar /> 
            </div>

            <div className="col-span-5 bg-gray-100 h-screen">
                
            </div>
            
        </div>
    )
}