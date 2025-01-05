"use client";

import {
	Background,
	type Connection,
	Controls,
	type Edge,
	type Node,
	ReactFlow,
	type ReactFlowInstance,
	ReactFlowProvider,
	addEdge,
	useEdgesState,
	useNodesState,
	useReactFlow,
} from "@xyflow/react";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import "@xyflow/react/dist/style.css";
import "@/styles/react-flow.css";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import CustomNode from "./custom-node";
import { NodePropertiesDialog } from "./node-properties-dialog";
import { NodeSidebar } from "./node-sidebar";
import type { NodeTypeData } from "./node-types";

interface AutomationData {
	id: string | number;
	name: string;
	description: string;
	nodes: Node[];
	edges: Edge[];
}

interface AutomationBuilderProps {
	initialData?: AutomationData;
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
		(params: Edge | Connection) => {
			const sourceNode = nodes.find((n) => n.id === params.source);
			const targetNode = nodes.find((n) => n.id === params.target);

			if (targetNode?.data.type.category === "trigger") {
				return;
			}

			setEdges((eds) =>
				addEdge({ ...params, data: { showDelete: false } }, eds),
			);
		},
		[nodes, setEdges],
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
				type: "custom",
				position,
				data: {
					label: nodeData.name,
					type: nodeData,
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

	const onEdgeClick = useCallback(
		(event: React.MouseEvent, edge: Edge) => {
			setSelectedEdge(edge);
			setEdges((eds) =>
				eds.map((e) => ({
					...e,
					data: {
						...e.data,
						showDelete: e.id === edge.id,
					},
				})),
			);
		},
		[setEdges],
	);

	const onEdgeUpdate = useCallback(
		(oldEdge: Edge, newConnection: Connection) => {
			const targetNode = nodes.find((n) => n.id === newConnection.target);

			if (targetNode?.data.type.category === "trigger") {
				return;
			}

			setEdges((els) =>
				els.map((el) =>
					el.id === oldEdge.id ? { ...el, ...newConnection } : el,
				),
			);
		},
		[nodes, setEdges],
	);

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
		(newData: any) => {
			setNodes((nodes) =>
				nodes.map((node) =>
					node.id === selectedNode?.id ? { ...node, data: newData } : node,
				),
			);
		},
		[selectedNode, setNodes],
	);

	const deleteEdge = useCallback(
		(edgeId: string) => {
			setEdges((edges) => edges.filter((e) => e.id !== edgeId));
			setSelectedEdge(null);
		},
		[setEdges],
	);

	const edgeTypes = {
		default: (props: any) => (
			<div className="relative">
				{props.data?.showDelete && (
					<div
						className="absolute cursor-pointer"
						style={{
							left: "50%",
							top: "50%",
							transform: "translate(-50%, -50%)",
						}}
						onClick={() => deleteEdge(props.id)}
					>
						<div className="bg-background dark:bg-muted rounded-full p-1 shadow-md">
							<X className="h-4 w-4 text-red-500" />
						</div>
					</div>
				)}
				<path
					className={`react-flow__edge-path ${
						props.data?.showDelete
							? "stroke-red-300 dark:stroke-red-400"
							: "dark:stroke-muted-foreground"
					}`}
					d={props.path}
					strokeWidth={2}
				/>
			</div>
		),
	};

	return (
		<div className="h-full flex rounded-lg border bg-background dark:bg-background overflow-hidden">
			<NodeSidebar onDragStart={onDragStart} />
			<div className="flex-grow relative border-l" ref={reactFlowWrapper}>
				<ReactFlow
					nodes={nodes}
					edges={edges}
					onNodesChange={onNodesChange}
					onEdgesChange={onEdgesChange}
					onConnect={onConnect}
					onInit={setReactFlowInstance}
					onDrop={onDrop}
					onDragOver={onDragOver}
					onNodeClick={onNodeClick}
					onEdgeClick={onEdgeClick}
					onEdgeUpdate={onEdgeUpdate}
					nodeTypes={{ custom: CustomNode }}
					edgeTypes={edgeTypes}
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
