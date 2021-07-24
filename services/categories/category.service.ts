import Config from '../../config/config.json';
import BasicService from '../basic.service';

export default class CategoryService extends BasicService{

    async getAllCategories() {
        return await BasicService.fetchData(Config.Category.FindAll);
    }

    static async PostCategory(category: any) {
        return BasicService.postData(Config.Category.Add, category);
    }

    static async EditCategory(category: any) {
        return BasicService.postData(Config.Category.Edit, category, 'PUT');
    }

    static async DeleteCategory(category: any) {
        return BasicService.postData(Config.Category.Delete, category, 'DELETE');
    }

}