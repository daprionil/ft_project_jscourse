import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
        <main
            className="container grid items-center grid-cols-1 gap-4 px-3 mx-auto mt-32 md:grid-cols-2 justify-items-center"
        >
            <Outlet />
        </main>
    </>
  )
}

export default AuthLayout;