export class Category {
    id: number;
    categoryName: string;


    constructor(categoryName: string);
    constructor(categoryName: string, id?: number) {
        if (id) {
            this.id = id;
        }
        this.categoryName = categoryName;
    }
}