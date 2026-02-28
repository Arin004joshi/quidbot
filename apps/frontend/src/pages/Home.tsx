import { useNavigate } from "react-router-dom";
import { Zap, Activity, Layers } from "lucide-react";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center flex-grow text-center px-6">

            {/* Badge */}
            <div className="mb-6 px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-wider uppercase">
                QuidBot Automation Engine
            </div>

            {/* Hero Heading */}
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-4xl leading-tight">
                Build Algorithmic Trading
                <span className="text-blue-500"> Workflows </span>
                Visually
            </h1>

            {/* Subtext */}
            <p className="mt-6 text-slate-400 max-w-2xl text-lg">
                Design high-frequency trading logic using visual triggers and
                execution protocols. Connect signals to exchanges like Hyperliquid,
                Backpack, and Lighter — without writing execution code.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex gap-6">
                <button
                    onClick={() => navigate("/create-workflow")}
                    className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 transition-all font-bold shadow-lg shadow-blue-600/20 hover:scale-105"
                >
                    Create Workflow
                </button>

                <button
                    className="px-8 py-4 rounded-2xl border border-slate-700 hover:border-slate-500 transition-all font-semibold text-slate-300"
                >
                    Learn More
                </button>
            </div>

            {/* Feature Preview Section */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
                <Feature icon={<Activity />} title="Real-Time Triggers" />
                <Feature icon={<Layers />} title="Visual Execution Engine" />
                <Feature icon={<Zap />} title="Multi-Exchange Support" />
            </div>
        </div>
    );
};

const Feature = ({ icon, title }: { icon: React.ReactNode; title: string }) => (
    <div className="bg-[#161922] border border-slate-800 rounded-3xl p-8 shadow-xl hover:border-blue-500/30 transition-all">
        <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 mb-4 mx-auto">
            {icon}
        </div>
        <h3 className="font-bold text-white">{title}</h3>
    </div>
);

export default Home;