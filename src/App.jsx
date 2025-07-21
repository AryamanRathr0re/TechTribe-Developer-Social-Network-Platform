import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Body from "./components/Body";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Landing from "./components/Landing";

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
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
                            <Route path="/feed" element={<Feed/>} />
                                                        <Route path="/home" element={<Landing/>} />


            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
