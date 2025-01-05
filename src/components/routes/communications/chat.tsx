import EmojiPicker from "@/components/routes/communications/emoji-picker";
import { NewChatDialog } from "@/components/routes/communications/new-chat-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import {
	Camera,
	Check,
	Download,
	FileText,
	Mail,
	MoreHorizontal,
	Phone,
	Search,
	Send,
	Smile,
	Video,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Message {
	id: string;
	content: string;
	timestamp: string;
	type: "text" | "file" | "audio" | "video" | "image";
	sender: "user" | "other";
	fileDetails?: {
		name: string;
		size: string;
	};
	imageUrl?: string;
}

interface Chat {
	id: string;
	name: string;
	avatar: string;
	lastMessage: string;
	timestamp: string;
	unreadCount?: number;
	isOnline?: boolean;
	messages: Message[];
	channel: "sms" | "email" | "whatsapp";
}

const mockChats: Chat[] = [
	{
		id: "1",
		name: "James Wilson",
		avatar: "https://i.pravatar.cc/150?img=1",
		lastMessage: "Thank you for confirming...",
		timestamp: "10 minutes",
		unreadCount: 2,
		isOnline: true,
		channel: "email",
		messages: [
			{
				id: "1",
				content:
					"Hi James, your dental check-up appointment is confirmed for tomorrow at 2 PM. Please arrive 10 minutes early to complete any necessary paperwork.",
				timestamp: "10:30 AM",
				type: "text",
				sender: "user",
			},
			{
				id: "2",
				content: "Thank you for the reminder. I'll be there on time.",
				timestamp: "10:45 AM",
				type: "text",
				sender: "other",
			},
			{
				id: "3",
				content:
					"Great! Don't forget to bring your dental insurance card if you have one.",
				timestamp: "10:50 AM",
				type: "text",
				sender: "user",
			},
			{
				id: "4",
				content: "dental_care_instructions.pdf",
				timestamp: "10:55 AM",
				type: "file",
				sender: "user",
				fileDetails: {
					name: "dental_care_instructions.pdf",
					size: "1.2 MB",
				},
			},
		],
	},
	{
		id: "2",
		name: "Sofia Martinez",
		avatar: "https://i.pravatar.cc/150?img=2",
		lastMessage: "Thanks for the cleaning tips...",
		timestamp: "1 hour",
		channel: "sms",
		messages: [
			{
				id: "1",
				content:
					"Hi Sofia! Just following up on your recent cleaning. How are your gums feeling?",
				timestamp: "2:00 PM",
				type: "text",
				sender: "user",
			},
			{
				id: "2",
				content: "They're feeling much better, thanks for asking!",
				timestamp: "2:15 PM",
				type: "text",
				sender: "other",
			},
			{
				id: "3",
				content:
					"That's great to hear! Remember to floss daily and use the interdental brushes we recommended.",
				timestamp: "2:20 PM",
				type: "text",
				sender: "user",
			},
			{
				id: "4",
				content: "flossing_technique.mp4",
				timestamp: "2:25 PM",
				type: "video",
				sender: "user",
			},
		],
	},
	{
		id: "3",
		name: "Arun Patel",
		avatar: "https://i.pravatar.cc/150?img=3",
		lastMessage: "Can I reschedule my appointment...",
		timestamp: "Yesterday",
		unreadCount: 1,
		channel: "whatsapp",
		messages: [
			{
				id: "1",
				content:
					"Hello Arun, your braces adjustment appointment is scheduled for next week, Tuesday at 3 PM. We'll be checking your wire progression and possibly changing your elastic colors.",
				timestamp: "11:00 AM",
				type: "text",
				sender: "user",
			},
			{
				id: "2",
				content:
					"Thank you for the reminder. Can I reschedule it to Thursday same time?",
				timestamp: "11:30 AM",
				type: "text",
				sender: "other",
			},
			{
				id: "3",
				content:
					"I've rescheduled your appointment to Thursday at 3 PM. Please confirm if this works for you.",
				timestamp: "11:45 AM",
				type: "text",
				sender: "user",
			},
			{
				id: "4",
				content: "That's perfect, thank you!",
				timestamp: "12:00 PM",
				type: "text",
				sender: "other",
			},
		],
	},
	{
		id: "4",
		name: "Emma Thompson",
		avatar: "https://i.pravatar.cc/150?img=4",
		lastMessage: "Question about my insurance claim...",
		timestamp: "2 days",
		channel: "email",
		messages: [
			{
				id: "1",
				content:
					"Hi Emma, your claim #DC-2024-0342 for the recent root canal procedure has been processed. Please find attached the detailed breakdown of coverage.",
				timestamp: "9:00 AM",
				type: "text",
				sender: "user",
			},
			{
				id: "2",
				content: "claim_details_rootcanal.pdf",
				timestamp: "9:05 AM",
				type: "file",
				sender: "user",
				fileDetails: {
					name: "claim_details_rootcanal.pdf",
					size: "500 KB",
				},
			},
			{
				id: "3",
				content:
					"Thank you for processing the claim. I have a question about the co-pay amount. Can you please clarify?",
				timestamp: "10:30 AM",
				type: "text",
				sender: "other",
			},
			{
				id: "4",
				content:
					"The co-pay amount is based on your current plan. I'd be happy to explain in detail. What specific part of the co-pay calculation would you like clarified?",
				timestamp: "11:00 AM",
				type: "text",
				sender: "user",
			},
		],
	},
	{
		id: "5",
		name: "David Chen",
		avatar: "https://i.pravatar.cc/150?img=5",
		lastMessage: "Follow-up on emergency visit...",
		timestamp: "1 week",
		channel: "sms",
		messages: [
			{
				id: "1",
				content:
					"Hello David, how is your tooth feeling after the emergency procedure last week?",
				timestamp: "3:00 PM",
				type: "text",
				sender: "user",
			},
			{
				id: "2",
				content:
					"Much better now, the pain has subsided significantly. Thank you for checking in.",
				timestamp: "3:30 PM",
				type: "text",
				sender: "other",
			},
			{
				id: "3",
				content:
					"That's great to hear. Remember to avoid hard foods for another week and continue with the prescribed mouthwash.",
				timestamp: "3:45 PM",
				type: "text",
				sender: "user",
			},
			{
				id: "4",
				content: "post_procedure_care.pdf",
				timestamp: "3:50 PM",
				type: "file",
				sender: "user",
				fileDetails: {
					name: "post_procedure_care.pdf",
					size: "750 KB",
				},
			},
		],
	},
];

export default function ChatPage() {
	const [chats, setChats] = useState<Chat[]>(mockChats);
	const [selectedChat, setSelectedChat] = useState<Chat | null>(chats[0]);
	const [message, setMessage] = useState("");
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const filteredChats = chats.filter(
		(chat) =>
			chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const handleSendMessage = () => {
		if (!message.trim() || !selectedChat) return;

		const newMessage: Message = {
			id: Date.now().toString(),
			content: message,
			timestamp: new Date().toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
			}),
			type: "text",
			sender: "user",
		};

		setSelectedChat((prev) => {
			if (!prev) return prev;
			return {
				...prev,
				messages: [...prev.messages, newMessage],
				lastMessage: message,
				timestamp: "Just now",
			};
		});

		setChats((prevChats) =>
			prevChats.map((chat) =>
				chat.id === selectedChat.id
					? {
							...chat,
							messages: [...chat.messages, newMessage],
							lastMessage: message,
							timestamp: "Just now",
						}
					: chat,
			),
		);

		setMessage("");
	};

	const handleCreateChat = (name: string, channel: string) => {
		const newChat: Chat = {
			id: Date.now().toString(),
			name,
			avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
			lastMessage: "",
			timestamp: "Just now",
			messages: [],
			channel: channel as "sms" | "email" | "whatsapp",
			isOnline: true,
		};
		setChats((prevChats) => [newChat, ...prevChats]);
		setSelectedChat(newChat);
	};

	const getChannelIcon = (channel: string) => {
		switch (channel) {
			case "sms":
				return <Phone className="h-4 w-4" />;
			case "email":
				return <Mail className="h-4 w-4" />;
			case "whatsapp":
				return <Send className="h-4 w-4" />;
			default:
				return null;
		}
	};

	const handleEmojiSelect = (emoji: any) => {
		setMessage((prev) => prev + emoji.native);
		setShowEmojiPicker(false);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}
	};

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file && selectedChat) {
			const reader = new FileReader();
			reader.onload = (event) => {
				const newMessage: Message = {
					id: Date.now().toString(),
					content: file.name,
					timestamp: new Date().toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
					}),
					type: "image",
					sender: "user",
					imageUrl: event.target?.result as string,
				};
				setSelectedChat((prev) => {
					if (!prev) return prev;
					return {
						...prev,
						messages: [...prev.messages, newMessage],
						lastMessage: "Sent an image",
						timestamp: "Just now",
					};
				});
				setChats((prevChats) =>
					prevChats.map((chat) =>
						chat.id === selectedChat.id
							? {
									...chat,
									messages: [...chat.messages, newMessage],
									lastMessage: "Sent an image",
									timestamp: "Just now",
								}
							: chat,
					),
				);
			};
			reader.readAsDataURL(file);
		}
	};

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
	};

	useEffect(() => {
		setTimeout(scrollToBottom, 100);
	}, [selectedChat?.messages]);

	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto";
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
		}
	}, [message]);

	return (
		<Card className="flex h-[calc(100vh-6rem)] overflow-hidden">
			{/* Left sidebar */}
			<div className="w-80 min-w-[320px] border-r flex flex-col bg-white">
				<div className="p-4 border-b">
					<div className="flex items-center justify-between mb-4">
						<h1 className="text-xl font-semibold">Chats</h1>
						<NewChatDialog onCreateChat={handleCreateChat} />
					</div>
					<div className="relative">
						<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
						<input
							placeholder="Search chats..."
							className="w-full pl-8 pr-4 py-2 border rounded-md"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>
				</div>
				<ScrollArea className="flex-1">
					{filteredChats.map((chat) => (
						<div
							key={chat.id}
							onClick={() => setSelectedChat(chat)}
							className={`py-4 cursor-pointer hover:bg-gray-50 ${
								selectedChat?.id === chat.id ? "bg-gray-50" : ""
							}`}
						>
							<div className="flex items-center gap-3 px-4">
								<div className="relative shrink-0">
									<Avatar>
										<AvatarImage src={chat.avatar} />
										<AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
									</Avatar>
									{chat.isOnline && (
										<span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
									)}
								</div>
								<div className="flex-1 min-w-0 w-[calc(100%-48px)]">
									<div className="flex justify-between items-start">
										<p className="text-sm font-medium text-gray-900 truncate max-w-[120px]">
											{chat.name}
										</p>
										<p className="text-xs text-gray-500 shrink-0">
											{chat.timestamp}
										</p>
									</div>
									<div className="flex justify-between items-center gap-2">
										<p className="text-sm text-gray-500 truncate flex items-center flex-1 min-w-0 max-w-[160px]">
											{getChannelIcon(chat.channel)}
											<span className="ml-1 truncate">{chat.lastMessage}</span>
										</p>
										{chat.unreadCount && (
											<span className="shrink-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-green-500 rounded-full">
												{chat.unreadCount}
											</span>
										)}
									</div>
								</div>
							</div>
						</div>
					))}
				</ScrollArea>
			</div>

			{/* Main chat area */}
			{selectedChat ? (
				<div className="flex-1 min-w-0 flex flex-col bg-white">
					<div className="shrink-0 p-4 border-b flex items-center justify-between">
						<div className="flex items-center space-x-4">
							<Avatar>
								<AvatarImage src={selectedChat.avatar} />
								<AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
							</Avatar>
							<div>
								<h2 className="text-base font-semibold">{selectedChat.name}</h2>
								{selectedChat.isOnline && (
									<p className="text-sm text-green-500">Online</p>
								)}
							</div>
						</div>
						<div className="flex items-center space-x-2">
							<Button variant="ghost" size="icon">
								<Video className="h-5 w-5" />
							</Button>
							<Button variant="ghost" size="icon">
								<Phone className="h-5 w-5" />
							</Button>
							<Button variant="ghost" size="icon">
								<MoreHorizontal className="h-5 w-5" />
							</Button>
						</div>
					</div>

					<ScrollArea className="flex-1">
						<div className="flex flex-col p-4 gap-4">
							{selectedChat.messages.map((message) => (
								<div
									key={message.id}
									className={`flex flex-col ${
										message.sender === "user" ? "items-end" : "items-start"
									}`}
								>
									{message.type === "text" && (
										<div
											className={`max-w-md p-3 rounded-lg ${
												message.sender === "user"
													? "bg-blue-500 text-white"
													: "bg-gray-100"
											}`}
										>
											{message.content}
										</div>
									)}
									{message.type === "file" && (
										<div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg max-w-md">
											<div className="flex items-center space-x-3">
												<FileText className="h-8 w-8 text-blue-500" />
												<div>
													<p className="text-sm font-medium">
														{message.fileDetails?.name}
													</p>
													<p className="text-xs text-gray-500">
														{message.fileDetails?.size}
													</p>
												</div>
											</div>
											<div className="flex space-x-2">
												<Button variant="outline" size="sm">
													Preview
												</Button>
												<Button variant="outline" size="sm">
													<Download className="h-4 w-4" />
												</Button>
											</div>
										</div>
									)}
									{message.type === "image" && (
										<div className="max-w-md">
											<img
												src={message.imageUrl}
												alt="Uploaded"
												className="rounded-lg"
											/>
										</div>
									)}
									{(message.type === "audio" || message.type === "video") && (
										<div className="max-w-md p-3 bg-gray-100 rounded-lg">
											<p className="text-sm font-medium mb-2">
												{message.content}
											</p>
											<Button variant="outline" size="sm">
												{message.type === "audio" ? "Play Audio" : "Play Video"}
											</Button>
										</div>
									)}
									<span className="text-xs text-gray-500 mt-1">
										{message.timestamp}
									</span>
								</div>
							))}
							<div ref={messagesEndRef} />
						</div>
					</ScrollArea>

					<div className="shrink-0 p-4 border-t">
						<form
							onSubmit={(e) => {
								e.preventDefault();
								handleSendMessage();
							}}
							className="flex items-end space-x-2"
						>
							<div className="relative flex-1">
								<Textarea
									ref={textareaRef}
									value={message}
									onChange={(e) => setMessage(e.target.value)}
									onKeyDown={handleKeyDown}
									placeholder="Enter message..."
									className="pr-10 resize-none"
									rows={1}
								/>
								<Button
									type="button"
									variant="ghost"
									size="sm"
									className="absolute right-2 bottom-2"
									onClick={() => setShowEmojiPicker(!showEmojiPicker)}
								>
									<Smile className="h-5 w-5" />
								</Button>
								{showEmojiPicker && (
									<div className="absolute bottom-full right-0 mb-2">
										<EmojiPicker
											onEmojiSelect={(emoji: any) => {
												setMessage((prev) => prev + emoji.native);
												setShowEmojiPicker(false);
											}}
										/>
									</div>
								)}
							</div>
							<input
								type="file"
								accept="image/*"
								onChange={handleImageUpload}
								className="hidden"
								ref={fileInputRef}
							/>
							<Button
								type="button"
								variant="ghost"
								size="icon"
								onClick={() => fileInputRef.current?.click()}
							>
								<Camera className="h-5 w-5" />
							</Button>
							<Button type="submit" disabled={!message.trim()}>
								<Send className="h-4 w-4" />
							</Button>
						</form>
					</div>
				</div>
			) : (
				<div className="flex-1 flex items-center justify-center">
					<p className="text-gray-500">Select a chat to start messaging</p>
				</div>
			)}
		</Card>
	);
}
