"use client";
import LoginForm from "./login";

export default function SimpleContainer() {
  return (
    <div className="grid place-items-center h-screen w-screen bg-indigo-800">
      <div className="lg:w-1/2 md:1/2 w-3/4 h-3/4 bg-indigo-600 rounded-xl -rotate-4">
        <div className="flex flex-col w-full h-full bg-indigo-50 z-10 rotate-4 rounded-lg gap-14">
          <div className="flex flex-col items-center gap-5 mt-28">
            <p className="font-roboto text-indigo-600 text-lg tracking-widest text-indigo-800">
              DÖKÜM YÖNETİM SİSTEMİ
            </p>
            <p className="font-roboto text-md tracking-widest text-indigo-800">
              Giriş Yap
            </p>
          </div>
          <div className="flex flex-col  items-center">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
