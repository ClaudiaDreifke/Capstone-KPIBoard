export type LogOutButtonProps = {
    logout: () => void,
}

export default function LogoutButton(props: LogOutButtonProps) {

    const handleLogout = () => {
        props.logout()
    }

    return (
        <>
            <button onClick={handleLogout}>Logout</button>
        </>
    )
}