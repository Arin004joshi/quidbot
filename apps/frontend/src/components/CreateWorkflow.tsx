import { useState, useCallback } from "react";
import axios from "axios";
import {
    ReactFlow,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
    type Edge,
    type NodeChange,
    type EdgeChange,
    useReactFlow,
    type Node as RFNode,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import TriggerSheet from "./TriggerSheet";
import ActionSheet from "./ActionSheet";
import Navbar from "./Navbar";

import Timer from "@/nodes/triggers/Timer";
import Price from "@/nodes/triggers/Price";
import Backpack from "@/nodes/actions/Backpack";
import Lighter from "@/nodes/actions/Lighter";
import Hyperliquid from "@/nodes/actions/Hyperliquid";

export type NodeKind =
    | "timer-trigger"
    | "price-trigger"
    | "hyperliquid"
    | "backpack"
    | "lighter";

export type ActionKind = "hyperliquid" | "backpack" | "lighter";

export type NodeMetadata = any;

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
    const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);

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

    /* ---------------- DELETE NODE ---------------- */

    const deleteNode = (nodeId: string) => {
        setNodes(prev => prev.filter(n => n.id !== nodeId));
        setEdges(prev =>
            prev.filter(e => e.source !== nodeId && e.target !== nodeId)
        );

        setSelectedNode(null);
        setShowTriggerSheet(false);
        setActionSheetData({ open: false, position: null, parentNode: null });
    };

    /* ---------------- EXECUTE WORKFLOW ---------------- */

    const executeWorkflow = async () => {
        try {
            const payload = {
                nodes,
                edges,
            };

            console.log("Sending Workflow:", payload);

            const { data } = await axios.post(
                "http://localhost:3001/api/workflow/execute",
                payload
            );

            console.log("Execution Result:", data);
            alert("Workflow Executed Successfully ✅");
        } catch (err) {
            console.error("Execution Failed:", err);
            alert("Execution Failed ❌");
        }
    };

    /* ---------------- REACTFLOW HANDLERS ---------------- */

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

    const onNodeClick = (_: any, node: WorkflowNode) => {
        setSelectedNode(node);

        if (node.data.type === "trigger") {
            setShowTriggerSheet(true);
        }
    };

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

                {/* Top-left: Add Trigger */}
                <button
                    onClick={() => setShowTriggerSheet(true)}
                    className="absolute top-6 left-6 z-20 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-xl text-sm font-semibold shadow-lg shadow-blue-600/20"
                >
                    + Add Trigger
                </button>

                {/* Top-right: Execute Workflow */}
                <button
                    onClick={executeWorkflow}
                    className="absolute top-6 right-6 z-20 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-xl text-sm font-semibold shadow-lg shadow-blue-600/20 uppercase tracking-widest"
                >
                    ▶ Deploy Workflow
                </button>

                {/* Trigger Sheet */}
                {showTriggerSheet && (
                    <TriggerSheet
                        onSelect={(kind, metadata) => {
                            const id = crypto.randomUUID();

                            setNodes(prev => [
                                ...prev,
                                {
                                    id,
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
                        onDelete={() =>
                            selectedNode && deleteNode(selectedNode.id)
                        }
                    />
                )}

                {/* Action Sheet */}
                {actionSheetData.open &&
                    actionSheetData.position &&
                    actionSheetData.parentNode && (
                        <ActionSheet
                            onSelect={(actionKind, metadata) => {
                                const id = crypto.randomUUID();

                                setNodes(prev => [
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

                                setEdges(prev => [
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
                            onDelete={() =>
                                selectedNode && deleteNode(selectedNode.id)
                            }
                        />
                    )}

                <ReactFlow
                    nodeTypes={nodeTypes}
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onConnectStart={onConnectStart}
                    onConnectEnd={onConnectEnd}
                    onNodeClick={onNodeClick}
                    fitView
                />
            </div>
        </div>
    );
};

export default CreateWorkflow;