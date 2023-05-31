import ChatChanelName from "./ChatChanelName";
import "./ChatChanelNames.scss";

export default function ChatChanelNames() {
    let arr = [
        { id: 1, name: "kenh-chat" },
        { id: 2, name: "kenh-thoai" },
    ];

    return (
        <ul className="chat-chanel-names">
            {arr.map((item, index) => {
                console.log(item, index);
                return (
                    <li key={index}>
                        <ChatChanelName nameOfChanel={item.name} />
                    </li>
                );
            })}
        </ul>
    );
}
