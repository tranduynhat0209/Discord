import "./MainChat.scss";
import NumbersIcon from "@mui/icons-material/Numbers";
import Toolbar from "./Toolbar";
import FileUploadButton from "./UploadFile";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../../store";
import { useParams } from "react-router-dom";
import {
  deleteMessage,
  fetchMessages,
  updateMessage,
} from "../../../../store/messages";
import { Entity } from "../../../../types";
import { Box, List, ListItem } from "@mui/material";
import { getUser } from "../../../../store/users";
import { Cancel, Delete, Edit } from "@mui/icons-material";
import {
  getDMChannelWithUserId,
  sendDMMessage,
} from "../../../../store/dm-channels";
import { Message } from "../ChatChanel/MainChat";

export default function MainChat() {
  const [isUpdating, setIsUpdating] = useState<string | undefined>();
  const [message, setMessage] = useState("");
  const activeUser = useSelector((state: AppState) => state.ui.activeUser);
  const dmChannel = useSelector(
    getDMChannelWithUserId(activeUser ? activeUser.id : "")
  );
  const dispatch = useDispatch();
  const messages = useSelector((state: AppState) =>
    state.entities.messages.list.filter(
      (m) => m && m.channelId === dmChannel?.id
    )
  );
  useEffect(() => {
    if (dmChannel)
      // @ts-ignore
      dispatch(fetchMessages(dmChannel.id));
  }, [dmChannel]);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };
  const handleFileUpload = (file: File) => {
    // Xử lý tệp tin đã chọn
    // console.log(file);
    console.log("hello");
  };
  const handleSendMessage = () => {
    if (!activeUser || !message || message === "") {
      return;
    }
    dispatch(
      // @ts-ignore
      sendDMMessage({
        to: activeUser.id,
        content: message,
      })
    );
  };

  const handleUpdateMessage = () => {
    if (!activeUser || !message || message === "") {
      return;
    }
    dispatch(
      // @ts-ignore
      updateMessage(isUpdating, {
        content: message,
      })
    );
    setIsUpdating(undefined);
  };
  const bottomRef = useRef(null);
  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.lastElementChild?.scrollIntoView({
      behaviour: "smooth",
    });
  }, [messages]);
  return (
    <div className="main-chat">
      <header className="main-chat-header">
        <div className="name-chanel">
          <div className="icon">
            <NumbersIcon />
          </div>
          <span className="name">{activeUser?.username}</span>
        </div>
      </header>
      <main className="main-chat-container">
        <div className="chat">
          <List sx={{ width: "100%", maxHeight: '80vh', overflow: "auto" }} ref={bottomRef}>
            {messages &&
              messages.length > 0 &&
              messages.map((chatMessage, index) => (
                <Message
                  key={index}
                  message={chatMessage}
                  isUpdating={isUpdating}
                  setIsUpdating={setIsUpdating}
                  setMessage={setMessage}
                />
              ))}
          </List>
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
                setMessage("");
                if (!isUpdating) handleSendMessage();
                else {
                  handleUpdateMessage();
                }
              }
            }}
            onChange={handleInputChange}
            value={message}
          />
          {isUpdating && (
            <Cancel
              sx={{
                color: "white",
              }}
              onClick={() => {
                setIsUpdating(undefined);

                setMessage("");
              }}
            />
          )}
        </div>
      </main>
    </div>
  );
}
