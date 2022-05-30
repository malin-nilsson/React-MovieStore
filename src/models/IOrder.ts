import { ICart } from "./ICart";

export interface IOrder {
    name: string,
    email: string,
    address: string,
    order: ICart[]
}