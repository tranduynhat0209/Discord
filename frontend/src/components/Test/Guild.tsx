import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store";
import {
  createGuild,
  fetchGuildInvites,
  getGuild,
  uploadGuildIcon,
} from "../../store/guilds";
import fetchEntities from "../../store/actions/fetch-entities";
import { createInvite } from "../../store/invites";
import { joinGuild, leaveGuild } from "../../store/members";

export const CreateGuild: React.FunctionComponent = () => {
  const [name, setName] = useState<string>("");
  const dispatch = useDispatch();
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div
      style={{
        margin: "5px",
      }}
    >
      <div>
        <input type="text" onChange={handleNameChange} />
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          //@ts-ignore
          if (name.length > 0) dispatch(createGuild(name));
        }}
      >
        Create new guild
      </button>
    </div>
  );
};

export const JoinGuild: React.FunctionComponent = () => {
  const [inviteCode, setInviteCode] = useState<string>("");
  const dispatch = useDispatch();
  const handleChangeInviteCode = (e) => {
    setInviteCode(e.target.value);
  };
  return (
    <div
      style={{
        margin: "5px",
      }}
    >
      <div>
        <input type="text" onChange={handleChangeInviteCode} />
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          //@ts-ignore
          if (inviteCode.length > 0) dispatch(joinGuild(inviteCode));
        }}
      >
        Join guild by Invite Code
      </button>
    </div>
  );
};
export const GuildInfo: React.FunctionComponent<{ guildId: string }> = ({
  guildId,
}) => {
  const guild = useSelector(getGuild(guildId));
  const activeInvite = useSelector((state: AppState) => state.ui.activeInvite);
  const invites = useSelector((state: AppState) =>
    state.entities.invites?.list.filter(
      (invite) => invite && invite.guildId === guildId
    )
  );
  const [file, setFile] = useState<File>();
  const dispatch = useDispatch();
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    //@ts-ignore
    dispatch(fetchGuildInvites(guildId));
  }, []);
  return (
    <div
      style={{
        marginTop: "10px",
        border: "1px solid black",
      }}
    >
      <div>{JSON.stringify(guild)}</div>
      <div>
        <input type="file" onChange={handleFileChange} />
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();

          if (file) {
            //@ts-ignore
            dispatch(uploadGuildIcon(guildId, file));
          }
        }}
      >
        Change guild icon
      </button>

      <div>Active Invitation Id: {JSON.stringify(activeInvite)}</div>

      <div>
        Invitation List:
        {invites ? (
          <ul>
            {invites.map((invite) => (
              <li key={invite.inviteCode}>{invite.inviteCode}</li>
            ))}
          </ul>
        ) : (
          ""
        )}
      </div>
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            //@ts-ignore
            dispatch(createInvite(guildId));
          }}
        >
          Generate Invitation
        </button>
      </div>
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            //@ts-ignore
            dispatch(leaveGuild(guildId));
          }}
        >
          Leave Guild
        </button>
      </div>
    </div>
  );
};

export const GuildList: React.FunctionComponent = () => {
  const guildIds = useSelector((state: AppState) => state.auth.user?.guildIds);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(guildIds);
    // @ts-ignore
    dispatch(fetchEntities(guildIds));
  }, [guildIds]);
  return (
    <div>
      {guildIds &&
        guildIds.map((guildId) => (
          <GuildInfo guildId={guildId} key={guildId} />
        ))}
    </div>
  );
};

export const Guild: React.FunctionComponent = () => {
  return (
    <div>
      <GuildList />
      <CreateGuild />
      <JoinGuild />
    </div>
  );
};
