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
import type { NodeKind, NodeMetadata } from "./CreateWorkflow";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Clock,
    TrendingUp,
    Zap,
    Settings2,
    Activity,
    ChevronRight,
    Trash2
} from "lucide-react";

const AVAILABLE_TRIGGERS = [
    {
        id: "timer-trigger",
        title: "Timer Trigger",
        description: "Executes nodes based on a recurring time interval.",
        icon: Clock,
    },
    {
        id: "price-trigger",
        title: "Price Trigger",
        description: "Executes nodes when specific price thresholds are met.",
        icon: TrendingUp,
    }
];

const DEFAULT_METADATA: Record<NodeKind, NodeMetadata> = {
    "timer-trigger": { time: 3600 },
    "price-trigger": { asset: "", price: 0 },
    hyperliquid: {},
    backpack: {},
    lighter: {},
};

interface TriggerSheetProps {
    onSelect: (kind: NodeKind, metadata: NodeMetadata) => void;
    onDelete?: () => void;
}

const TriggerSheet = ({ onSelect, onDelete }: TriggerSheetProps) => {
    const [selectedTrigger, setSelectedTrigger] = useState<NodeKind>(
        "timer-trigger"
    );

    const [metadata, setMetadata] = useState<NodeMetadata>(
        DEFAULT_METADATA["timer-trigger"]
    );

    // 🔥 Dynamic Assets State
    const [assets, setAssets] = useState<string[]>([]);
    const [assetSearch, setAssetSearch] = useState("");
    const [filteredAssets, setFilteredAssets] = useState<string[]>([]);
    const [loadingAssets, setLoadingAssets] = useState(false);

    /* ---------------- FETCH ASSETS ---------------- */

    useEffect(() => {
        if (selectedTrigger === "price-trigger" && assets.length === 0) {
            fetchAssets();
        }
    }, [selectedTrigger]);

    const fetchAssets = async () => {
        try {
            setLoadingAssets(true);
            const { data } = await axios.get("http://localhost:3001/api/assets");
            setAssets(data.assets || []);
            setFilteredAssets(data.assets || []);
        } catch (err) {
            console.error("Failed to fetch assets", err);
        } finally {
            setLoadingAssets(false);
        }
    };

    /* ---------------- FILTERING ---------------- */

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

                {/* Header */}
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
                            <Zap size={18} className="text-blue-500" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">
                                Logic Entry Point
                            </p>
                            <SheetTitle className="text-xl font-black tracking-tight text-white">
                                Configure Trigger
                            </SheetTitle>
                        </div>
                    </div>

                    <SheetDescription className="text-slate-500 text-sm leading-relaxed">
                        Define the event that initializes your execution sequence.
                    </SheetDescription>
                </SheetHeader>

                <div className="mt-10 space-y-10">

                    {/* Trigger Selection */}
                    <div className="space-y-4">
                        <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                            Trigger Type
                        </Label>

                        <div className="space-y-3">
                            {AVAILABLE_TRIGGERS.map(({ id, title, description, icon: Icon }) => (
                                <div
                                    key={id}
                                    onClick={() => {
                                        const kind = id as NodeKind;
                                        setSelectedTrigger(kind);
                                        setMetadata(DEFAULT_METADATA[kind]);
                                    }}
                                    className={`cursor-pointer p-4 rounded-xl border transition-all ${selectedTrigger === id
                                        ? "border-blue-500/50 bg-blue-500/10"
                                        : "border-white/[0.03] hover:border-blue-500/30"
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon size={16} className="text-blue-400" />
                                        <div>
                                            <div className="font-bold text-white text-sm">{title}</div>
                                            <div className="text-xs text-slate-500">{description}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Parameters */}
                    <div className="space-y-6 pt-6 border-t border-white/[0.03]">
                        <div className="flex items-center gap-2">
                            <Settings2 size={14} className="text-blue-500" />
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                                Parameters
                            </h4>
                        </div>

                        {/* Timer */}
                        {selectedTrigger === "timer-trigger" && (
                            <div className="space-y-3">
                                <Label className="text-xs text-slate-400">
                                    Execution Interval (Seconds)
                                </Label>

                                <div className="relative">
                                    <Input
                                        type="number"
                                        value={(metadata as any).time}
                                        onChange={(e) =>
                                            setMetadata({ ...metadata, time: Number(e.target.value) })
                                        }
                                        className="h-12 bg-slate-900/30 border border-white/[0.03] focus:border-blue-600/30 rounded-xl pl-10"
                                    />
                                    <Clock className="absolute left-3 top-3 text-slate-600" size={16} />
                                </div>
                            </div>
                        )}

                        {/* Price Trigger */}
                        {selectedTrigger === "price-trigger" && (
                            <div className="space-y-6">

                                {/* Asset Search */}
                                <div className="space-y-2 relative">
                                    <Label className="text-xs text-slate-400">Target Asset</Label>

                                    <Input
                                        type="text"
                                        placeholder="Type to search asset..."
                                        value={assetSearch}
                                        onChange={(e) => {
                                            setAssetSearch(e.target.value);
                                            setMetadata({ ...metadata, asset: e.target.value });
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
                                                        setMetadata({ ...metadata, asset });
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

                                {/* Price Threshold */}
                                <div className="space-y-2">
                                    <Label className="text-xs text-slate-400">
                                        Price Threshold (USD)
                                    </Label>

                                    <div className="relative">
                                        <Input
                                            type="number"
                                            value={(metadata as any).price}
                                            onChange={(e) =>
                                                setMetadata({ ...metadata, price: Number(e.target.value) })
                                            }
                                            className="h-12 bg-slate-900/30 border border-white/[0.03] focus:border-blue-600/30 rounded-xl pl-10"
                                        />
                                        <Activity className="absolute left-3 top-3 text-slate-600" size={16} />
                                        <span className="absolute right-3 top-3 text-[10px] font-bold text-slate-600">
                                            USD
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <SheetFooter className="mt-12">
                    <Button
                        className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-900/20 text-[11px] uppercase tracking-[0.3em] font-black transition-all group"
                        onClick={() => onSelect(selectedTrigger, metadata)}
                    >
                        Deploy Trigger
                        <ChevronRight size={16} className="ml-3 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </SheetFooter>

            </SheetContent>
        </Sheet>
    );
};

export default TriggerSheet;