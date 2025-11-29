import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "./ui/button"
import type { NodeKind } from "./CreateWorkflow"
import {
    Select,
    SelectGroup,
    SelectLabel,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react";
import type { NodeMetadata } from "./CreateWorkflow";

const AVAILABLE_TRIGGERS = [
    {
        id: "timer-trigger",
        title: "Timer Trigger",
        description: "Triggers the node every 5 mins"
    },
    {
        id: "price-trigger",
        title: "Price Trigger",
        description: "Triggers when price fluctuates"
    }
];

const DEFAULT_METADATA: Record<NodeKind, NodeMetadata> = {
    "timer-trigger": { time: 3600 },
    "price-trigger": { asset: "BTC", price: 1000 },
    hyperliquid: {},
    backpack: {},
    lighter: {},
};

const TriggerSheet = ({
    onSelect,
}: {
    onSelect: (kind: NodeKind, metadata: NodeMetadata) => void;
}) => {
    const [selectedTrigger, setSelectedTrigger] = useState<NodeKind>(
        AVAILABLE_TRIGGERS[0].id as NodeKind
    );

    const [metadata, setMetadata] = useState<NodeMetadata>(
        DEFAULT_METADATA["timer-trigger"]
    );

    return (
        <Sheet open={true}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Select trigger</SheetTitle>
                    <SheetDescription>
                        Select your desired trigger type
                    </SheetDescription>
                </SheetHeader>

                {/* Trigger Select */}
                <Select
                    value={selectedTrigger}
                    onValueChange={(value) => {
                        setSelectedTrigger(value as NodeKind);
                        setMetadata(DEFAULT_METADATA[value as NodeKind]);
                    }}
                >
                    <SelectTrigger className="w-full justify-center">
                        <SelectValue placeholder="Select trigger" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {AVAILABLE_TRIGGERS.map(({ id, title, description }) => (
                                <div key={id}>
                                    <SelectItem value={id}>{title}</SelectItem>
                                    <SelectLabel>{description}</SelectLabel>
                                </div>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                {selectedTrigger === "timer-trigger" && (
                    <div className="mt-4">
                        <label>Time (seconds)</label>
                        <input
                            className="border p-2 w-full"
                            type="number"
                            value={metadata.time}
                            onChange={(e) =>
                                setMetadata({ ...metadata, time: Number(e.target.value) })
                            }
                        />
                    </div>
                )}

                {selectedTrigger === "price-trigger" && (
                    <div className="mt-4 space-y-3">
                        <div>
                            <label>Asset</label>

                            <Select
                                value={metadata.asset}
                                onValueChange={(value) =>
                                    setMetadata({ ...metadata, asset: value })
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select asset" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="SOL">SOL</SelectItem>
                                        <SelectItem value="ETH">ETH</SelectItem>
                                        <SelectItem value="BTC">BTC</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label>Price</label>
                            <input
                                className="border p-2 w-full"
                                type="number"
                                value={metadata.price}
                                onChange={(e) =>
                                    setMetadata({ ...metadata, price: Number(e.target.value) })
                                }
                            />
                        </div>
                    </div>
                )}

                <SheetFooter className="pt-4">
                    <Button
                        onClick={() => onSelect(selectedTrigger, metadata)}
                        type="submit"
                    >
                        Create Trigger
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};


export default TriggerSheet 
