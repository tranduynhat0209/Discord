import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store";
import { getDMChannelWithUserId, sendDMMessage } from "../../store/dm-channels";
import { useParams } from "react-router-dom";
import { Message } from "./Channels";
import { fetchMessages } from "../../store/messages";

export const DMChannels: React.FunctionComponent = () => {
  const { userId } = useParams();
  const userChannel = useSelector(getDMChannelWithUserId(userId));
  const user = useSelector((state: AppState) =>
    state.entities.users.find((u) => u.id === userId)
  );
  const { dmChannels, pals } = useSelector((state: AppState) => {
    const dmChannels = state.entities.dmChannels;
    const users = state.entities.users;
    const self = state.auth.user!;
    const pals = dmChannels.map((channel) => {
      const palId =
        self.id === channel.userId0 ? channel.userId1 : channel.userId0;
      return users.find((user) => user.id === palId);
    });
    return { dmChannels, pals };
  });
  
  const [activePalId, setActivePalId] = useState(
    userId
  );
  return (
    <div>
      <h3>DM Channels</h3>
      {!userChannel && user && (
        <div onClick={() => setActivePalId(user.id)}>
          <img
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
            }}
            src={`${process.env.REACT_APP_CDN_URL}${user.avatarURL}`}
          />
          <h6>{user.username}</h6>
        </div>
      )}
      <div>
        {pals &&
          pals.map((pal) => {
            if (pal)
              return (
                <div onClick={() => setActivePalId(pal.id)}>
                  <img
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                    src={`${process.env.REACT_APP_CDN_URL}${pal.avatarURL}`}
                  />
                  <h6>{pal.username}</h6>
                </div>
              );
          })}
      </div>

      {activePalId && <DMMessages userId={activePalId} />}
    </div>
  );
};

export const DMMessages: React.FunctionComponent<{ userId: string }> = ({
  userId,
}) => {
  const [isUpdating, setIsUpdating] = useState<string | undefined>();
  const dispatch = useDispatch();
  const dmChannel = useSelector(getDMChannelWithUserId(userId));
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
                sendDMMessage({
                  to: userId,
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
