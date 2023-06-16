import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ReactDOM } from "react";
import { Provider, useDispatch } from "react-redux";

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

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // @ts-ignore
    dispatch(ready());
    // @ts-ignore
    dispatch(fetchEntities());
  }, []);
  return (
    <BrowserRouter>
      <WSListener />
      <Routes>
        <Route path="/test-auth" element={<AuthTest />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/me" element={<Me />} />
        <Route path="/test-guild" element={<GuildTest />} />
        <Route path="/test-guild/:guildId/channels" element={<ChannelList />} />
        <Route path="/test-guild/:guildId/roles" element={<Roles />} />
        <Route path="/test-guild/:guildId/members" element={<Members/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
