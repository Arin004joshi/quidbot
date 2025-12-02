import { useState, useCallback } from "react";
import {
    ReactFlow,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
    type NodeChange,
    type EdgeChange,
    useReactFlow
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import TriggerSheet from "./TriggerSheet";
import ActionSheet from "./ActionSheet";

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

interface NodeType {
    data: {
        type: "trigger" | "action";
        kind: NodeKind;
        metadata: NodeMetadata;
        label: string;
    };
    id: string;
    position: { x: number; y: number };
}

interface EdgeType {
    id: string;
    source: string;
    target: string;
}

const nodeTypes = {
    "timer-trigger": Timer,
    "price-trigger": Price,
    "backpack": Backpack,
    "lighter": Lighter,
    "hyperliquid": Hyperliquid,
};

const CreateWorkflow = () => {
    const [nodes, setNodes] = useState<NodeType[]>([]);
    const [edges, setEdges] = useState<EdgeType[]>([]);
    const [flowkey, setFlowkey] = useState(0);

    const reactFlowInstance = useReactFlow();

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
        (changes: NodeChange<NodeType>[]) =>
            setNodes((nds) => applyNodeChanges(changes, nds)),
        []
    );

    const onEdgesChange = useCallback(
        (changes: EdgeChange<EdgeType>[]) =>
            setEdges((eds) => applyEdgeChanges(changes, eds)),
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

    /** When user drags a connection and drops on empty space */
    const onConnectEnd = useCallback(
        (event: any) => {

            if (!dragSource) return;

            // Only trigger if drop is on empty space
            const targetIsPane =
                (event.target as HTMLElement).classList.contains("react-flow__pane");

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
        <div style={{ width: "100vw", height: "100vh" }}>
            {!nodes.length && (
                <TriggerSheet
                    onSelect={(kind, metadata) => {
                        setNodes((prev) => [
                            ...prev,
                            {
                                id: crypto.randomUUID(),
                                type: kind,
                                data: {
                                    type: "trigger",
                                    kind,
                                    metadata,
                                    label: kind,
                                },
                                position: { x: 0, y: 0 },
                            },
                        ]);
                        setFlowkey(k => k + 1)
                    }}
                />
            )}

            {actionSheetData.open && actionSheetData.position?.x !== undefined && actionSheetData.position?.y !== undefined && (
                <ActionSheet
                    onSelect={(actionKind: ActionKind, metadata) => {
                        const id = crypto.randomUUID();

                        // Add the action node
                        setNodes((prev) => [
                            ...prev,
                            {
                                id,
                                type: actionKind,
                                data: {
                                    type: "action",
                                    kind: actionKind,
                                    metadata,
                                    label: actionKind,
                                },
                                position: actionSheetData.position!,
                            },
                        ]);

                        // Connect it to trigger node
                        setEdges((prev) => [
                            ...prev,
                            {
                                id: `${actionSheetData.parentNode}-${id}`,
                                source: actionSheetData.parentNode!,
                                target: id,
                            },
                        ]);

                        // Close sheet
                        setActionSheetData({
                            open: false,
                            position: null,
                            parentNode: null,
                        });
                    }}
                />
            )}

            <ReactFlow
                key={flowkey}
                nodeTypes={nodeTypes}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onConnectStart={onConnectStart}
                onConnectEnd={onConnectEnd}
                fitView
            />
        </div>
    );
};

export default CreateWorkflow;
