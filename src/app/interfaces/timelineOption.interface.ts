export interface TimelineOptionInterface {
    Restaurant?: TimelineOptionColumnInterface[],
    Spa?: TimelineOptionColumnInterface[],
    Hotel?: TimelineOptionColumnInterface[],
    Lavage?: TimelineOptionColumnInterface[],
    beginHour: string,
    endHour: string,
    rank: string,
    reportColumn: string,
    step: number,
    columnWidth?: number,
    leftColumnWidth?: number,
    columnHeight?: number,
    rankHotelData?: any[],
    rankRestaurantData?: any[],
    stepType?: "minute" | "hour" | "day" | "week" | "month"
}

export interface TimelineOptionColumnInterface {
    "fixed": boolean,
    "column": string,
    "columnData": string
}
