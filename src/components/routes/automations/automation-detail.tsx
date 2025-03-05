"use client";

import {
	Background,
	type Connection,
	Controls,
	type Edge,
	type EdgeChange,
	type EdgeProps,
	type Node,
	type NodeTypes,
	ReactFlow,
	type ReactFlowInstance,
	ReactFlowProvider,
	addEdge,
	applyEdgeChanges,
	useEdgesState,
	useNodesState,
	useReactFlow,
} from "@xyflow/react";
import type React from "react";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import "@xyflow/react/dist/style.css";
import "@/styles/react-flow.css";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import CustomNode from "./custom-node";
import { NodePropertiesDialog } from "./node-properties-dialog";
import { NodeSidebar } from "./node-sidebar";
import type { NodeTypeData } from "./node-types";
import { nodeTypes as availableNodeTypes } from "./node-types";

interface AutomationData {
	id: string | number;
	name: string;
	description: string;
	nodes: Node[];
	edges: Edge[];
	isActive?: boolean;
}

interface AutomationBuilderProps {
	initialData?: AutomationData;
}

// Generate node types mapping automatically from node-types.ts
const nodeTypes: NodeTypes = Object.fromEntries(
	availableNodeTypes.map((type) => [type.id, memo(CustomNode)]),
) as NodeTypes;

// Add this interface for node data
interface NodeData {
	label: string;
	properties: Record<string, unknown>;
}

const AutomationBuilderInner = ({ initialData }: AutomationBuilderProps) => {
	const reactFlowWrapper = useRef<HTMLDivElement>(null);
	const [nodes, setNodes, onNodesChange] = useNodesState(
		initialData?.nodes || [],
	);
	const [edges, setEdges, onEdgesChange] = useEdgesState(
		initialData?.edges || [],
	);
	const [reactFlowInstance, setReactFlowInstance] =
		useState<ReactFlowInstance | null>(null);
	const [selectedNode, setSelectedNode] = useState<Node | null>(null);
	const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);
	const { zoomIn, zoomOut, fitView } = useReactFlow();

	useEffect(() => {
		let resizeObserver: ResizeObserver;

		const resizeCallback = () => {
			if (reactFlowInstance) {
				window.requestAnimationFrame(() => {
					reactFlowInstance.fitView();
				});
			}
		};

		if (reactFlowWrapper.current) {
			resizeObserver = new ResizeObserver(() => {
				window.requestAnimationFrame(resizeCallback);
			});
			resizeObserver.observe(reactFlowWrapper.current);
		}

		return () => {
			if (resizeObserver && reactFlowWrapper.current) {
				resizeObserver.unobserve(reactFlowWrapper.current);
				resizeObserver.disconnect();
			}
		};
	}, [reactFlowInstance]);

	const onConnect = useCallback(
		(params: Connection) => {
			if (!params.source || !params.target) return;
			const edge: Edge = {
				id: `e${params.source}-${params.target}`,
				...params,
				type: "smoothstep",
			};
			setEdges((eds) => addEdge(edge, eds));
		},
		[setEdges],
	);

	const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = "move";
	}, []);

	const onDrop = useCallback(
		(event: React.DragEvent<HTMLDivElement>) => {
			event.preventDefault();

			if (!reactFlowWrapper.current || !reactFlowInstance) return;

			const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
			let nodeData: NodeTypeData;

			try {
				nodeData = JSON.parse(
					event.dataTransfer.getData("application/reactflow"),
				) as NodeTypeData;
			} catch (error) {
				console.error("Failed to parse dropped node data");
				return;
			}

			const {
				x: viewportX,
				y: viewportY,
				zoom,
			} = reactFlowInstance.getViewport();

			const position = {
				x: (event.clientX - reactFlowBounds.left - viewportX - 100) / zoom,
				y: (event.clientY - reactFlowBounds.top - viewportY - 40) / zoom,
			};

			const newNode: Node = {
				id: `${nodeData.id}-${nodes.length + 1}`,
				type: nodeData.id,
				position,
				data: {
					label: nodeData.name,
					properties: {},
				},
			};

			setNodes((nds) => nds.concat(newNode));
		},
		[reactFlowInstance, nodes, setNodes],
	);

	const onDragStart = (
		event: React.DragEvent<HTMLDivElement>,
		node: NodeTypeData,
	) => {
		event.dataTransfer.setData("application/reactflow", JSON.stringify(node));
		event.dataTransfer.effectAllowed = "move";
	};

	const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
		setSelectedNode(node);
	}, []);

	const handleEdgesChange = useCallback(
		(changes: EdgeChange[]) => {
			setEdges((eds) => applyEdgeChanges(changes, eds));
		},
		[setEdges],
	);

	const deleteEdge = useCallback(
		(edgeId: string) => {
			setEdges((edges) =>
				edges
					.map((e) => ({
						...e,
						data: {
							...e.data,
							showDelete: false,
						},
						selected: false,
					}))
					.filter((e) => e.id !== edgeId),
			);
			setSelectedEdge(null);
		},
		[setEdges],
	);

	const onEdgeClick = useCallback((event: React.MouseEvent, edge: Edge) => {
		setSelectedEdge(edge);
	}, []);

	const deleteNode = useCallback(() => {
		if (selectedNode) {
			setNodes((nodes) => nodes.filter((n) => n.id !== selectedNode.id));
			setEdges((edges) =>
				edges.filter(
					(e) => e.source !== selectedNode.id && e.target !== selectedNode.id,
				),
			);
			setSelectedNode(null);
		}
	}, [selectedNode, setNodes, setEdges]);

	const updateNodeData = useCallback(
		(newData: NodeData) => {
			setNodes((nodes) =>
				nodes.map((node) =>
					// biome-ignore lint/suspicious/noExplicitAny: <explanation>
					node.id === selectedNode?.id
						? { ...node, data: newData as any }
						: node,
				),
			);
		},
		[selectedNode, setNodes],
	);

	const onPaneClick = useCallback(() => {
		setSelectedEdge(null);
		setEdges((eds) =>
			eds.map((e) => ({
				...e,
				data: {
					...e.data,
					showDelete: false,
				},
				selected: false,
			})),
		);
	}, [setEdges]);

	return (
		<div className="h-full flex rounded-lg border bg-background dark:bg-background overflow-hidden">
			<NodeSidebar onDragStart={onDragStart} />
			<div className="flex-grow relative border-l" ref={reactFlowWrapper}>
				<ReactFlow
					nodes={nodes}
					edges={edges}
					onNodesChange={onNodesChange}
					onEdgesChange={handleEdgesChange}
					onConnect={onConnect}
					onInit={setReactFlowInstance}
					onDrop={onDrop}
					onDragOver={onDragOver}
					onNodeClick={onNodeClick}
					onEdgeClick={onEdgeClick}
					onPaneClick={onPaneClick}
					nodeTypes={nodeTypes}
					defaultEdgeOptions={{
						type: "smoothstep",
						animated: true,
					}}
					fitView
					proOptions={{ hideAttribution: true }}
					className="bg-background dark:bg-background [&_.react-flow__viewport]:dark:bg-background [&_.react-flow__handle]:dark:bg-background [&_.react-flow__edge]:dark:stroke-muted-foreground [&_.react-flow__connection-path]:dark:stroke-muted-foreground [&_.react-flow__controls]:bg-background [&_.react-flow__controls]:dark:bg-muted [&_.react-flow__controls-button]:border-border [&_.react-flow__controls-button]:dark:border-border [&_.react-flow__controls-button]:hover:bg-accent [&_.react-flow__controls-button]:dark:hover:bg-accent [&_.react-flow__controls-button]:text-foreground [&_.react-flow__controls-button]:dark:text-foreground [&_.react-flow__minimap]:bg-background [&_.react-flow__minimap]:dark:bg-muted [&_.react-flow__attribution]:text-muted-foreground [&_.react-flow__attribution]:dark:text-muted-foreground"
				>
					<Background gap={16} size={1} className="dark:bg-background" />
					<Controls />
				</ReactFlow>
			</div>
			<NodePropertiesDialog
				isOpen={!!selectedNode}
				onClose={() => setSelectedNode(null)}
				node={selectedNode}
				onDelete={deleteNode}
				onUpdate={updateNodeData}
			/>
		</div>
	);
};

const AutomationBuilder = (props: AutomationBuilderProps) => (
	<ReactFlowProvider>
		<AutomationBuilderInner {...props} />
	</ReactFlowProvider>
);

export default AutomationBuilder;
