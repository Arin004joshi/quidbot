import { useNavigate } from "react-router-dom";
import { Zap, Activity, Layers } from "lucide-react";
import { Feature } from "./Logo";
import Navbar from "@/components/Navbar";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-screen">

            <Navbar showActions={true} />

            {/* HERO */}
            <section className="flex flex-col items-center justify-center flex-grow text-center px-6 relative">

                {/* Floating Glow Accent */}
                <div className="absolute w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -top-40 -z-10" />

                {/* Badge */}
                <div className="mb-6 px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-wider uppercase">
                    Algorithmic Trading Automation
                </div>

                {/* Heading */}
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-4xl leading-tight">
                    Automate Your Trading
                    <span className="text-blue-500"> Intelligently</span>
                </h1>

                {/* Subtext */}
                <p className="mt-6 text-slate-400 max-w-2xl text-lg">
                    Design real-time trading workflows visually. Connect triggers to execution engines
                    across multiple exchanges — without writing backend execution logic.
                </p>

                {/* CTA */}
                <div className="mt-10 flex gap-6">
                    <button
                        onClick={() => navigate("/create-workflow")}
                        className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 transition-all font-bold shadow-lg shadow-blue-600/20 hover:scale-105"
                    >
                        Create Workflow
                    </button>

                    <button className="px-8 py-4 rounded-2xl border border-slate-700 hover:border-slate-500 transition-all font-semibold text-slate-300">
                        Explore Features
                    </button>
                </div>

                {/* Feature Cards */}
                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
                    <Feature icon={<Activity />} title="Real-Time Market Triggers" />
                    <Feature icon={<Layers />} title="Visual Execution Engine" />
                    <Feature icon={<Zap />} title="Multi-Exchange Automation" />
                </div>
            </section>
        </div>
    );
};

export default Home;