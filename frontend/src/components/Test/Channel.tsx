import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createChannel } from "../../store/channels";
import { ChannelTypes, Entity } from "../../types";
import { getGuildChannels } from "../../store/guilds";
import {
  createMessage,
  deleteMessage,
  fetchMessages,
  updateMessage,
} from "../../store/messages";
import { AppState } from "../../store";

export const ChannelList: React.FunctionComponent = () => {
  const { guildId } = useParams();
  const [newChannelName, setNewChannelName] = useState<string>();
  const [newChannelType, setNewChannelType] = useState<"TEXT" | "VOICE">(
    "TEXT"
  );
  const [activeChannelId, setActiveChannelId] = useState<string>();
  const dispatch = useDispatch();

  const channels = useSelector(getGuildChannels(guildId));

  return (
    <div
      style={{
        margin: "5px",
      }}
    >
      <h2>Guild: {guildId}</h2>

      <div>
        <h3>Create New Channel</h3>
        <p>Channel Name</p>
        <input
          type="text"
          onChange={(e) => {
            e.preventDefault();
            setNewChannelName(e.target.value);
          }}
        />
        <p>Channel Type</p>
        <div>
           {" "}
          <input
            type="radio"
            id="text"
            name="channel-type"
            value="TEXT"
            checked={newChannelType === "TEXT"}
            onChange={(e) => setNewChannelType("TEXT")}
          />
            <label>TEXT</label>
          <br /> {" "}
          <input
            type="radio"
            id="voice"
            name="channel-type"
            value="VOICE"
            checked={newChannelType === "VOICE"}
            onChange={(e) => setNewChannelType("VOICE")}
          />
            <label>VOICE</label>
        </div>
        <button
          onClick={() =>
            dispatch(
              //@ts-ignore
              createChannel(guildId, {
                name: newChannelName,
                type: ChannelTypes.Type[newChannelType],
              })
            )
          }
        >
          Create New Channel
        </button>
      </div>

      <div>
        <h3>Text Channels</h3>
        <div
          style={{
            margin: "5px",
          }}
        >
          {channels &&
            channels
              .filter((c) => c.type === "TEXT")
              .map((c) => (
                <div key={c.id}>
                  {JSON.stringify(c)}{" "}
                  {activeChannelId !== c.id ? (
                    <div
                      style={{
                        margin: "5px",
                      }}
                    >
                      <button onClick={() => setActiveChannelId(c.id)}>
                        Enter
                      </button>
                    </div>
                  ) : (
                    <ChannelMessages channelId={c.id} />
                  )}
                </div>
              ))}
        </div>
      </div>

      <div>
        <h3>Voice Channels</h3>
        <div
          style={{
            margin: "5px",
          }}
        >
          {channels &&
            channels
              .filter((c) => c.type === "VOICE")
              .map((c) => (
                <div key={c.id}>
                  {JSON.stringify(c)}{" "}
                  <div
                    style={{
                      margin: "5px",
                    }}
                  >
                    <button>Enter</button>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export const Message: React.FunctionComponent<{
  message: Entity.Message;
  isUpdating: string;
  setIsUpdating: any;
  setMessage: any;
}> = ({ message, isUpdating, setIsUpdating, setMessage }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.auth.user!);
  return (
    <div>
      <h6
        style={{
          color: user.id === message.authorId ? "green" : "red",
        }}
      >
        {message.authorId}:
      </h6>
      <p>{message.content}</p>
      {user.id === message.authorId && (
        <div>
          {isUpdating !== message.id ? (
            <button
              onClick={() => {
                setIsUpdating(message.id);
                setMessage(message.content);
              }}
            >
              Update
            </button>
          ) : (
            <button onClick={() => setIsUpdating(undefined)}>Cancel</button>
          )}
          {
            //@ts-ignore
            <button onClick={() => dispatch(deleteMessage(message.id))}>
              Delete
            </button>
          }
        </div>
      )}
    </div>
  );
};
export const ChannelMessages: React.FunctionComponent<{
  channelId: string;
}> = ({ channelId }) => {
  const [isUpdating, setIsUpdating] = useState<string | undefined>();
  const dispatch = useDispatch();
  const messages = useSelector((state: AppState) =>
    state.entities.messages.list.filter((m) => m && m.channelId === channelId)
  );
  
  useEffect(() => {
    // @ts-ignore
    dispatch(fetchMessages(channelId));
  }, []);
  const [message, setMessage] = useState<string>();
  return (
    <div
      style={{
        margin: "5px",
        border: "1px solid black",
      }}
    >
      <div>
        {messages &&
          messages.map((m) => (
            <div key={m.id}>
              <Message
                message={m}
                setIsUpdating={setIsUpdating}
                isUpdating={isUpdating}
                setMessage={setMessage}
              />
            </div>
          ))}
      </div>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => {
            e.preventDefault();
            setMessage(e.target.value);
          }}
        />
        {!isUpdating ? (
          <button
            onClick={() =>
              dispatch(
                // @ts-ignore
                createMessage(channelId, {
                  content: message,
                })
              )
            }
          >
            Send
          </button>
        ) : (
          <button
            onClick={() =>
              dispatch(
                // @ts-ignore
                updateMessage(isUpdating, {
                  content: message,
                })
              )
            }
          >
            Update
          </button>
        )}
      </div>
    </div>
  );
};


export const Voice: React.FunctionComponent<{channelId: string}> = ({
  channelId
}) => {
  return <div>
    
  </div>
}