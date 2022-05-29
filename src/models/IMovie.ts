export interface IMovie {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    year: string;
    productCategory: [{
        categoryId: number
    }];
}