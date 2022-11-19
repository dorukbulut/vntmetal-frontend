import DropDown from "./DropDown";
export default function LoginForm({router}) {
    
    return (
        <div className="flex flex-col bg-white space-y-20 lg:p-10 p-2 w-1/2 ">
            <h1 className="lg:text-2xl md:text-lg text-md text-center tracking-widest text-sky-700 italic">GİRİŞ YAP</h1>

            <form className="flex flex-col space-y-10">
                <div className="flex flex-row items-center space-x-5 ">
                    <div className="lg:text-sm text-xs font-bold text-gray-700 tracking-wide">Personel Tipi</div>
                    <DropDown />
                </div>
                            <div className="">
                                <div className="text-sm font-bold text-gray-700 tracking-wide">Kullanıcı Adı</div>
                                <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type=""/>
                            </div>
                            <div className="mt-8">
                                <div className="flex justify-between items-center">
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                                        Şifre
                                    </div>
                                </div>
                                <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="password" />
                            </div>
                            <div className="mt-10">
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    router.push("/admin");
                                }}  className="bg-sky-700 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-sky-800
                                shadow-lg">
                                    Giriş Yap
                                </button>
                            </div>
             </form>
        </div>
    );
}