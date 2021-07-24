import Config from '../../config/config.json';
import BasicService from '../basic.service';

export default class UserService extends BasicService{

    async getAllUser() {
        return await BasicService.fetchData(Config.User.FindAll);
    }

    static async PostUser(category: any) {
        return BasicService.postData(Config.User.Add, category);
    }

    static async EditUser(category: any) {
        return BasicService.postData(Config.User.Edit, category, 'PUT');
    }

    static async DeleteUser(category: any) {
        return BasicService.postData(Config.User.Delete, category, 'DELETE');
    }

}