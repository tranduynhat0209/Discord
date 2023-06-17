import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import ChannelSideBar from "../../layout/ChannelSideBar";

export default function UserList() {
  return (
    <Box display={"flex"}>
      <ChannelSideBar />
      <Box width={"100%"}>
        <AppBar position="static" sx={{
            backgroundColor: "#303030"
        }}>
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, color: "white" }}
            >
              News
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </Box>
  );
}
