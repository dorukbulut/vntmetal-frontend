
export default function LoginForm() {
    
    return (
        <div className="flex flex-col space-y-10 bg-white">
            <h1>GİRİŞ YAP</h1>

            <div className="">
                <label htmlFor="employee">Personel Seçiniz</label>
                <select className="hover:cursor-pointer" id="employee" name="employee" required>
                    <option className="" value="Executive">Yönetim</option>
                    <option className="" value="Sales">Satış</option>
                    <option className="" value="Worker">İşçi</option>
                    <option className="" value="Accounting">Muhasebe</option>
                </select>
            </div>
            <div className="">
                <label>Kullanıcı Adı : </label>
                <input type="text" name ="username" placeholder="Kullanıcı adı giriniz ..." required/>
            </div>

            <div className="" >
                <label>Şifre :</label>
                <input type="password" name="password" placeholder="Şifre Giriniz ... " required/>
            </div>

            <div className="">
                <button>Giriş Yap</button>
            </div>
            
        </div>
    );
}