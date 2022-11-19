import LoginForm from "../components/LoginPage/Forms/LoginForm";
import Footer from "../components/base/Footer";
import {useRouter} from "next/router";
export default function Login () {
    const router = useRouter();
    return(
        <div className="flex font-poppins h-screen ">
            <div className="flex flex-col items-center justify-center lg:w-3/5 md:w-full w-full  bg-white mt-10 ">
                <h1 className="lg:text-3xl md:text-2xl text-md tracking-widest text-sky-700">DÖKÜM YÖNETİM SİSTEMİ</h1>
                <LoginForm router={router}/>

                <Footer bgcolor={"white"}/>
                
            </div>

            <div className="lg:block lg:w-2/5 md:w-0 hidden">
                <img
                    src="/bg.jpg"
                    className="object-cover w-full h-full"
                    alt="Image alt text"
                />
            </div>
           
        </div>
    );
}