export const Logo = () => {
    return (
        <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-blue-600 rounded-xl rotate-12 shadow-lg shadow-blue-600/40" />
            <div className="absolute inset-1 bg-[#0d0f14] rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
            </div>
        </div>
    );
};

export const Feature = ({
    icon,
    title,
}: {
    icon: React.ReactNode;
    title: string;
}) => (
    <div className="bg-[#161922] border border-slate-800 rounded-3xl p-8 shadow-xl hover:border-blue-500/30 transition-all hover:scale-[1.02] duration-300">
        <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 mb-4 mx-auto">
            {icon}
        </div>
        <h3 className="font-bold text-white">{title}</h3>
    </div>
);