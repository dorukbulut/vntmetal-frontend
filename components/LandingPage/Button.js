export default function SignInButton ({name}) {
    return (
        <a href="/login" className="font-montserrat relative w-1/6 text-center rounded px-5 py-2.5 overflow-hidden group bg-slate-100 relative hover:bg-gradient-to-r hover:from-slate-50 hover:to-slate-100 text-white hover:ring-2 hover:ring-offset-2 hover:ring-slate-50 transition-all ease-out duration-300 tracking-widest">
            <span className="relative text-black text-lg">{name}</span>
        </a>
    );
}