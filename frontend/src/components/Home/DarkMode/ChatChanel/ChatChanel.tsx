import { Grid } from "@mui/material";
import MainChat from "./MainChat";
import SideBar from "./SideBar";
function ChatChanel() {
    return (
        <Grid
            container
            className="chat-chanel"
            flexWrap={"nowrap"}
            height={"100vh"}
        >
            <Grid item xs={2} height={"unset"} minWidth={"241px"}>
                <SideBar />
            </Grid>
            <Grid item xs={10} height={"100%"}>
                <MainChat />
            </Grid>
        </Grid>
    );
}

export default ChatChanel;
