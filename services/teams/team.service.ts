import Config from '../../config/config.json';
import BasicService from '../basic.service';

export default class TeamService extends BasicService{

    async getAllTeam() {
        return await BasicService.fetchData(Config.Team.FindAll);
    }

    static async getPaginatedTeam(page: number, max: number, searchQuery: any={}) {
        const params = {
            page,
            max,
            ...searchQuery
        }
        return await BasicService.fetchData(Config.Team.FindAll, params);
    }

    static async PostTeam(team: any) {
        return BasicService.postData(Config.Team.Add, team);
    }

    static async EditTeam(team: any) {
        return BasicService.postData(Config.Team.Edit, team, 'PUT');
    }

    static async DeleteTeam(team: any) {
        return BasicService.postData(Config.Team.Delete, team, 'DELETE');
    }

}