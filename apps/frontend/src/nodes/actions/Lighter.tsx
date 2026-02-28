import { Handle, Position } from "@xyflow/react";
import type { TradingMetadata } from "common/types";

const Lighter = ({
    data,
    isConnectable,
    ...rest
}: {
    data: {
        metadata: TradingMetadata;
    };
    isConnectable: boolean;
}) => {
    const isLong = data.metadata.type === "LONG";

    return (
        <div
            className="relative w-60 bg-[#161922] border border-slate-800 rounded-2xl shadow-xl transition-all hover:border-blue-500/40 hover:shadow-blue-500/10 hover:scale-[1.02] duration-300 overflow-hidden"
            {...rest}
        >
            {/* Left Accent Execution Bar */}
            <div className="absolute left-0 top-0 h-full w-1 bg-blue-500/70" />

            {/* Subtle Blue Depth Glow */}
            <div className="absolute inset-0 bg-blue-500/5 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />

            <div className="p-4 pl-5">
                {/* Header */}
                <div className="text-xs font-black uppercase tracking-wider text-blue-500 mb-2">
                    Action
                </div>

                {/* Exchange Title */}
                <div className="font-bold text-slate-100 text-base mb-3">
                    Lighter Exchange
                </div>

                {/* Trade Direction + Asset */}
                <div className="flex justify-between items-center text-sm font-semibold mb-2">
                    <span
                        className={
                            isLong ? "text-emerald-400" : "text-red-400"
                        }
                    >
                        {data.metadata.type}
                    </span>

                    <span className="text-slate-300">
                        {data.metadata.asset}
                    </span>
                </div>

                {/* Quantity */}
                <div className="text-sm text-slate-400">
                    Quantity:{" "}
                    <span className="font-mono text-slate-200">
                        {data.metadata.quantity}
                    </span>
                </div>
            </div>

            {/* Target Handle (input from trigger) */}
            <Handle
                type="target"
                position={Position.Left}
                isConnectable={isConnectable}
                className="!bg-blue-500 !w-3 !h-3 !border-2 !border-[#0d0f14]"
            />

            {/* Source Handle (chain actions) */}
            <Handle
                type="source"
                position={Position.Right}
                isConnectable={isConnectable}
                className="!bg-blue-500 !w-3 !h-3 !border-2 !border-[#0d0f14]"
            />
        </div>
    );
};

export default Lighter;