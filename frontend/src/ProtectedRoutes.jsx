
import { Navigate } from "react-router-dom"

export const ProtectRoutes = ({ user, children }) => {
    if(!user) {
        return <Navigate to={"/landing-page"} replace/>
    }
    return children
}