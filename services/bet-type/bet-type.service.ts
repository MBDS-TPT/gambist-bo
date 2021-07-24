import Config from '../../config/config.json';
import BasicService from '../basic.service';

export default class BetTypeService extends BasicService{

    async getAllBetType() {
        return await BasicService.fetchData(Config.BetType.FindAll);
    }

    static async PostBetType(betType: any) {
        return BasicService.postData(Config.BetType.Add, betType);
    }

    static async EditBetType(betType: any) {
        return BasicService.postData(Config.BetType.Edit, betType, 'PUT');
    }

    static async DeleteBetType(betType: any) {
        return BasicService.postData(Config.BetType.Delete, betType, 'DELETE');
    }

}