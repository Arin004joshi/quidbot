import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface NavbarProps {
    showActions?: boolean;
}

const Navbar = ({ showActions = true }: NavbarProps) => {
    const navigate = useNavigate();

    return (
        <nav className="h-20 px-10 flex items-center justify-between border-b border-white/[0.03] bg-slate-900/40 backdrop-blur-xl sticky top-0 z-50">

            {/* Logo Section */}
            <div
                className="flex items-center gap-5 cursor-pointer group"
                onClick={() => navigate("/")}
            >
                <Logo />
                <span className="font-black text-xl tracking-tight text-white uppercase italic group-hover:text-blue-500 transition-colors">
                    QuidBot
                </span>
            </div>

            {/* Right Side */}
            {showActions && (
                <div className="flex items-center gap-8">

                    <button
                        onClick={() => navigate("/create-workflow")}
                        className="hidden md:block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-blue-500 transition-colors"
                    >
                        Launch Studio
                    </button>

                    <button className="h-12 px-8 rounded-2xl bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-900/20 text-[11px] uppercase tracking-[0.3em] font-black transition-all group flex items-center gap-2">
                        Get Started
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;


/* Logo Component */
const Logo = () => {
    return (
        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center font-black text-2xl shadow-xl shadow-blue-900/40 transform -rotate-3 border border-blue-400/20">
            Q
        </div>
    );
};