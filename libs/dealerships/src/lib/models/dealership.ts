export interface IDealership {
    id: number;
    name: string;
    address: IAddress;
    inventory: {
        new: [];
        used: [];
    };
}

export interface IAddress {
    streetNumber: string;
    route: string;
    unit?: string;
    city: string;
    locality: string;
    country: string;
}
