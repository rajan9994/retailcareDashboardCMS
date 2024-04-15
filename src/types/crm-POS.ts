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
