import {Controller, Delete, HttpCode} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {AllDataService} from "./delete-all-data.service";

@ApiTags('endpoints for testing')
@Controller()
export class AllDataController {

    constructor(private allDataService: AllDataService) {}

    @Delete('delete-all-data')
    @HttpCode(204)
    @ApiResponse({ status: 204, description: 'All data deleted' })
    async delete(){
       await this.allDataService.deleteAllData()
    }

}