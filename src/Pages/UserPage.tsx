import { useContext } from "react";
import { UserContext } from "../Shared/User/UserContext";

export function UserPage() {
    const user = useContext(UserContext);

    return <div>User: {user.email}</div>;
}
