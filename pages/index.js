import Button from "../components/LandingPage/Button"
import Footer from "../components/base/Footer"
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-sky-700 space-y-20 font-montserrat">
      <div className ="animate-pulse flex flex-col items-center space-y-5 text-white ">
        <h1 className="text-3xl tracking-widest">VNT METAL DÖKÜM YÖNETİM SİSTEMİ</h1>
        <p className ="text-xl italic tracking-widest">Hoşgeldiniz</p>
      </div>


      <Button name={"Giriş Yap"} />
      <Footer />
    </div>
  )
}
