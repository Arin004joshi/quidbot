import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import {
  Activity,
  Layers,
  Zap,
  TrendingUp,
} from 'lucide-react';

import CreateWorkflow from './components/CreateWorkflow';
import { ReactFlowProvider } from '@xyflow/react';
import Home from './pages/Home';

/**
 * --- NOTE FOR USER ---
 * To resolve the compilation errors in this environment, I have included 
 * the necessary structural logic and professional background effects.
 * * In your local environment, you can keep your imports for CreateWorkflow, 
 * TriggerSheet, and ActionSheet. Below, I have provided placeholders that 
 * match the professional aesthetic so you can see the background in action.
 */

// Placeholder for your CreateWorkflow.tsx design
// const CreateWorkflowPlaceholder = () => (
//   <div className="flex-grow flex flex-col p-8 z-10">
//     <div className="flex justify-between items-end mb-8">
//       <div>
//         <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Workflow Studio</h2>
//         <p className="text-slate-500 font-medium max-w-lg">
//           Design high-frequency trading logic visually. Connect triggers to execution protocols
//           and deploy to the QuidBot engine.
//         </p>
//       </div>
//       <div className="flex gap-4">
//         <div className="bg-[#161922] border border-slate-800 p-4 rounded-2xl flex items-center gap-4 shadow-xl">
//           <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center">
//             <Activity className="text-emerald-500" size={20} />
//           </div>
//           <div>
//             <p className="text-[10px] font-black text-slate-500 uppercase">Engine Status</p>
//             <p className="text-sm font-bold text-white leading-none">Operational</p>
//           </div>
//         </div>
//       </div>
//     </div>

//     {/* Canvas Area Mockup to show background visibility */}
//     <div className="flex-grow bg-[#161922]/40 border-2 border-dashed border-slate-800/60 rounded-[32px] flex items-center justify-center group relative overflow-hidden backdrop-blur-sm transition-all hover:bg-[#161922]/60 hover:border-blue-500/30">
//       <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
//       <div className="flex flex-col items-center gap-4 text-center z-20">
//         <div className="w-20 h-20 bg-blue-600/10 rounded-3xl flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform duration-500">
//           <Layers className="text-blue-500" size={32} />
//         </div>
//         <div>
//           <h3 className="text-lg font-bold text-slate-200">Empty Workspace</h3>
//           <p className="text-sm text-slate-500">Drag triggers from the sidebar to begin.</p>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// High-fidelity App Shell
const App = () => {
  return (
    <div className="relative min-h-screen w-full bg-[#0d0f14] text-slate-100 font-sans selection:bg-blue-500/30 selection:text-blue-200 overflow-hidden">

      {/* --- GLOBAL DESIGN ELEMENTS (The "Professional" Background) --- */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Top-Left Atmospheric Bloom */}
        <div
          className="absolute -top-[10%] -left-[5%] w-[70%] h-[70%] rounded-full bg-blue-600/10 blur-[140px] opacity-60 animate-pulse"
          style={{ animationDuration: '10s' }}
        />

        {/* Bottom-Right Atmospheric Bloom */}
        <div
          className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-emerald-600/10 blur-[160px] opacity-40 animate-pulse"
          style={{ animationDuration: '15s' }}
        />

        {/* Center Accent Depth */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] rounded-full bg-indigo-600/5 blur-[120px] opacity-30"
        />

        {/* Global Engineering Dot Grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Subtle Horizontal Scanlines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />
      </div>

      {/* --- ROUTING ARCHITECTURE --- */}
      <BrowserRouter>
        <div className="relative z-10 flex flex-col min-h-screen">
          <Routes>
            <Route path="/" element={<Home/>} />

            {/* Primary Workflow Route */}
            <Route path='/create-workflow' element={<ReactFlowProvider>
              <CreateWorkflow />
            </ReactFlowProvider>} />

            {/* Mock routes to satisfy compilation while keeping your logic */}
            <Route path='/trigger-sheet' element={
              <div className="flex-grow flex items-center justify-center p-6">
                <div className="w-full max-w-md bg-[#161922] border border-slate-800 rounded-3xl p-8 shadow-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <TrendingUp className="text-emerald-500" />
                    <h2 className="text-xl font-bold">Trigger Config Preview</h2>
                  </div>
                  <div className="h-40 bg-slate-900/50 rounded-2xl border border-slate-800 flex items-center justify-center italic text-slate-600">
                    TriggerSheet Component Placeholder
                  </div>
                </div>
              </div>
            } />

            <Route path='/action-sheet' element={
              <div className="flex-grow flex items-center justify-center p-6">
                <div className="w-full max-w-md bg-[#161922] border border-slate-800 rounded-3xl p-8 shadow-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <Zap className="text-blue-500" />
                    <h2 className="text-xl font-bold">Action Config Preview</h2>
                  </div>
                  <div className="h-40 bg-slate-900/50 rounded-2xl border border-slate-800 flex items-center justify-center italic text-slate-600">
                    ActionSheet Component Placeholder
                  </div>
                </div>
              </div>
            } />
          </Routes>
        </div>
      </BrowserRouter>

      {/* Global CSS Injector */}
      <style>{`
        @keyframes subtle-pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #0d0f14;
        }
        ::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 20px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #334155;
        }
        
        body {
          margin: 0;
          background-color: #0d0f14;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>
    </div>
  );
}

export default App;