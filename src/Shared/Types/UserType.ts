export type User = {
    firstName: string;
    lastName: string;
    email: string;
    id: string;
    roles: UserRoles[];
    totalXp: number;
};

export enum UserRoles {
    ADMINISTRATOR = "ADMINISTRATOR",
    USER = "USER",
}
