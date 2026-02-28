import { useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import type { NodeKind, NodeMetadata } from "./CreateWorkflow";
import {
    Select,
    SelectGroup,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Clock,
    TrendingUp,
    Zap,
    Settings2,
    Activity,
    ChevronRight,
    Info
} from "lucide-react";

// Fallback assets if the common package is unreachable in the current environment
const AVAILABLE_ASSETS = ["BTC", "ETH", "SOL", "USDC", "LINK", "ARB"];

const AVAILABLE_TRIGGERS = [
    {
        id: "timer-trigger",
        title: "Timer Trigger",
        description: "Executes nodes based on a recurring time interval.",
        icon: Clock,
        color: "text-orange-500",
        bg: "bg-orange-500/10",
    },
    {
        id: "price-trigger",
        title: "Price Trigger",
        description: "Executes nodes when specific price thresholds are met.",
        icon: TrendingUp,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
    }
];

const DEFAULT_METADATA: Record<NodeKind, NodeMetadata> = {
    "timer-trigger": { time: 3600 },
    "price-trigger": { asset: AVAILABLE_ASSETS[0], price: 0 },
    hyperliquid: {},
    backpack: {},
    lighter: {},
};

interface TriggerSheetProps {
    onSelect: (kind: NodeKind, metadata: NodeMetadata) => void;
}

const TriggerSheet = ({ onSelect }: TriggerSheetProps) => {
    const [selectedTrigger, setSelectedTrigger] = useState<NodeKind>(
        AVAILABLE_TRIGGERS[0].id as NodeKind
    );

    const [metadata, setMetadata] = useState<NodeMetadata>(
        DEFAULT_METADATA["timer-trigger"]
    );

    const activeTrigger = AVAILABLE_TRIGGERS.find(t => t.id === selectedTrigger);

    return (
        <Sheet open={true}>
            <SheetContent className="bg-[#0f1117] border-slate-800 text-slate-100 sm:max-w-md overflow-y-auto">
                <SheetHeader className="space-y-1">
                    <div className="flex items-center gap-2 text-blue-500 mb-2">
                        <Zap size={18} fill="currentColor" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">New Logic Path</span>
                    </div>
                    <SheetTitle className="text-2xl font-bold tracking-tight text-white">
                        Configure Trigger
                    </SheetTitle>
                    <SheetDescription className="text-slate-400 text-sm">
                        Define the starting event for your automated trading workflow.
                    </SheetDescription>
                </SheetHeader>

                <div className="mt-8 space-y-8">
                    {/* Trigger Selection Section */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <Label className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                                Trigger Type
                            </Label>
                            {activeTrigger && (
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${activeTrigger.bg} ${activeTrigger.color}`}>
                                    Live Feed
                                </span>
                            )}
                        </div>
                        <Select
                            value={selectedTrigger}
                            onValueChange={(value) => {
                                setSelectedTrigger(value as NodeKind);
                                setMetadata(DEFAULT_METADATA[value as NodeKind]);
                            }}
                        >
                            <SelectTrigger className="w-full bg-[#161922] border-slate-800 h-14 hover:border-slate-700 transition-all">
                                <SelectValue placeholder="Select trigger" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#161922] border-slate-800 text-slate-100">
                                <SelectGroup>
                                    {AVAILABLE_TRIGGERS.map(({ id, title, description, icon: Icon, color }) => (
                                        <SelectItem
                                            key={id}
                                            value={id}
                                            className="focus:bg-slate-800 focus:text-white py-3 cursor-pointer"
                                        >
                                            <div className="flex flex-col gap-0.5">
                                                <div className="flex items-center gap-2">
                                                    <Icon size={14} className={color} />
                                                    <span className="font-bold text-sm">{title}</span>
                                                </div>
                                                <span className="text-[10px] text-slate-500 font-medium">{description}</span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Configuration Parameters Section */}
                    <div className="space-y-4 pt-4 border-t border-slate-800/50">
                        <div className="flex items-center gap-2 mb-2">
                            <Settings2 size={14} className="text-blue-500" />
                            <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Parameters</h4>
                        </div>

                        {selectedTrigger === "timer-trigger" && (
                            <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                <Label htmlFor="timer-val" className="text-xs text-slate-300">Execution Interval (Seconds)</Label>
                                <div className="relative">
                                    <Input
                                        id="timer-val"
                                        className="bg-[#161922] border-slate-800 focus:ring-orange-500/20 focus:border-orange-500/50 h-11 pl-10"
                                        type="number"
                                        value={metadata.time}
                                        onChange={(e) =>
                                            setMetadata({ ...metadata, time: Number(e.target.value) })
                                        }
                                    />
                                    <Clock className="absolute left-3 top-3 text-slate-600" size={18} />
                                </div>
                                <p className="text-[10px] text-slate-500 italic">Recommended minimum: 60s to avoid rate limits.</p>
                            </div>
                        )}

                        {selectedTrigger === "price-trigger" && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                <div className="space-y-2">
                                    <Label className="text-xs text-slate-300">Target Asset</Label>
                                    <Select
                                        value={metadata.asset}
                                        onValueChange={(value) =>
                                            setMetadata({ ...metadata, asset: value })
                                        }
                                    >
                                        <SelectTrigger className="bg-[#161922] border-slate-800 h-11">
                                            <SelectValue placeholder="Select asset" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-[#161922] border-slate-800 text-slate-100">
                                            <SelectGroup>
                                                {AVAILABLE_ASSETS.map(asset => (
                                                    <SelectItem key={asset} value={asset} className="focus:bg-slate-800">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                                            {asset}
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="price-val" className="text-xs text-slate-300">Price Threshold (USD)</Label>
                                    <div className="relative">
                                        <Input
                                            id="price-val"
                                            className="bg-[#161922] border-slate-800 focus:ring-emerald-500/20 focus:border-emerald-500/50 h-11 pl-10"
                                            type="number"
                                            placeholder="0.00"
                                            value={metadata.price}
                                            onChange={(e) =>
                                                setMetadata({ ...metadata, price: Number(e.target.value) })
                                            }
                                        />
                                        <Activity className="absolute left-3 top-3 text-slate-600" size={18} />
                                        <span className="absolute right-3 top-3 text-[10px] font-bold text-slate-600">USDT</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <SheetFooter className="mt-12 flex flex-col gap-3 sm:flex-col">
                    <Button
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-12 rounded-xl transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 group"
                        onClick={() => onSelect(selectedTrigger, metadata)}
                    >
                        Create Engine Trigger
                        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <div className="flex items-center justify-center gap-2 text-[10px] text-slate-600 font-medium">
                        <Info size={12} />
                        Changes take effect immediately on next deployment.
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};

export default TriggerSheet;