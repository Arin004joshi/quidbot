import { useState, useCallback } from "react";
import {
    ReactFlow,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
    type Node,
    type Edge,
    type NodeChange,
    type EdgeChange,
    useReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import TriggerSheet from "./TriggerSheet";
import ActionSheet from "./ActionSheet";

import Timer from "@/nodes/triggers/Timer";
import Price from "@/nodes/triggers/Price";

import Backpack from "@/nodes/actions/Backpack";
import Lighter from "@/nodes/actions/Lighter";
import Hyperliquid from "@/nodes/actions/Hyperliquid";
import type { Node as RFNode } from "@xyflow/react";
import Navbar from "./Navbar";

export type NodeKind =
    | "timer-trigger"
    | "price-trigger"
    | "hyperliquid"
    | "backpack"
    | "lighter";

export type ActionKind = "hyperliquid" | "backpack" | "lighter";

export type NodeMetadata = any;

/* ✅ Proper Node Type */
type WorkflowNode = RFNode<{
    type: "trigger" | "action";
    kind: NodeKind;
    metadata: NodeMetadata;
    label: string;
}>;

const nodeTypes = {
    "timer-trigger": Timer,
    "price-trigger": Price,
    backpack: Backpack,
    lighter: Lighter,
    hyperliquid: Hyperliquid,
};

const CreateWorkflow = () => {
    const [nodes, setNodes] = useState<WorkflowNode[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);

    const reactFlowInstance = useReactFlow();

    const [showTriggerSheet, setShowTriggerSheet] = useState(false);

    const [actionSheetData, setActionSheetData] = useState<{
        open: boolean;
        position: { x: number; y: number } | null;
        parentNode: string | null;
    }>({
        open: false,
        position: null,
        parentNode: null,
    });

    const onNodesChange = useCallback(
        (changes: NodeChange<WorkflowNode>[]) =>
            setNodes((nds) => applyNodeChanges<WorkflowNode>(changes, nds)),
        []
    );

    const onEdgesChange = useCallback(
        (changes: EdgeChange<Edge>[]) =>
            setEdges((eds) => applyEdgeChanges<Edge>(changes, eds)),
        []
    );

    const onConnect = useCallback(
        (params: any) => setEdges((eds) => addEdge(params, eds)),
        []
    );

    const [dragSource, setDragSource] = useState<string | null>(null);

    const onConnectStart = useCallback((_: any, { nodeId }: any) => {
        setDragSource(nodeId);
    }, []);

    const onConnectEnd = useCallback(
        (event: any) => {
            if (!dragSource) return;

            const targetIsPane = (event.target as HTMLElement).classList.contains(
                "react-flow__pane"
            );

            if (!targetIsPane) return;

            const pos = reactFlowInstance.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            if (isNaN(pos.x) || isNaN(pos.y)) return;

            setActionSheetData({
                open: true,
                position: pos,
                parentNode: dragSource,
            });
        },
        [dragSource, reactFlowInstance]
    );

    return (
        <div className="flex flex-col h-screen">

            <Navbar showActions={false} />

            <div className="relative flex-1">

                {/* Add Trigger Button */}
                <button
                    onClick={() => setShowTriggerSheet(true)}
                    className="absolute top-6 left-6 z-20 bg-blue-600 hover:bg-blue-500 transition-all px-4 py-2 rounded-xl text-sm font-semibold shadow-lg shadow-blue-600/20"
                >
                    + Add Trigger
                </button>

                {/* Empty State */}
                {!nodes.length && (
                    <div className="absolute inset-0 flex items-center justify-center text-center pointer-events-none">
                        <div>
                            <h2 className="text-xl font-bold text-slate-300 mb-2">
                                Start Building Your Workflow
                            </h2>
                            <p className="text-slate-500 text-sm">
                                Add a trigger to begin designing your trading automation.
                            </p>
                        </div>
                    </div>
                )}

                {/* Sheets */}
                {showTriggerSheet && (
                    <TriggerSheet
                        onSelect={(kind, metadata) => {
                            setNodes((prev) => [
                                ...prev,
                                {
                                    id: crypto.randomUUID(),
                                    type: kind,
                                    position: { x: 100, y: 100 },
                                    data: {
                                        type: "trigger",
                                        kind,
                                        metadata,
                                        label: kind,
                                    },
                                },
                            ]);
                            setShowTriggerSheet(false);
                        }}
                    />
                )}
                {actionSheetData.open &&
                    actionSheetData.position &&
                    actionSheetData.parentNode && (
                        <ActionSheet
                            onSelect={(actionKind: ActionKind, metadata) => {
                                const id = crypto.randomUUID();

                                setNodes((prev) => [
                                    ...prev,
                                    {
                                        id,
                                        type: actionKind,
                                        position: actionSheetData.position!,
                                        data: {
                                            type: "action",
                                            kind: actionKind,
                                            metadata,
                                            label: actionKind,
                                        },
                                    },
                                ]);

                                setEdges((prev) => [
                                    ...prev,
                                    {
                                        id: `${actionSheetData.parentNode}-${id}`,
                                        source: actionSheetData.parentNode!,
                                        target: id,
                                    },
                                ]);

                                setActionSheetData({
                                    open: false,
                                    position: null,
                                    parentNode: null,
                                });
                            }}
                        />
                    )}

                {/* CRITICAL: ReactFlow must fill parent */}
                <ReactFlow
                    nodeTypes={nodeTypes}
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onConnectStart={onConnectStart}
                    onConnectEnd={onConnectEnd}
                    fitView
                    style={{ width: "100%", height: "100%" }}
                />
            </div>
        </div>
    );
};

export default CreateWorkflow;