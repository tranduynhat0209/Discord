import "./MainChat.scss";
import NumbersIcon from "@mui/icons-material/Numbers";
import Toolbar from "./Toolbar";
import FileUploadButton from "./UploadFile";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../../store";
import { useParams } from "react-router-dom";
import {
  createMessage,
  deleteMessage,
  fetchMessages,
  updateMessage,
} from "../../../../store/messages";
import { Entity } from "../../../../types";
import { Box, List, ListItem } from "@mui/material";
import { getUser } from "../../../../store/users";
import { Cancel, Delete, Edit } from "@mui/icons-material";

export const Message: React.FunctionComponent<{
  message: Entity.Message;
  isUpdating: string;
  setIsUpdating: any;
  setMessage: any;
}> = ({ message, isUpdating, setIsUpdating, setMessage }) => {
  const dispatch = useDispatch();
  const [hover, setHover] = useState(false);
  const user = useSelector((state: AppState) => state.auth.user!);
  const author = useSelector(getUser(message.authorId));
  return (
    <ListItem>
      <Box
        sx={{
          width: "100%",
          margin: "10px",
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            px: "10px",
            justifyContent: "space-between",
          }}
        >
          <h3
            style={{
              color: "white",
              marginBottom: "5px",
            }}
          >
            {author?.username}:
          </h3>

          {hover && user.id === message.authorId && (
            <Box>
              {isUpdating !== message.id && (
                <Edit
                  sx={{
                    color: "white",
                  }}
                  onClick={() => {
                    setIsUpdating(message.id);
                    setMessage(message.content);
                  }}
                />
              )}
              {
                <Delete
                  sx={{
                    color: "white",
                  }}
                  onClick={() =>
                    //@ts-ignore
                    dispatch(deleteMessage(message.id))
                  }
                />
              }
            </Box>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            paddingLeft: "10px",
          }}
        >
          <img
            src={`${process.env.REACT_APP_CDN_URL}${author?.avatarURL}`}
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
            }}
          />
          <Box
            sx={{
              height: "auto",
              padding: "10px",
              borderRadius: "4px",
              backgroundColor: "#2b2d31",
              color: "#fff",
              marginLeft: "10px",
              marginRight: "10px",
            }}
          >
            {message.content}
          </Box>
        </Box>
      </Box>
    </ListItem>
  );
};

export default function MainChat() {
  const [isUpdating, setIsUpdating] = useState<string | undefined>();
  const [message, setMessage] = useState("");
  const activeChannel = useSelector(
    (state: AppState) => state.ui.activeChannel
  );
  console.log(activeChannel);
  const channel = useSelector((state: AppState) =>
    state.entities.channels.find((c) => c.id === activeChannel?.id)
  );
  const channelType = channel?.type;
  const usersInChannel = useSelector((state: AppState) =>
    state.entities.users.filter(
      (u) => channel?.userIds && channel.userIds.includes(u.id)
    )
  );
  const dispatch = useDispatch();
  const messages = useSelector((state: AppState) =>
    state.entities.messages.list.filter(
      (m) => m && m.channelId === activeChannel?.id
    )
  );
  useEffect(() => {
    if (activeChannel)
      // @ts-ignore
      dispatch(fetchMessages(activeChannel.id));
  }, [activeChannel]);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };
  const handleFileUpload = (file: File) => {
    // Xử lý tệp tin đã chọn
    // console.log(file);
    console.log("hello");
  };
  const handleSendMessage = () => {
    if (!activeChannel || !channel || !message || message === "") {
      return;
    }
    dispatch(
      // @ts-ignore
      createMessage(activeChannel.id, {
        content: message,
      })
    );
  };

  const handleUpdateMessage = () => {
    if (!activeChannel || !channel || !message || message === "") {
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
          <span className="name">{channel?.name}</span>
        </div>
      </header>
      <main className="main-chat-container">
        <div className="chat">
          {channelType === "TEXT" && (
            <List
              sx={{ width: "100%", maxHeight: "80vh", overflow: "auto" }}
              ref={bottomRef}
            >
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
          )}

          {channelType === "VOICE" && (
            <Box
              sx={{
                width: "100%",
                maxHeight: "80vh",
                overflow: "auto",
                display: "flex",
                flexWrap: "wrap",
                padding: "10%",
              }}
            >
              {usersInChannel.map((user) => (
                <img
                  src={`${process.env.REACT_APP_CDN_URL}${user?.avatarURL}`}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    margin: "10px",
                  }}
                />
              ))}
            </Box>
          )}
        </div>
        {channelType === "TEXT" && (
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
        )}
      </main>
    </div>
  );
}
