import "./MainChat.scss";
import NumbersIcon from "@mui/icons-material/Numbers";
import Toolbar from "./Toolbar";
import FileUploadButton from "./UploadFile";
import { useState } from "react";

export default function MainChat() {
    const [chatMessages, setChatMessages] = useState<string[]>([]);
    const [message, setMessage] = useState("");
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };
    const handleFileUpload = (file: File) => {
        // Xử lý tệp tin đã chọn
        // console.log(file);
        console.log("hello");
    };
    const handleSendMessage = () => {
        if (message === "") {
            return;
        }
        const newChatMessage = message;

        setChatMessages([...chatMessages, newChatMessage]);
        setMessage("");
    };
    return (
        <div className="main-chat">
            <header className="main-chat-header">
                <div className="name-chanel">
                    <div className="icon">
                        <NumbersIcon />
                    </div>
                    <span className="name">Chung</span>
                </div>
                <Toolbar />
            </header>
            <main className="main-chat-container">
                <div className="chat">
                    {chatMessages.map((chatMessage, index) => (
                        <div className="chat-item" key={index}>
                            {chatMessage}
                        </div>
                    ))}
                </div>
                <div className="input-chat">
                    <div className="upload-file">
                        <FileUploadButton onUpload={handleFileUpload} />
                    </div>
                    <input
                        type="text"
                        placeholder="message"
                        className="input-message"
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                handleSendMessage();
                            }
                        }}
                        onChange={handleInputChange}
                        value={message}
                    />
                </div>
            </main>
        </div>
    );
}
