import ChatRoom from "./components/ChatRoom/index";
import SignIn from "./components/SignIn/index";
import PrivateRoute from "./components/PrivateRoute";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "./pages/NotFound";
import UsersAtRoom from "./components/ChatRoom/UsersAtRoom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route exact path="/" element={<ChatRoom />} />
        </Route>
        <Route exact path="/login" element={<SignIn />} />
        <Route exact path="/test" element={<UsersAtRoom />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
