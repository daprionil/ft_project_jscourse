import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
        <main
            className="grid grid-cols-1 md:grid-cols-2 mt-10 justify-items-center container mx-auto gap-4 px-3 items-center"
        >
            <Outlet />
        </main>
    </>
  )
}

export default AuthLayout