import { useState, useEffect } from "react";
import axios from "axios";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { ActionKind } from "./CreateWorkflow";
import {
    Zap,
    Settings2,
    ChevronRight,
    Wallet,
    Layers,
    ArrowUpDown,
    Hash,
    Activity,
    TrendingUp,
    Trash2
} from "lucide-react";

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
    },
    {
        id: "backpack",
        title: "Backpack",
        desc: "Execute orders via Backpack exchange.",
        icon: Wallet,
        color: "text-purple-500",
    },
    {
        id: "lighter",
        title: "Lighter",
        desc: "High-speed trading on Lighter protocol.",
        icon: Layers,
        color: "text-cyan-500",
    }
];

interface ActionSheetProps {
    onSelect: (kind: ActionKind, metadata: TradingMetadata) => void;
    onDelete?: () => void;
}

const ActionSheet = ({ onSelect, onDelete }: ActionSheetProps) => {
    const [selectedAction, setSelectedAction] = useState<ActionKind>("lighter");

    const [metadata, setMetadata] = useState<TradingMetadata>({
        type: "SHORT",
        quantity: 0,
        asset: [""],
    });

    /* ---------------- DYNAMIC ASSETS ---------------- */

    const [assets, setAssets] = useState<string[]>([]);
    const [assetSearch, setAssetSearch] = useState("");
    const [filteredAssets, setFilteredAssets] = useState<string[]>([]);
    const [loadingAssets, setLoadingAssets] = useState(false);

    useEffect(() => {
        fetchAssets();
    }, []);

    const fetchAssets = async () => {
        try {
            setLoadingAssets(true);
            const { data } = await axios.get("http://localhost:3001/api/assets");
            setAssets(data.assets || []);
            setFilteredAssets((data.assets || []).slice(0, 20));
        } catch (err) {
            console.error("Failed to fetch assets", err);
        } finally {
            setLoadingAssets(false);
        }
    };

    useEffect(() => {
        if (!assetSearch) {
            setFilteredAssets(assets.slice(0, 20));
        } else {
            const filtered = assets.filter(asset =>
                asset.toLowerCase().includes(assetSearch.toLowerCase())
            );
            setFilteredAssets(filtered.slice(0, 20));
        }
    }, [assetSearch, assets]);

    return (
        <Sheet open={true}>
            <SheetContent className="bg-slate-900/40 backdrop-blur-xl border border-white/[0.03] text-slate-100 sm:max-w-md overflow-y-auto">

                {/* HEADER */}
                <SheetHeader className="space-y-3 pb-6 border-b border-white/[0.03] relative">

                    {onDelete && (
                        <button
                            onClick={onDelete}
                            className="absolute top-0 right-0 h-10 w-10 flex items-center justify-center rounded-xl border border-white/[0.05] bg-white/[0.02] hover:bg-red-500/10 hover:border-red-500/30 transition-all group"
                        >
                            <Trash2
                                size={16}
                                className="text-slate-500 group-hover:text-red-400 transition-colors"
                            />
                        </button>
                    )}

                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600/10 border border-blue-600/20 rounded-2xl flex items-center justify-center">
                            <Activity size={18} className="text-blue-500" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">
                                Execution Module
                            </p>
                            <SheetTitle className="text-xl font-black tracking-tight text-white">
                                Configure Action
                            </SheetTitle>
                        </div>
                    </div>

                    <SheetDescription className="text-slate-500 text-sm leading-relaxed">
                        Define the trading parameters for this execution kernel.
                    </SheetDescription>
                </SheetHeader>

                {/* BODY */}
                <div className="mt-10 space-y-10">

                    {/* Exchange Selection */}
                    <div className="space-y-4">
                        <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                            Protocol Layer
                        </Label>

                        <div className="space-y-3">
                            {AVAILABLE_ACTIONS.map(({ id, title, desc, icon: Icon, color }) => (
                                <div
                                    key={id}
                                    onClick={() => setSelectedAction(id as ActionKind)}
                                    className={`cursor-pointer p-4 rounded-xl border transition-all ${selectedAction === id
                                        ? "border-blue-500/50 bg-blue-500/10"
                                        : "border-white/[0.03] hover:border-blue-500/30"
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon size={16} className={color} />
                                        <div>
                                            <div className="font-bold text-white text-sm">{title}</div>
                                            <div className="text-xs text-slate-500">{desc}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Trade Parameters */}
                    <div className="space-y-6 pt-6 border-t border-white/[0.03]">
                        <div className="flex items-center gap-2">
                            <Settings2 size={14} className="text-blue-500" />
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                                Trade Parameters
                            </h4>
                        </div>

                        {/* Position Type */}
                        <div className="grid grid-cols-2 gap-4">

                            <div className="space-y-2">
                                <Label className="text-xs text-slate-400">Position</Label>
                                <div className="flex gap-2">
                                    {["LONG", "SHORT"].map(type => (
                                        <button
                                            key={type}
                                            onClick={() =>
                                                setMetadata({ ...metadata, type: type as "LONG" | "SHORT" })
                                            }
                                            className={`flex-1 h-12 rounded-xl border transition-all ${metadata.type === type
                                                ? "bg-blue-600/20 border-blue-500"
                                                : "border-white/[0.05]"
                                                }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Asset Search */}
                            <div className="space-y-2 relative">
                                <Label className="text-xs text-slate-400">Asset</Label>

                                <Input
                                    type="text"
                                    placeholder="Type to search asset..."
                                    value={assetSearch}
                                    onChange={(e) => {
                                        setAssetSearch(e.target.value);
                                        setMetadata({ ...metadata, asset: [e.target.value] });
                                    }}
                                    className="h-12 bg-slate-900/30 border border-white/[0.03] focus:border-blue-600/30 rounded-xl"
                                />

                                {assetSearch && filteredAssets.length > 0 && (
                                    <div className="absolute z-50 mt-2 w-full max-h-60 overflow-y-auto bg-slate-900 border border-white/[0.05] rounded-xl shadow-xl">
                                        {filteredAssets.map(asset => (
                                            <div
                                                key={asset}
                                                onClick={() => {
                                                    setAssetSearch(asset);
                                                    setMetadata({ ...metadata, asset: [asset] });
                                                }}
                                                className="px-4 py-2 text-sm text-slate-300 hover:bg-blue-600/20 cursor-pointer"
                                            >
                                                {asset}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {loadingAssets && (
                                    <div className="text-xs text-slate-500 mt-2">
                                        Loading assets...
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Quantity */}
                        <div className="space-y-2">
                            <Label className="text-xs text-slate-400">Position Size</Label>
                            <div className="relative">
                                <Input
                                    type="number"
                                    value={metadata.quantity}
                                    onChange={(e) =>
                                        setMetadata({ ...metadata, quantity: Number(e.target.value) })
                                    }
                                    className="h-12 bg-slate-900/30 border border-white/[0.03] focus:border-blue-600/30 rounded-xl pl-10"
                                />
                                <Hash className="absolute left-3 top-3 text-slate-600" size={16} />
                            </div>
                        </div>
                    </div>
                </div>

                <SheetFooter className="mt-12">
                    <Button
                        className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-900/20 text-[11px] uppercase tracking-[0.3em] font-black transition-all group"
                        onClick={() => onSelect(selectedAction, metadata)}
                    >
                        Deploy Action
                        <ChevronRight size={16} className="ml-3 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};

export default ActionSheet;