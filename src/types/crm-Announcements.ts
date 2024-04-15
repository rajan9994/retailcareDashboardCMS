import { STATUS_LIST } from '../shared/constants';

export type Status = (typeof STATUS_LIST)[number];
export interface Announcements {
    id: number,
    name: string,
    description: string,
    status: string,
    notes: string,
    sortOrder: number,
    type: number,
}
