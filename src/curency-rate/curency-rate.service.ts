import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {DataSource, Repository} from "typeorm";
import {CurencyRateEntity} from "../entities/CurencyRates.entity";
import axios, {AxiosResponse} from "axios";
import {ConfigurationEntity} from "../entities/Configurations.entity";
import {FlagEntity} from "../entities/Flags.entity";

@Injectable()
export class CurencyRateService {
    constructor(
        @InjectRepository(CurencyRateEntity)
        private curencyRateService: Repository<CurencyRateEntity>,
        @InjectRepository(ConfigurationEntity)
        private configurationService: Repository<ConfigurationEntity>,
        @InjectRepository(FlagEntity)
        private flagService: Repository<FlagEntity>,
        private dataSource: DataSource
    ) {
    }

    // Obtenir tous les taux de changes
    findAll(date: Date): Promise<CurencyRateEntity[]> {
        //this.dataSource.setOptions({logging: true});
        return this.curencyRateService.createQueryBuilder('cr')
            .where('cr.date = :date', {date: date.toISOString().split('T')[0]})
            .getMany();
    }

    // Obtenir un taux de change par ID
    async findOne(id: number): Promise<CurencyRateEntity> {
        return await this.curencyRateService.findOne({
            where: {id},
        });
    }
    // Obtenir un taux de change par ID
    async findOneBy(col: string, value: string, date: string = ''): Promise<CurencyRateEntity> {
        const query = this.curencyRateService.createQueryBuilder('entity')
            .where('entity.' + col + ' = :value', {value});//
        if (date !== '') {
            query.andWhere('entity.date = :date', {date})
        }
        return await query.getOne();
    }

    // Créer un nouvel taux de change
    async create(data: Partial<CurencyRateEntity>): Promise<CurencyRateEntity> {
        const typeFacture = await this.curencyRateService.save(data);
        return this.findOne(typeFacture.id);
    }

    async getExchangeRate(date:Date): Promise<any> {
        const apiId = '1d372ceeeef940b389ff84cc1af57827';
        const url = `https://openexchangerates.org/api/latest.json?app_id=${apiId}`;

        const currencies = await this.configurationService.findOneBy({name: 'currencies'});
        if (currencies != null) {
            const response = await axios.get(url);
            for (let i = 0; i < currencies.value.length; i++) {
                let currencyValue: number = 0;
                const currency: any = currencies.value[i];
                //console.log(currency);
                if (currency.code != 'MGA') {
                    if (currency.code == 'USD') {
                        currencyValue = response.data.rates.MGA;
                    } else {
                        currencyValue = response.data.rates.MGA / response.data.rates[currency.code];
                    }
                    await this.create({
                        curencyCode: currency.code,
                        curencyName: currency.code,
                        date: date,
                        amount: currencyValue,
                        flag: currency.flag
                    });
                }
            }
        }
        return await this.findAll(date);
    }
}
