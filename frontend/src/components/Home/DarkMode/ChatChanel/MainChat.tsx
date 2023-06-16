import "./MainChat.scss";
import NumbersIcon from "@mui/icons-material/Numbers";
import Toolbar from "./Toolbar";

export default function MainChat() {
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
                <div className="chat"></div>
                <div className="input-chat">
                    <input type="text" placeholder="message" />
                </div>
            </main>
        </div>
    );
}
