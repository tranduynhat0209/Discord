import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { joinGuild } from "../../../../store/members";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import "./JoinNewServer.scss";
import { createChannel } from "../../../../store/channels";
import { ChannelTypes } from "../../../../types";
import { GifBoxRounded } from "@mui/icons-material";
const AddNewChannel: React.FunctionComponent<{
  guildId: string;
  handleClose;
}> = ({ handleClose, guildId }) => {
  const [newChannelName, setNewChannelName] = useState<string>();
  const [newChannelType, setNewChannelType] = useState<"TEXT" | "VOICE">(
    "TEXT"
  );
  const dispatch = useDispatch();
  return (
    <Box
      sx={{
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        textAlign: "center",
        width: "500px",
        minHeight: "400px",
        borderRadius: "4px",
        position: "relative",
      }}
    >
      <CloseIcon
        sx={{
          position: "absolute",
          right: "10px",
          top: "10px",
        }}
        onClick={() => handleClose()}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <h2>Create New Channel</h2>
      </Box>
      <form
        style={{
          marginTop: "20px",
        }}
      >
        <label
          htmlFor="input-name"
          style={{
            alignSelf: "baseline",
            marginBottom: "8px",
            fontSize: "12px",
            lineHeight: "16px",
            fontWeight: 700,
            textTransform: "uppercase",
            color: "#4e5058",
            marginRight: "5px",
          }}
        >
          Channel Name:
        </label>
        <input
          type="text"
          id="input-name"
          onChange={(e) => setNewChannelName(e.target.value)}
          style={{
            height: "40px",
            padding: "10px",
            outline: "none",
            border: "none",
            backgroundColor: "#e3e5e8",
            borderRadius: "3px",
            fontSize: "16px",
          }}
        />
      </form>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "60%",
        }}
      >
        <FormLabel
          id="demo-controlled-radio-buttons-group"
          style={{
            alignSelf: "baseline",
            marginBottom: "8px",
            fontSize: "12px",
            lineHeight: "16px",
            fontWeight: 700,
            textTransform: "uppercase",
            color: "#4e5058",
            marginRight: "10px",
          }}
        >
          Channel Type:
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={newChannelType}
          // @ts-ignore
          onChange={(e) => setNewChannelType(e.target.value)}
        >
          <FormControlLabel value="TEXT" control={<Radio />} label="Text" />
          <FormControlLabel value="VOICE" control={<Radio />} label="Voice" />
        </RadioGroup>
      </Box>
      <div>
        <button
          className="create-channel"
          onClick={() => {
            if (newChannelName && newChannelName.length > 0) {
              dispatch(
                // @ts-ignore
                createChannel(guildId, {
                  name: newChannelName,
                  type: ChannelTypes.Type[newChannelType],
                })
              );
              handleClose();
            }
          }}
        >
          Add New Channel
        </button>
      </div>
    </Box>
  );
};

export default AddNewChannel;
