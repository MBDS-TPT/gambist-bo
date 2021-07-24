export const GetTableColumn = (modelName: string) => {
    switch(modelName) {
        case ModelName.CATEGORY:
            return ["ID", "Label", "State"]
        case ModelName.TEAM:
            return ["ID", "Team Name", "Category", "State"]
        default:
            return []
    }
}

export const GetTableData = <Type>(modelName: string, data: Type[]) => {
    let objects: any[] = []
    switch(modelName) {
        case ModelName.CATEGORY:
            for(const obj of data) {
                objects.push([obj?.id, obj?.label, {"state": obj?.state}]);
            }
            return objects;
        case ModelName.TEAM:
            return ["ID", "Team Name", "Category", "State"]
        default:
            return []
    }
}

export default class ModelName {
    public static readonly CATEGORY = 'Category';
    public static readonly TEAM = 'Team';
} 