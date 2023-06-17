import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./App.scss";
import { Auth as AuthTest } from "./components/Test/Auth";
import { VerifyPage } from "./components/Home/DarkMode/Auth/verify/Verify";
import { ready } from "./store/auth";
import WSListener from "./components/ws-listener";
import { Me } from "./components/Test/Me";
import { Guild as GuildTest } from "./components/Test/Guild";
import { ChannelList } from "./components/Test/Channels";
import fetchEntities from "./store/actions/fetch-entities";
import { Roles } from "./components/Test/Roles";
import { Members } from "./components/Test/Members";
import { Users } from "./components/Test/Users";
import { DMChannels } from "./components/Test/DM";
import Account from "./components/Home/DarkMode/UserProfile/Account";
import DarkMode from "./components/Home/DarkMode/DarkMode";
import AddNewServer from "./components/Home/DarkMode/AddNewServer/AddNewServer";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // @ts-ignore
    dispatch(ready());
    // @ts-ignore
    dispatch(fetchEntities());
  }, []);
  return (
    <div className="App">
    <BrowserRouter>
      <WSListener />
      <Routes>
        <Route path="/test-auth" element={<AuthTest />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/me" element={<Me />} />
        <Route path="/users" element={<Users />} />
        <Route path="/test-guild" element={<GuildTest />} />
        <Route path="/test-guild/:guildId/channels" element={<ChannelList />} />
        <Route path="/test-guild/:guildId/roles" element={<Roles />} />
        <Route path="/test-guild/:guildId/members" element={<Members />} />
        <Route path="/dm/:userId" element={<DMChannels />} />
        <Route path="/dm" element={<DMChannels />} />

        <Route path="/main">
          <Route path="" element={<DarkMode />} />
          <Route path="add-new-server" element={<AddNewServer/>} />
          <Route path="change-userinfo" element={<Account />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
