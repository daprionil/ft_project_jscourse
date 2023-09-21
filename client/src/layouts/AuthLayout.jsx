import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
        <main
            className="md:grid md:grid-cols-2 mt-10 justify-items-center container mx-auto"
        >
            <Outlet />
        </main>
    </>
  )
}

export default AuthLayout