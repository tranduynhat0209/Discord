import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { joinGuild } from "../../../../store/members";
import { Box } from "@mui/material";
import "./JoinNewServer.scss";
const JoinNewServer: React.FunctionComponent<{ handleClose }> = ({
  handleClose,
}) => {
  const [code, setCode] = useState<string>("");
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
        maxHeight: "720px",
        minHeight: "200px",
        borderRadius: "4px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          position: "relative",
        }}
      >
        <h2>Join New Server by Invite Code</h2>
        <CloseIcon
          sx={{
            position: "absolute",
            right: "10px",
            top: "-5px",
          }}
          onClick={() => handleClose()}
        />
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
          Enter your code:
        </label>
        <input
          type="text"
          id="input-name"
          onChange={(e) => setCode(e.target.value)}
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
      <div>
        <button
          className="join-guild"
          onClick={() => {
            if (code && code.length > 0) {
              // @ts-ignore
              dispatch(joinGuild(code));
              handleClose();
            }
          }}
        >
          Join Guild
        </button>
      </div>
    </Box>
  );
};

export default JoinNewServer;
