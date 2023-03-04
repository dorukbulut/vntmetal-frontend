import Navbar from "../../components/Dashboards/general/ui/Navbar";
import ProfileBar from "../../components/Dashboards/general/ui/ProfileBar";

export default function Layout({ children }) {
  return (
    <div className="">
      <Navbar />
      <ProfileBar />

      <div>{children}</div>
    </div>
  );
}
