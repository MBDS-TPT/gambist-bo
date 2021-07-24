import Config from '../../config/config.json';
import BasicService from '../basic.service';

export default class BetService extends BasicService{

    async getAllBet() {
        return await BasicService.fetchData(Config.Bet.FindAll);
    }

    static async PostBet(betType: any) {
        return BasicService.postData(Config.Bet.Add, betType);
    }

    static async EditBet(betType: any) {
        return BasicService.postData(Config.Bet.Edit, betType, 'PUT');
    }

    static async DeleteBet(betType: any) {
        return BasicService.postData(Config.Bet.Delete, betType, 'DELETE');
    }

}