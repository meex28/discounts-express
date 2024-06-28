import { StationResponse } from "../station/dto";

export interface ConnectionResponse {
    id: string;
    departureStation: StationResponse;
    arrivalStation: StationResponse;
    departureTime: string;
    arrivalTime: string;
    trainCategory: string;
    trainNumber: number;
    trainName: string;
}