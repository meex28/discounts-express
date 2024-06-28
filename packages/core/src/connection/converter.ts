import { randomUUID } from "crypto"
import { ConnectionIcDto } from "../intercity/model"
import { StationItem } from "../station/model"
import { ConnectionResponse } from "./dto"
import { ConnectionItem } from "./model/connection"

export const mapToConnection = (
    connection: ConnectionIcDto,
    departureStation: StationItem,
    arrivalStation: StationItem
): ConnectionItem => {
    return {
        id: randomUUID(),
        departureStationId: departureStation.id,
        arrivalStationId: arrivalStation.id,
        // from string like '2024-07-02 11:33:00' take only time part
        departureTime: connection.departureTime.split(' ')[1],
        arrivalTime: connection.arrivalTime.split(' ')[1],
        trainCategory: connection.sections[0].trainCategory,
        trainNumber: connection.sections[0].trainNumber,
        trainName: connection.sections[0].trainName
    }
}

export const mapToConnectionResponse = (connection: ConnectionItem, departureStation: StationItem, arrivalStation: StationItem): ConnectionResponse => {
    return {
        id: connection.id,
        departureStation: {
            id: departureStation.id,
            name: departureStation.name,
            code: departureStation.code
        },
        arrivalStation: {
            id: arrivalStation.id,
            name: arrivalStation.name,
            code: arrivalStation.code
        },
        departureTime: connection.departureTime,
        arrivalTime: connection.arrivalTime,
        trainCategory: connection.trainCategory,
        trainNumber: connection.trainNumber,
        trainName: connection.trainName
    }
}