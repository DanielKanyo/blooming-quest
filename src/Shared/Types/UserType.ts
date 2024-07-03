export type User = {
    firstName: string;
    lastName: string;
    email: string;
    id: string;
    roles: UserRoles[];
};

export enum UserRoles {
    ADMINISTRATOR = "ADMINISTRATOR",
    USER = "USER",
}
