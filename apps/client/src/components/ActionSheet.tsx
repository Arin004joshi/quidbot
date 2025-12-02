import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import {
    Select,
    SelectGroup,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { useState } from "react";
import type { ActionKind } from "./CreateWorkflow";
import type { TradingMetadata } from "@/nodes/actions/Lighter";
import { AVAILABLE_ASSETS } from "./TriggerSheet";

const AVAILABLE_ACTIONS: { id: ActionKind; title: string; desc: string }[] = [
    { id: "lighter", title: "Lighter", desc: "Trade on Lighter" },
    { id: "backpack", title: "Backpack", desc: "Trade on Backpack" },
    { id: "hyperliquid", title: "Hyperliquid", desc: "Trade on Hyperliquid" }
];

const DEFAULT_METADATA: Record<ActionKind, TradingMetadata> = {
    lighter: { type: "SHORT", quantity: 0, asset: [] },
    backpack: { type: "SHORT", quantity: 0, asset: [] },
    hyperliquid: { type: "SHORT", quantity: 0, asset: [] }
};

export default function ActionSheet({
    onSelect,
}: {
    onSelect: (kind: ActionKind, metadata: TradingMetadata) => void;
}) {
    const [selectedAction, setSelectedAction] = useState<ActionKind>("lighter");
    const [metadata, setMetadata] = useState<TradingMetadata>(
        structuredClone(DEFAULT_METADATA["lighter"])
    );

    return (
        <Sheet open={true}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Select Action</SheetTitle>
                    <SheetDescription>Configure your action node</SheetDescription>
                </SheetHeader>

                {/* ACTION TYPE SELECT */}
                <label>Action</label>
                <Select
                    value={selectedAction}
                    onValueChange={(value) => {
                        const action = value as ActionKind;
                        setSelectedAction(action);
                        const cloned = JSON.parse(JSON.stringify(DEFAULT_METADATA[action]));
                        setMetadata(cloned);
                    }}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Action" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectGroup>
                            {AVAILABLE_ACTIONS.map((a) => (
                                <SelectItem key={a.id} value={a.id}>
                                    {a.title}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <div className="mt-4 space-y-4">

                    {/* ORDER TYPE */}
                    <div>
                        <label>Order Type</label>
                        <Select
                            value={metadata.type}
                            onValueChange={(value) =>
                                setMetadata({ ...metadata, type: value as "LONG" | "SHORT" })
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="SHORT">SHORT</SelectItem>
                                    <SelectItem value="LONG">LONG</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* QUANTITY */}
                    <div>
                        <label>Quantity</label>
                        <input
                            className="border p-2 w-full"
                            type="number"
                            value={metadata.quantity}
                            onChange={(e) =>
                                setMetadata({ ...metadata, quantity: Number(e.target.value) })
                            }
                        />
                    </div>

                    {/* ASSET */}
                    <div>
                        <label>Asset</label>
                        <Select
                            value={metadata.asset[0] ?? ""}
                            onValueChange={(value) =>
                                setMetadata({ ...metadata, asset: [value] })
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select asset" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectGroup>
                                    {AVAILABLE_ASSETS.map((asset) => (
                                        <SelectItem key={asset} value={asset}>
                                            {asset}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                </div>

                <SheetFooter className="pt-6">
                    <Button
                        onClick={() => onSelect(selectedAction, metadata)}
                    >
                        Create Action
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
