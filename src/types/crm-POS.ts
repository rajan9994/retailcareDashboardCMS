import { STATUS_LIST } from '../shared/constants';

export type Status = (typeof STATUS_LIST)[number];
export interface POS {
    id: number,
    name: string,
    description: string,
    status: string,
    type: number,
    sortOrder: number,
    notes: string,
}
export interface consultations{
    id: number,
    name: string,
    description: string,
    email: string,
    phoneNumber: string,
    company: string,
    status: string,
    sortOrder: number,
    notes: string,
}
