export class InsuredItem {
    id: number;
    itemName: string;
    value: number;
    categoryId: number;

    constructor(id: number, itemName: string, value: number, categoryId: number) {
        this.id = id;
        this.itemName = itemName;
        this.value = value;
        this.categoryId = categoryId;
    }
}