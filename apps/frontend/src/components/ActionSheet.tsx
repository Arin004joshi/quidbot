import  { useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
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
import type { ActionKind } from "./CreateWorkflow";
import {
    Zap,
    Settings2,
    ChevronRight,
    Info,
    Wallet,
    Layers,
    ArrowUpDown,
    Hash,
    Activity,
    TrendingUp // Added missing import
} from "lucide-react";

// Fallback assets if the common package is unreachable in the current environment
const AVAILABLE_ASSETS = ["BTC", "ETH", "SOL", "USDC", "LINK", "ARB"];

// Matching the TradingMetadata interface from your common/types
interface TradingMetadata {
    type: "LONG" | "SHORT";
    quantity: number;
    asset: string[];
}

const AVAILABLE_ACTIONS = [
    {
        id: "hyperliquid",
        title: "Hyperliquid",
        desc: "Trade on Hyperliquid decentralized exchange.",
        icon: Zap,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
    },
    {
        id: "backpack",
        title: "Backpack",
        desc: "Execute orders via Backpack exchange.",
        icon: Wallet,
        color: "text-purple-500",
        bg: "bg-purple-500/10",
    },
    {
        id: "lighter",
        title: "Lighter",
        desc: "High-speed trading on Lighter protocol.",
        icon: Layers,
        color: "text-cyan-500",
        bg: "bg-cyan-500/10",
    }
];

const DEFAULT_METADATA: Record<ActionKind, TradingMetadata> = {
    lighter: { type: "SHORT", quantity: 0, asset: [AVAILABLE_ASSETS[0]] },
    backpack: { type: "SHORT", quantity: 0, asset: [AVAILABLE_ASSETS[0]] },
    hyperliquid: { type: "SHORT", quantity: 0, asset: [AVAILABLE_ASSETS[0]] }
};

interface ActionSheetProps {
    onSelect: (kind: ActionKind, metadata: TradingMetadata) => void;
}

const ActionSheet = ({ onSelect }: ActionSheetProps) => {
    const [selectedAction, setSelectedAction] = useState<ActionKind>("lighter");
    const [metadata, setMetadata] = useState<TradingMetadata>(
        structuredClone(DEFAULT_METADATA["lighter"])
    );

    const activeAction = AVAILABLE_ACTIONS.find(a => a.id === selectedAction);

    return (
        <Sheet open={true}>
            <SheetContent className="bg-[#0f1117] border-slate-800 text-slate-100 sm:max-w-md overflow-y-auto">
                <SheetHeader className="space-y-1">
                    <div className="flex items-center gap-2 text-blue-500 mb-2">
                        <Activity size={18} fill="currentColor" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">New Execution Action</span>
                    </div>
                    <SheetTitle className="text-2xl font-bold tracking-tight text-white">
                        Configure Action
                    </SheetTitle>
                    <SheetDescription className="text-slate-400 text-sm">
                        Set up the specific trade parameters for this execution node.
                    </SheetDescription>
                </SheetHeader>

                <div className="mt-8 space-y-8">
                    {/* Action Selection Section */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <Label className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                                Exchange / Protocol
                            </Label>
                            {activeAction && (
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${activeAction.bg} ${activeAction.color}`}>
                                    Direct Access
                                </span>
                            )}
                        </div>
                        <Select
                            value={selectedAction}
                            onValueChange={(value) => {
                                const action = value as ActionKind;
                                setSelectedAction(action);
                                setMetadata(structuredClone(DEFAULT_METADATA[action]));
                            }}
                        >
                            <SelectTrigger className="w-full bg-[#161922] border-slate-800 h-14 hover:border-slate-700 transition-all">
                                <SelectValue placeholder="Select action" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#161922] border-slate-800 text-slate-100">
                                <SelectGroup>
                                    {AVAILABLE_ACTIONS.map(({ id, title, desc, icon: Icon, color }) => (
                                        <SelectItem
                                            key={id}
                                            value={id}
                                            className="focus:bg-slate-800 focus:text-white py-3 cursor-pointer"
                                        >
                                            <div className="flex flex-col gap-0.5 text-left">
                                                <div className="flex items-center gap-2">
                                                    <Icon size={14} className={color} />
                                                    <span className="font-bold text-sm">{title}</span>
                                                </div>
                                                <span className="text-[10px] text-slate-500 font-medium">{desc}</span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Configuration Parameters Section */}
                    <div className="space-y-6 pt-4 border-t border-slate-800/50">
                        <div className="flex items-center gap-2 mb-2">
                            <Settings2 size={14} className="text-blue-500" />
                            <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Trade Parameters</h4>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Order Type Select */}
                            <div className="space-y-2 animate-in fade-in slide-in-from-left-2 duration-300">
                                <Label className="text-xs text-slate-300">Side</Label>
                                <Select
                                    value={metadata.type}
                                    onValueChange={(value) =>
                                        setMetadata({ ...metadata, type: value as "LONG" | "SHORT" })
                                    }
                                >
                                    <SelectTrigger className="bg-[#161922] border-slate-800 h-11">
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#161922] border-slate-800 text-slate-100">
                                        <SelectGroup>
                                            <SelectItem value="LONG" className="focus:bg-slate-800 focus:text-emerald-400">
                                                <div className="flex items-center gap-2 text-emerald-500 font-bold">
                                                    <TrendingUp size={14} /> LONG
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="SHORT" className="focus:bg-slate-800 focus:text-red-400">
                                                <div className="flex items-center gap-2 text-red-500 font-bold">
                                                    <ArrowUpDown size={14} /> SHORT
                                                </div>
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Asset Select */}
                            <div className="space-y-2 animate-in fade-in slide-in-from-right-2 duration-300">
                                <Label className="text-xs text-slate-300">Target Asset</Label>
                                <Select
                                    value={metadata.asset[0] || ""}
                                    onValueChange={(value) =>
                                        setMetadata({ ...metadata, asset: [value] })
                                    }
                                >
                                    <SelectTrigger className="bg-[#161922] border-slate-800 h-11">
                                        <SelectValue placeholder="Asset" />
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
                        </div>

                        {/* Quantity Input */}
                        <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <Label htmlFor="quantity-val" className="text-xs text-slate-300">Quantity / Position Size</Label>
                            <div className="relative">
                                <Input
                                    id="quantity-val"
                                    className="bg-[#161922] border-slate-800 focus:ring-blue-500/20 focus:border-blue-500/50 h-11 pl-10"
                                    type="number"
                                    placeholder="0.00"
                                    value={metadata.quantity}
                                    onChange={(e) =>
                                        setMetadata({ ...metadata, quantity: Number(e.target.value) })
                                    }
                                />
                                <Hash className="absolute left-3 top-3 text-slate-600" size={18} />
                                <span className="absolute right-3 top-3 text-[10px] font-bold text-slate-600">
                                    {metadata.asset[0] || 'UNITS'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <SheetFooter className="mt-12 flex flex-col gap-3 sm:flex-col">
                    <Button
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-12 rounded-xl transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 group"
                        onClick={() => onSelect(selectedAction, metadata)}
                    >
                        Create Engine Action
                        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <div className="flex items-center justify-center gap-2 text-[10px] text-slate-600 font-medium">
                        <Info size={12} />
                        Action logic will be verified before deployment.
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};

export default ActionSheet;