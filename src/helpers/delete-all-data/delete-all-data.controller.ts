import {Controller, Delete} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {AllDataService} from "./delete-all-data.service";

@ApiTags('clear data for testing')
@Controller('delete-all-data')
export class AllDataController {

    constructor(private allDataService: AllDataService) {}

    @Delete()
    @ApiResponse({ status: 200, description: 'All data deleted' })
    async delete(){
       await this.allDataService.deleteAllData()
    }

}