import { Box } from "@mui/system";
import SideBar from "./SideBar";
import { Outlet, useLocation } from "react-router-dom";
export default function MainLayout() {
  const location = useLocation();

  return (
    <Box
      sx={{
        backgroundColor: "#1e1f22",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "row",
        width: "100%",
      }}
    >
      <Box>
        <SideBar />
      </Box>
      <Box
        sx={{
          overflowX: "scroll",
          width: "100%",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
          backgroundPosition: {
            xs: "98% 100%",
          },
          backgroundSize: "131px 233px",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
