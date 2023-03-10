import {Controller, Delete} from '@nestjs/common';
import {AllDataService} from "./delete-all-data.service";

@Controller('delete-all-data')
export class AllDataController {

    constructor(private allDataService: AllDataService) {}

    @Delete()
    async delete(){
       await this.allDataService.deleteAllData()
    }

}