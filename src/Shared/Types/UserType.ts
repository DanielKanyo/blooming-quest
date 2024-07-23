export type User = {
    firstName: string;
    lastName: string;
    email: string;
    id: string;
    roles: UserRoles[];
    totalCoin: number;
    gem: number;
    houseArea: HouseArea;
};

export type HouseArea = {
    [key: string]: string | null;
};

export enum UserRoles {
    ADMINISTRATOR = "ADMINISTRATOR",
    USER = "USER",
}
