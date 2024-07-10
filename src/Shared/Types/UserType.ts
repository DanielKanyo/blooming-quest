export type User = {
    firstName: string;
    lastName: string;
    email: string;
    id: string;
    roles: UserRoles[];
    totalCoin: number;
    gem: number;
};

export enum UserRoles {
    ADMINISTRATOR = "ADMINISTRATOR",
    USER = "USER",
}
