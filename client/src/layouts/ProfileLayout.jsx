import Footer from "../components/Footer"
import Header from "../components/Header"

const ProfileLayout = ({children}) => {
    return (
        <>
            <Header/>
            <main className="container mx-auto mt-10">
                {
                    children
                }
            </main>
            <Footer />
        </>
    )
}

export default ProfileLayout