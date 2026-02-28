import { Handle, Position } from "@xyflow/react";
import type { PriceNodeMetadata } from "common/types";

const Price = ({
    data,
    isConnectable,
}: {
    data: {
        metadata: PriceNodeMetadata;
    };
    isConnectable: boolean;
}) => {
    return (
        <div className="relative w-56 bg-[#161922] border border-slate-800 rounded-2xl p-4 shadow-xl backdrop-blur-sm transition-all hover:border-emerald-500/40 hover:shadow-emerald-500/10">

            {/* Subtle Accent Glow */}
            <div className="absolute inset-0 rounded-2xl bg-emerald-500/5 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-black uppercase tracking-wider text-emerald-500">
                    Trigger
                </div>
            </div>

            {/* Title */}
            <div className="font-bold text-slate-100 text-base mb-1">
                Price Movement
            </div>

            {/* Description */}
            <div className="text-sm text-slate-400 leading-snug">
                If{" "}
                <span className="font-semibold text-emerald-400">
                    {data.metadata.asset}
                </span>{" "}
                changes by{" "}
                <span className="font-semibold text-emerald-400">
                    {data.metadata.price}
                </span>{" "}
                units
            </div>

            {/* Connection Handle */}
            <Handle
                type="source"
                position={Position.Right}
                isConnectable={isConnectable}
                className="!bg-emerald-500 !w-3 !h-3 !border-2 !border-[#0d0f14]"
            />
        </div>
    );
};

export default Price;