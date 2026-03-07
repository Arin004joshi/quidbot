import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Zap, 
  ChevronRight, 
  Monitor, 
  Terminal, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  Shield, 
  ArrowRight 
} from "lucide-react";

/**
 * LandingPage - Entry point for QuidBot
 * Features high-fidelity hero section and technical value proposition.
 */
const Home = () => {
  const navigate = useNavigate();

  const Button = ({ className, variant = "primary", ...props }: any) => {
    const variants: any = {
      primary: "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 border border-blue-400/20",
      secondary: "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700",
      outline: "border-2 border-blue-600/30 hover:border-blue-500 text-blue-400 hover:bg-blue-500/5",
    };
    return (
      <button 
        {...props} 
        className={`inline-flex items-center justify-center rounded-xl font-bold transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none px-6 py-2 text-sm ${variants[variant]} ${className}`} 
      />
    );
  };

  return (
    <div className="flex-grow flex flex-col z-20 overflow-y-auto">
      <nav className="h-20 px-10 flex items-center justify-between shrink-0 border-b border-white/[0.03]">
        <div className="flex items-center gap-5">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center font-black text-2xl shadow-xl shadow-blue-900/40 transform -rotate-3 border border-blue-400/20">Q</div>
          <span className="font-black text-xl tracking-tight text-white uppercase italic">QuidBot</span>
        </div>
        <div className="flex items-center gap-10">
          <div className="hidden md:flex gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
            <a href="#" className="hover:text-blue-500 transition-colors">Documentation</a>
            <a href="#" className="hover:text-blue-500 transition-colors">Kernel v4.2</a>
            <a href="#" className="hover:text-blue-500 transition-colors">Protocols</a>
          </div>
          <Button variant="secondary" onClick={() => navigate('/create-workflow')} className="px-8 text-[10px] uppercase tracking-widest">Launch Studio</Button>
        </div>
      </nav>

      <main className="flex-grow flex flex-col items-center justify-center px-6 py-24 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[500px] border border-blue-500/[0.02] rounded-[140px] pointer-events-none" />
        
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-500/5 border border-blue-500/20 rounded-full mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Shield size={14} className="text-blue-400" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Institutional Execution Studio</span>
        </div>

        <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white mb-10 max-w-5xl leading-[0.85] animate-in fade-in slide-in-from-bottom-6 duration-1000">
          Build Execution <span className="text-blue-600">Sequences.</span>
        </h1>
        
        <p className="text-slate-400 text-lg md:text-2xl max-w-3xl mb-14 font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000">
          The ultimate visual automation studio for high-frequency trading logic. 
          Connect live price signals to multi-chain execution kernels with zero code.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <Button 
            className="h-16 px-12 text-[11px] uppercase tracking-[0.3em] font-black rounded-2xl group shadow-2xl shadow-blue-600/20 active:scale-95 transition-all"
            onClick={() => navigate('/create-workflow')}
          >
            Enter Workspace
            <ArrowRight className="ml-4 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="outline" className="h-16 px-12 text-[11px] uppercase tracking-[0.3em] font-black rounded-2xl border-white/5 bg-white/[0.02]">
            View Simulations
          </Button>
        </div>

        <div className="mt-32 w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in duration-1000 delay-500 text-left">
          <div className="p-8 bg-slate-900/30 border border-white/[0.03] rounded-[40px] backdrop-blur-xl">
             <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/20">
               <Cpu size={24} className="text-emerald-500" />
             </div>
             <h3 className="text-white font-bold text-xl mb-3">Live Kernel</h3>
             <p className="text-slate-500 text-sm leading-relaxed font-medium">Logic is compiled into optimized execution paths for sub-millisecond response times.</p>
          </div>
          <div className="p-8 bg-slate-900/30 border border-white/[0.03] rounded-[40px] backdrop-blur-xl">
             <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20">
               <Layers size={24} className="text-blue-500" />
             </div>
             <h3 className="text-white font-bold text-xl mb-3">Multi-Chain</h3>
             <p className="text-slate-500 text-sm leading-relaxed font-medium">Unify your liquidity across Hyperliquid, Backpack, and Lighter with one visual bridge.</p>
          </div>
          <div className="p-8 bg-slate-900/30 border border-white/[0.03] rounded-[40px] backdrop-blur-xl">
             <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 border border-purple-500/20">
               <ShieldCheck size={24} className="text-purple-500" />
             </div>
             <h3 className="text-white font-bold text-xl mb-3">Safety First</h3>
             <p className="text-slate-500 text-sm leading-relaxed font-medium">Built-in simulation mode allows you to stress-test logic chains before deployment.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;