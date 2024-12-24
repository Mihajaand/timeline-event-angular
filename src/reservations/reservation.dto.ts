import {IsOptional, IsString, IsNumber, IsBoolean} from 'class-validator';

export class UpdateReservationDto {
    @IsString()
    begin: string;

    @IsString()
    end: string;

    @IsString()
    texte: string;

    @IsOptional()
    @IsNumber()
    clientId: number | null;

    @IsOptional()
    @IsNumber()
    tableId: number | null;

    @IsString()
    beginHour: string;

    @IsString()
    endHour: string;

    @IsNumber()
    status: number;

    @IsOptional()
    @IsNumber()
    topPos: number | null;

    @IsOptional()
    @IsNumber()
    leftPos: number | null;

    @IsOptional()
    @IsNumber()
    width: string | null;

    @IsOptional()
    @IsString()
    eventText: string | null;

    @IsBoolean()
    actif: boolean;

    @IsOptional()
    @IsNumber()
    nbPerson: number;


    @IsString()
    commentaire: string;
}