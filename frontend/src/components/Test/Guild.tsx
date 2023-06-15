import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store";
import { createGuild, getGuild, uploadGuildIcon } from "../../store/guilds";
import fetchEntities from "../../store/actions/fetch-entities";

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

export const GuildInfo: React.FunctionComponent<{ guildId: string }> = ({
  guildId,
}) => {
  const guild = useSelector(getGuild(guildId));
  const [file, setFile] = useState<File>();
  const dispatch = useDispatch();
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
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
    </div>
  );
};
