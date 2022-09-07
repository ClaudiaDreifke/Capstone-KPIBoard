export type AppUser = {
    id: string,
    username: string,
    passwordHash: string,
    emailAddress: string,
    role: string,
}

export type NewUser = {
    username: string,
    passwordHash: string,
    emailAddress: string,
    role: string,
}