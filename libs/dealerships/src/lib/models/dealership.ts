import { IDetails } from '@child-poc/shared';

export interface IDealership {
    id: number;
    name: string;
    address: IAddress;
    inventory: IDetails[];
}

export interface IAddress {
    streetNumber: string;
    route: string;
    unit?: string;
    city: string;
    locality: string;
    country: string;
}
