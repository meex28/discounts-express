export interface Station {
    code: number;
    name: string;
}

export interface ConnectionSection {
    departureStationCode: number,
    arrivalStationCode: number,
    departureTime: string,
    arrivalTime: string,
    trainCategory: string,
    trainNumber: number,
    trainName: string
}

export interface Connection {
    departureStationCode: number,
    arrivalStationCode: number,
    departureTime: string,
    arrivalTime: string,
    sections: ConnectionSection[]
}

export interface Price {
    placeTypeCode: number,
    priceTypeCode: number,
    priceTypeName: number,
    class: number,
    price: number
}