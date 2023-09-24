import { Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import SignIn from "./pages/SignUp";
import ConfirmAccount from "./pages/ConfirmAccount";
import ChangePassword from "./pages/ChangePassword";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<Login />}/>
        <Route path="signin" element={<SignIn/>}/>
        <Route path="confirmaccount/:token" element={<ConfirmAccount/>}/>
        <Route path="resetpassword" element={<ChangePassword />}/>
      </Route>
    </Routes>
  )
}

export default App;
