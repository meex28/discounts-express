import { ConnectionIcDto, ConnectionSectionIcDto, PriceIcDto, StationIcDto } from "./model";

// Mappings from Intercity API to internal model

type ModelMapping<T> = Record<keyof T, string>;

const stationMapping: ModelMapping<StationIcDto> = {
    code: 'kod',
    name: 'nazwa'
};

const connectionSectionMapping: ModelMapping<ConnectionSectionIcDto> = {
    departureStationCode: 'stacjaWyjazdu',
    arrivalStationCode: 'stacjaPrzyjazdu',
    // TODO: check names
    departureTime: 'dataWyjazdu',
    arrivalTime: 'dataPrzyjazdu',
    trainCategory: 'kategoriaPociagu',
    trainNumber: 'nrPociagu',
    trainName: 'nazwaPociagu'
};

const connectionMapping: ModelMapping<ConnectionIcDto> = {
    departureStationCode: 'stacjaWyjazdu', // TODO: those names are computed from sections - think how to handle it
    arrivalStationCode: 'stacjaPrzyjazdu',
    departureTime: 'dataWyjazdu',
    arrivalTime: 'dataPrzyjazdu',
    sections: 'pociagi'
};

const priceMapping: ModelMapping<PriceIcDto> = {
    placeTypeCode: 'rodzajMiejscaKod',
    priceTypeCode: 'cenaTypKod',
    priceTypeName: 'cenaTypNazwa',
    class: 'klasa',
    price: 'cena'
};

export const mapToStation = (data: Record<string, string>): StationIcDto => mapToModel<StationIcDto, typeof data>(data, stationMapping);

export const mapToConnection = (data: Record<string, any>): ConnectionIcDto => {
    const connection = mapToModel<ConnectionIcDto, typeof data>(data, connectionMapping);
    connection.sections = connection.sections.map(
        (section: Record<string, any>) => mapToModel<ConnectionSectionIcDto, typeof section>(section, connectionSectionMapping)
    );
    connection.departureStationCode = connection.sections[0].departureStationCode;
    connection.arrivalStationCode = connection.sections[connection.sections.length - 1].arrivalStationCode;
    return connection;
}

export const mapToPrice = (data: Record<string, any>): PriceIcDto => mapToModel<PriceIcDto, typeof data>(data, priceMapping);

export function mapToModel<OUTPUT extends {}, INPUT extends {}>(data: INPUT, mappings: Record<keyof OUTPUT, keyof INPUT>): OUTPUT {
    return Object.keys(mappings).reduce((result, key) => {
        const inputKey = mappings[key as keyof OUTPUT];
        result[key] = data[inputKey];
        return result;
    }, {} as any);
}
