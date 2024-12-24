import {Body, Controller, Get, Param, Patch} from '@nestjs/common';
import {FlagsService} from "../flags/flags.service";
import {FlagEntity} from "../entities/Flags.entity";
import axios from "axios";
import {AxiosResponse} from 'axios';
import {lastValueFrom} from "rxjs";
import {ReservationEntity} from "../entities/Reservation.entity";

@Controller('flags')
export class FlagsController {
    constructor(private readonly flagsService: FlagsService) {
    }


    @Get()
    async findAll(): Promise<any> {
        this.countries = await this.flagsService.findAllNoBase64();
        let result = [];
        this.countries.forEach(async (country, key) => {
            if (country.flagBase64 == null || country.flagBase64 == '') {
                const base = await this.getFlagBase64(country.flagUrl);
                country.flagBase64 = base;
                this.flagsService.update(country);
                setTimeout(() => {
                    //console.log(this.countries[key]);
                }, 1000);
            }

        });
        //return this.flagsService.bulkInsert(this.countries);
        let countries = await this.flagsService.findAll();
        /*if(countries.length == 0){
            await this.getCountries();
            this.countries.forEach(async (country, key) => {
                    const base = await this.getFlagBase64(country.flagUrl);
                    country.flagBase64 = base;
                    this.flagsService.create(country);
                    setTimeout(() => {
                        console.log(this.countries[key]);
                    }, 1000);

            });
            return await this.flagsService.findAll();
        }*/
        return countries;
    }

    countries: any[] = [];

    async getCountries() {
        try {
            // Requête à l'API REST Countries pour récupérer les pays
            const url = 'https://restcountries.com/v3.1/all?fields=name,flags,demonyms,currencies';
            const response = await axios.get(url);
            const $this = this;
            // Transformer chaque pays pour inclure le nom, la nationalité en français et le drapeau en base64
            response.data.forEach((country, key) => {
                const currencyCode = Object.keys(country.currencies)[0] || 'N/A';
                if (currencyCode != 'N/A') {
                    $this.countries.push({
                        name: country.name?.nativeName?.fra?.common || country.name?.common, // Nom en français
                        officialName: country.name?.official || country.name?.nativeName.eng.official, // Nom en français
                        flagUrl: country.flags?.png || country.flags?.svg, // Drapeau en Base64
                        nationality: country.demonyms?.fra?.m || country.demonyms?.eng?.m, // Nationalité en français (masculin)
                        currencyCode,
                        currencySymbol: currencyCode != 'N/A' ? country.currencies[currencyCode]?.symbol || currencyCode : 'N/A',
                        currencyName: currencyCode != 'N/A' ? country.currencies[currencyCode].name : 'N/A',
                        flagBase64: ''
                    });
                }
            })
        } catch (error) {
            throw new Error(`Erreur lors de la récupération des données des pays : ${error.message}`);
        }
    }

    // Télécharger l'image et la convertir en base64
    private async getFlagBase64(flagUrl: string): Promise<string> {
        try {
            const response = await axios.get(flagUrl, {responseType: 'arraybuffer'});
            const base64 = Buffer.from(response.data, 'binary').toString('base64');
            const mimeType = response.headers['content-type'];
            return `data:${mimeType};base64,${base64}`;
        } catch (error) {
            throw new Error(`Erreur lors de la récupération du drapeau : ${error.message}`);
        }
    }

    // Obtenir la monnaie en français
    private getCurrencyInFrench(currencies: any): string {
        if (!currencies) return 'N/A';

        const currencyCode = Object.keys(currencies)[0]; // Prendre la première monnaie
        const currency = currencies[currencyCode];

        // Retourner la description de la monnaie
        return currency;
    }
    // Endpoint pour modifie une réservation
    @Patch(':id')
    update(@Param('id') id: number, @Body() flag: FlagEntity): Promise<FlagEntity[]> {
        return this.flagsService.patch(id, flag);
    }

}

