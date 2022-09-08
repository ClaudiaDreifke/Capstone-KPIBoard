export type AppUser = {
    id: string,
    username: string,
    passwordHash: string,
    emailAddress: string,
    userRole: string,
}

export type NewUser = {
    username: string,
    passwordHash: string,
    emailAddress: string,
    userRole: string,
}
