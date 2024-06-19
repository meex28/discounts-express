import { Connection, ConnectionSection, Price, Station } from "./model";

// Mappings from Intercity API to internal model

type ModelMapping<T> = Record<keyof T, string>;

const stationMapping: ModelMapping<Station> = {
    code: 'kod',
    name: 'nazwa'
};

const connectionSectionMapping: ModelMapping<ConnectionSection> = {
    departureStationCode: 'stacjaWyjazdu',
    arrivalStationCode: 'stacjaPrzyjazdu',
    // TODO: check names
    departureTime: 'dataWyjazdu',
    arrivalTime: 'dataPrzyjazdu',
    trainCategory: 'kategoriaPociagu',
    trainNumber: 'nrPociagu',
    trainName: 'nazwaPociagu'
};

const connectionMapping: ModelMapping<Connection> = {
    departureStationCode: 'stacjaWyjazdu', // TODO: those names are computed from sections - think how to handle it
    arrivalStationCode: 'stacjaPrzyjazdu',
    departureTime: 'dataWyjazdu',
    arrivalTime: 'dataPrzyjazdu',
    sections: 'pociagi'
};

const priceMapping: ModelMapping<Price> = {
    placeTypeCode: 'rodzajMiejscaKod',
    priceTypeCode: 'cenaTypKod',
    priceTypeName: 'cenaTypNazwa',
    class: 'klasa',
    price: 'cena'
};

export const mapToStation = (data: Record<string, string>): Station => mapToModel<Station, typeof data>(data, stationMapping);

export const mapToConnection = (data: Record<string, any>): Connection => {
    const connection = mapToModel<Connection, typeof data>(data, connectionMapping);
    connection.sections = connection.sections.map(
        (section: Record<string, any>) => mapToModel<ConnectionSection, typeof section>(section, connectionSectionMapping)
    );
    connection.departureStationCode = connection.sections[0].departureStationCode;
    connection.arrivalStationCode = connection.sections[connection.sections.length - 1].arrivalStationCode;
    return connection;
}

export const mapToPrice = (data: Record<string, any>): Price => mapToModel<Price, typeof data>(data, priceMapping);

export function mapToModel<OUTPUT extends {}, INPUT extends {}>(data: INPUT, mappings: Record<keyof OUTPUT, keyof INPUT>): OUTPUT {
    return Object.keys(mappings).reduce((result, key) => {
        const inputKey = mappings[key as keyof OUTPUT];
        result[key] = data[inputKey];
        return result;
    }, {} as any);
}
