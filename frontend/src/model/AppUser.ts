export type AppUser = {
    id: string,
    username: string,
    password: string,
    emailAddress: string,
    userRole: string,
}

export type NewUser = {
    username: string,
    password: string,
    emailAddress: string,
    userRole: string,
}
