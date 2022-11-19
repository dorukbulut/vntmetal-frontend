import Navbar from "../../components/Dashboards/general/ui/Navbar";
import ProfileBar from "../../components/Dashboards/general/ui/ProfileBar";

export default function DashBoard () {
    return (
        <div className="bg-gray-200">
           <Navbar />
           <ProfileBar />
        </div>
    )
}