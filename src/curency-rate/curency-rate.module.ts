import {Module} from '@nestjs/common';
import {CurencyRateService} from './curency-rate.service';
import {CurencyRateController} from './curency-rate.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CurencyRateEntity} from "../entities/CurencyRates.entity";
import {HttpModule} from "@nestjs/axios";
import {ConfigurationEntity} from "../entities/Configurations.entity";
import {FlagEntity} from "../entities/Flags.entity";

@Module({
    imports: [TypeOrmModule.forFeature([CurencyRateEntity, ConfigurationEntity,FlagEntity]), HttpModule],
    providers: [CurencyRateService],
    controllers: [CurencyRateController]
})
export class CurencyRateModule {
}
