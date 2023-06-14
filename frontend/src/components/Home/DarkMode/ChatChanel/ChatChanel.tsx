import { Grid } from "@mui/material";
import MainChat from "./MainChat";
import SideBar from "./SideBar";
function ChatChanel() {
    return (
        <Grid container className="chat-chanel">
            <Grid item xs={2} height={"100%"} minWidth={"241px"}>
                <SideBar />
            </Grid>
            <Grid item xs={10}>
                <MainChat />
            </Grid>
        </Grid>
    );
}

export default ChatChanel;
