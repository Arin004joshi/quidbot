import { useNavigate } from "react-router-dom";

interface NavbarProps {
    showActions?: boolean;
}

const Navbar = ({ showActions = true }: NavbarProps) => {
    const navigate = useNavigate();

    return (
        <nav className="flex items-center justify-between px-8 py-5 border-b border-slate-800 bg-[#0d0f14]/80 backdrop-blur-xl sticky top-0 z-50">

            {/* Logo */}
            <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => navigate("/")}
            >
                <Logo />
                <span className="text-xl font-bold tracking-wide text-white">
                    QuidBot
                </span>
            </div>

            {/* Right Side (Optional Actions) */}
            {showActions && (
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => navigate("/create-workflow")}
                        className="text-slate-400 hover:text-white transition font-medium"
                    >
                        Build
                    </button>

                    <button className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 transition-all font-semibold shadow-lg shadow-blue-600/20 hover:scale-105">
                        Sign Up
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
        <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-blue-600 rounded-xl rotate-12 shadow-lg shadow-blue-600/40" />
            <div className="absolute inset-1 bg-[#0d0f14] rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
            </div>
        </div>
    );
};