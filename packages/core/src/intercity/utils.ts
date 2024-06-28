/**
 * Map date to format required by external API
 * @param date - date to be converted
 * @returns - date in format 'YYYY-MM-DD HH:MM:SS'
 */
export const mapDateToExternalFormat = (date: Date): string => {
    const dateStr = date.toISOString().split('.')[0].replace('T', ' ');
    return dateStr;
}