export interface User {
    accessToken: string;
    refreshToken: string;
}

export interface AuthReult{
    authenticationResult: User
    challengeName: string
}