export type User = {
    firstName: string;
    lastName: string;
    email: string;
    id: string;
    roles: UserRoles[];
    totalCoin: number;
    gem: number;
    houseAreaSlots: HouseAreaSlots;
};

export type HouseAreaSlots = {
    [key: string]: string | null;
};

export enum UserRoles {
    ADMINISTRATOR = "ADMINISTRATOR",
    USER = "USER",
}
