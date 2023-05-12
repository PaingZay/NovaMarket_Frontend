class ProductModel{
    id: number;
    productName?: string;
    description?: string;
    categoryId?: number;
    price?: number;
    sku?: number;
    discountPrice?: number;
    manufacturer?: string;
    imageUrl?: string;
    weight?: number;
    dimension?: string;

    constructor(id:number, productName:string, description:string, categoryId:number, price:number, sku:number, discountPrice:number, manufacturer:string, imageUrl:string, weight:number, dimension:string){
        this.id = id;
        this.productName = productName;
        this.description = description;
        this.categoryId = categoryId;
        this.price = price;
        this.sku = sku;
        this.discountPrice = discountPrice;
        this.manufacturer = manufacturer;
        this.imageUrl = imageUrl;
        this.weight = weight;
        this.dimension = dimension;
    }
}

export default ProductModel;