import LoginForm from "../components/LoginPage/Forms/LoginForm";
import Footer from "../components/base/Footer";

export default function Login () {
    
    return(
        <div className="gridh-screen bg-sky-700 font-montserrat">
            <LoginForm />

            <Footer />
        </div>
    );
}