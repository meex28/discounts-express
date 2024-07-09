import { StationResponse } from "../station/dto";

export interface GetExternalConnectionRequest {
    departureStationCode: number;
    arrivalStationCode: number;
    departureTime: string;
}

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

export interface CreateConnectionRequest {
    departureStationCode: number;
    arrivalStationCode: number;
    departureTime: string;
}

export interface GetConnectionRequest {
    id: string;
}