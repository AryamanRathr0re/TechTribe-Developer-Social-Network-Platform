import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Body from "./components/Body";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Landing from "./components/Landing";
import Connections from "./components/Connections";
import RequestConn from "./components/RequestConn";
import Chat from "./components/Chat";
import ProfileAnalytics from "./components/ProfileAnalytics";
import Onboarding from "./components/Onboarding";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <Body />
                </div>
              }
            >
              <Route index element={<Landing />} />
              <Route path="login" element={<Login />} />
              <Route path="profile" element={<Profile />} />
              <Route path="onboarding" element={<Onboarding />} />
              <Route path="feed" element={<Feed />} />
              <Route path="connections" element={<Connections />} />
              <Route path="request" element={<RequestConn />} />
              <Route path="chat/:targetUserId" element={<Chat />} />
              <Route path="analytics" element={<ProfileAnalytics />} />
              {/* Catch-all route for SPA - must be last */}
              <Route path="*" element={<Landing />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
