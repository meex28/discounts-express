export interface StationIcDto {
    code: number;
    name: string;
}

export interface ConnectionSectionIcDto {
    departureStationCode: number,
    arrivalStationCode: number,
    departureTime: string,
    arrivalTime: string,
    trainCategory: string,
    trainNumber: number,
    trainName: string
}

export interface ConnectionIcDto {
    departureStationCode: number,
    arrivalStationCode: number,
    departureTime: string,
    arrivalTime: string,
    sections: ConnectionSectionIcDto[]
}

export interface PriceIcDto {
    placeTypeCode: number,
    priceTypeCode: number,
    priceTypeName: string,
    class: number,
    price: number
}