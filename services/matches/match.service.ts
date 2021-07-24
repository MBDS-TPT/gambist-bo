import Config from '../../config/config.json';
import BasicService from '../basic.service';

export default class MatchService extends BasicService{

    async getAllMatch() {
        return await BasicService.fetchData(Config.Match.FindAll);
    }

    static async getPaginatedMatch(page: number, max: number, searchQuery: any={}) {
        const params = {
            page,
            max,
            ...searchQuery
        }
        return await BasicService.fetchData(Config.Match.FindAll, params);
    }

    static async PostMatch(match: any) {
        return BasicService.postData(Config.Match.Add, match);
    }

    static async EditMatch(match: any) {
        return BasicService.postData(Config.Match.Edit, match, 'PUT');
    }

    static async DeleteMatch(match: any) {
        return BasicService.postData(Config.Match.Delete, match, 'DELETE');
    }

    static async UpdateScore(match: any) {
        return BasicService.postData(Config.Match.UpdateScore, match, 'PUT');
    }

}