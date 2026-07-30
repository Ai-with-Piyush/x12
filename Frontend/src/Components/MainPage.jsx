import { useState, useEffect } from "react";
import {
  SidebarIcon,
  MessageCircle,
  Wallet,
  PlusIcon,
  XIcon,
  UploadIcon,
  Settings,
  LogOut,
  HistoryIcon
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { API_URL } from "../config";

function MainApp() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const [showHistory, setShowHistory] = useState(false);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [userName, setUserName] = useState("");

  const token = localStorage.getItem("access_token");

  const fetchChats = () => {
    fetch(`${API_URL}/chat`, {
      headers: { authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setChatHistory(data));
  };

  useEffect(() => {
    fetch(`${API_URL}/profile`, {
      headers: { authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setUserName(data.user.name || data.user.email));
  }, []);

  useEffect(() => {
    fetchChats();
  }, []);

  const handleNewChat = async () => {
    const res = await fetch(`${API_URL}/chats`, {
      method: "POST",
      headers: { authorization: `Bearer ${token}` }
    });
    const newChat = await res.json();
    setChatHistory((prev) => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
    setMessages([]);
    setFiles([]);
  };

  const openChat = async (chatId) => {
    setCurrentChatId(chatId);
    const res = await fetch(`${API_URL}/chats/${chatId}/messages`, {
      headers: { authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setMessages(data);
  };

  const deleteChat = async (chatId) => {
    await fetch(`${API_URL}/chats/${chatId}`, {
      method: "DELETE",
      headers: { authorization: `Bearer ${token}` }
    });
    setChatHistory((prev) => prev.filter((c) => c.id !== chatId));
    if (currentChatId === chatId) {
      setCurrentChatId(null);
      setMessages([]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  async function HandleSubmit() {
    const question = inputText;
    if (!question.trim()) return;
    let activeChatId = currentChatId;

    if (!activeChatId) {
      const res = await fetch(`${API_URL}/chats`, {
        method: "POST",
        headers: { authorization: `Bearer ${token}` }
      });
      const newChat = await res.json();
      setChatHistory((prev) => [newChat, ...prev]);
      setCurrentChatId(newChat.id);
      activeChatId = newChat.id;
    }

    const formData = new FormData();
    formData.append("prompt", question);
    formData.append("chat_id", activeChatId);
    files.forEach((file) => formData.append("files", file));

    setInputText("");
    setMessages(prev => [...prev, { role: "user", content: question }]);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { authorization: `Bearer ${token}` },
        body: formData
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: "ai", content: data.answer }]);
      fetchChats();
    } catch (err) {
      setMessages(prev => [...prev, { role: "ai", content: "Something went wrong." }]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-white text-black min-h-screen  ">
      <div className="">
        <div className="flex justify-between  fixed top-0 inset-x-0 p-3">
          <button className="hover:cursor-pointer hover:bg-black hover:text-white rounded-md px-2" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <XIcon size={25} /> : <SidebarIcon size={25} />}
          </button>
          <h2 className="p-2 hover:cursor-pointer font-moonlight "> <b> X12 </b>AI</h2>
          <button className="hover:cursor-pointer hover:bg-[#5c5957] rounded-md  text-white bg-black px-1 font-bold">Share</button>
        </div>

        {isSidebarOpen && (
          <div className="flex flex-col gap-5 w-fit py-5 rounded-md text-sm mx-4 my-3 fixed top-14 left-0 z-10">
            <ul className="flex flex-col gap-4 ">
              <li onClick={handleNewChat} className="flex gap-1 items-center hover:bg-black hover:text-white   text-black w-[200px] rounded-md p-1 hover:cursor-pointer"><PlusIcon size={25} />New Chat</li>
              <li onClick={() => setShowHistory(!showHistory)} className="flex gap-1 items-center hover:bg-black hover:text-white   text-black w-[200px] rounded-md p-1 hover:cursor-pointer"><MessageCircle size={25} />Chat History</li>

              {showHistory && (
                <div className="flex flex-col gap-1 max-h-[200px] overflow-y-auto">
                  {chatHistory.map((chat) => (
                    <li key={chat.id} className="text-black font-bold text-xs w-[200px] rounded-md p-1 items-center gap-1 pl-8 truncate hover:bg-gray-200 flex justify-between hover:cursor-pointer">
                      <span onClick={() => openChat(chat.id)} className="flex items-center gap-1 truncate flex-1">
                         {chat.title}
                      </span>
                      <XIcon size={14} className="hover:text-red-500 shrink-0" onClick={() => deleteChat(chat.id)} />
                    </li>
                  ))}
                </div>
              )}
              <li onClick={() => navigate("/UpgradePlan")} className="flex gap-1 items-center hover:bg-black hover:text-white   text-black w-[200px] rounded-md p-1 hover:cursor-pointer"><Wallet size={25} />Upgrade</li>
            </ul>
            <span className="border border-gray-300"></span>
            <div className="flex items-center gap-2 w-[200px] p-1 mt-4 border border-gray-300 rounded-2xl">
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm">
                {userName ? userName.charAt(0).toUpperCase() : "?"}
              </div>
              <span className="flex-1 text-sm font-bold truncate">{userName}</span>
              <button className="hover:bg-black hover:text-white rounded-2xl p-1">
                <Settings size={18} />
              </button>
              <button onClick={handleLogout} className="hover:bg-black hover:text-white rounded-2xl p-1">
                <LogOut size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="pt-20 pb-40 px-4 max-w-3xl mx-auto flex flex-col gap-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
            <div
              className={`px-4 py-2 rounded-2xl max-w-[80%] ${
                msg.role === "user" ? "bg-gray-300 text-black whitespace-pre-wrap" : "bg-transparent text-black prose prose-sm max-w-none"
              }`}
            >
              {msg.role === "user" ? msg.content : <ReactMarkdown>{msg.content}</ReactMarkdown>}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex flex-col items-start">
            <span className="text-xs text-gray-500 mb-1 px-1">X12 AI</span>
            <div className="px-4 py-3 rounded-2xl bg-gray-100 flex gap-1">
              <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center items-center bottom-5 fixed inset-x-0">
        <div className="flex flex-col border border-black bg-white w-fit p-4 gap-3 rounded-md lg:w-[920px]">
          {files.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {files.map((file, i) => (
                <span key={i} className="flex items-center gap-2 bg-[#f5f5f5] px-2 py-1 rounded-md text-sm">
                  {file.name}
                  <XIcon size={14} className="cursor-pointer hover:text-red-400" onClick={() => removeFile(i)} />
                </span>
              ))}
            </div>
          )}

          <textarea
            name="text"
            placeholder="Search"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); HandleSubmit(); } }}
            className="w-fit outline-none resize-none font-bold p-2 lg:w-[880px]"
          ></textarea>
          <div className="flex justify-between">
            <button className="hover:bg-black hover:text-white rounded p-1 hover:cursor-pointer" onClick={() => document.getElementById("inputfile").click()}><PlusIcon size={20} /></button>
            <input type="file" multiple id="inputfile" className="hidden" accept="application/pdf" onChange={(e) => setFiles(Array.from(e.target.files))} />
            <button onClick={HandleSubmit} className="hover:bg-black hover:text-white rounded p-1"><UploadIcon size={20} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MainApp;