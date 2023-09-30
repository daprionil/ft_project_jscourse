import { Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import SignIn from "./pages/SignUp";
import ConfirmAccount from "./pages/ConfirmAccount";
import ChangePasswordRequest from "./pages/ChangePasswordRequest";
import ChangePassword from "./pages/ChangePassword";
import PrivateRouteByAuth from "./components/PrivateRouteByAuth";
import ProfileLayout from "./layouts/ProfileLayout";
import NotFound404 from "./pages/NotFound404";
import AdminPacientes from "./pages/AdminPacientes";

function App() {
    return (
        <Routes>
            <Route path="/" element={<AuthLayout />}>
                <Route index element={<Login />} />
                <Route path="signin" element={<SignIn />} />
                <Route path="confirmaccount/:token" element={<ConfirmAccount />} />
                <Route path="resetpassword" element={<ChangePasswordRequest />} />
                <Route path="resetpassword/:tokenId" element={<ChangePassword />} />
            </Route>
            <Route path="/admin" element={<PrivateRouteByAuth Layout={ProfileLayout}/>}>
                <Route index element={<AdminPacientes/>} />
                <Route path="" element={<p></p>} />
                <Route path="" element={<p></p>} />
            </Route>
            <Route path="*" element={<NotFound404/>}/>
        </Routes>
    )
}

export default App;
