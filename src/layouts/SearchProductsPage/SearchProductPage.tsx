import { useEffect,useState } from "react";
import ProductModel from "../../Models/ProductModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { Pagination } from "../Utils/Pagination";
import { SearchProduct } from "./Components/SearchProduct";

function SearchProductPage(){
    
    const [products, setProducts] = useState<ProductModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(3);
    const [totalAmountOfProducts, setTotalAmountOfProducts] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState('');
    const [searchUrl, setSearchUrl] = useState('');
    const [categorySelection, setCategorySelection] = useState('Product Category');

    useEffect(() => {
        const fetchProducts = async () => {
            const baseUrl: string = "http://localhost:8081/api/products";

            let url: string = '';

            if(searchUrl == '') {
                url = `${baseUrl}?pageSize=${productsPerPage}&pageNumber=${currentPage-1}`;
            } else {
                //Prevent page refresh
                //Replace <pageNumber> in searchUrl with currntPage - 1 because page number is similar to array.
                let searchWithPage = searchUrl.replace('<pgn>', `${currentPage - 1}`);
                url = baseUrl + searchWithPage;
            }

            

            let responseJson;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            try {

                responseJson = await response.json();

                    if (responseJson.length === 0) {
                        throw new Error('No data found!');
                    }
                
                const responseData = responseJson.content;

                setTotalAmountOfProducts(responseJson.totalElements);
                setTotalPages(responseJson.totalPages);

                const loadedProducts: ProductModel[] = [];

                for (const key in responseData) {
                const product: ProductModel = new ProductModel(

                    responseData[key].id,
                    responseData[key].productName,
                    responseData[key].description,
                    responseData[key].categoryId,
                    responseData[key].price,
                    responseData[key].discountPrice,
                    responseData[key].manufacturer,
                    responseData[key].imageUrl,
                    responseData[key].weight,
                    responseData[key].dimension
                    
                );
                loadedProducts.push(product);
                }

                setProducts(loadedProducts);
                setIsLoading(false);
            
            }

            catch (error) {
                const loadedProducts: ProductModel[] = [];
                setTotalAmountOfProducts(0);
                setTotalPages(0);
            };
        
        } 
        
        fetchProducts().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
        window.scrollTo(0,0);   
    }, [currentPage, searchUrl]);

    if(isLoading) {
        return(
            <div className="container m-5">
                <SpinnerLoading/>
            </div>
        )
    }

    if(httpError) {
        return(
            <div className="container m-5">
                <p>{httpError} Connection Error</p>
            </div>
        )
    }

    const searchHandleChange = () => {
        setCurrentPage(1);
        if(search == '') {
            setSearchUrl('');
        } else {
            //setSearchUrl(`/search/findByTitleContaining?title=${search}&pageNumber=0&pageSize=${productsPerPage}`)
            setSearchUrl(`/${search}?pageNumber=<pgn>&pageSize=${productsPerPage}`)
        }
        setCategorySelection('Book Category')
    }

    const categoryField = (value: string) => {
        setCurrentPage(1);
        if( value.toLowerCase() === 'mondstadt' ||
            value.toLowerCase() === 'liyue' ||
            value.toLowerCase() === 'inazuma' ||
            value.toLowerCase() === 'sumeru' ||
            value.toLowerCase() === 'fontaine' ||
            value.toLowerCase() === 'natlan' ||
            value.toLowerCase() === 'snezhnaya'
        ) {
            setCategorySelection(value);
            setSearchUrl(`/category/${value}?pageNumber=<pgn>&pageSize=${productsPerPage}`)
        } else {
            setCategorySelection('All');
            setSearchUrl(`?pageNumber=<pgn>&pageSize=${productsPerPage}`)
        }
    }

    const indexOfLastProduct: number = currentPage * productsPerPage;
    const indexOfFirstProduct: number = indexOfLastProduct - productsPerPage;
    let lastItem = productsPerPage * currentPage <= totalAmountOfProducts ?

    productsPerPage * currentPage: totalAmountOfProducts;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div>
            <div className='container'>
                <div>
                    <div className="row mt-5">
                        <div className="col-6">
                            <div className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-aria-labelledby="Search" onChange={e => setSearch(e.target.value)}/>
                                <button className="btn btn-outline-success" onClick={() => searchHandleChange()}>
                                    Search
                                </button>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="dropdown">
                                <button className='btn btn-secondary dropdown-toggle' type='button'
                                    id='dropdownMenuButton1' data-bs-toggle='dropdown'
                                    aria-expanded='false'>
                                    {categorySelection}
                                </button>
                                <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                                    <li onClick={() => categoryField('All')}>
                                        <a className='dropdown-item' href='#'>
                                            All
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('Mondstadt')}>
                                        <a className='dropdown-item' href='#'>
                                            Mondstadt
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('Liyue')}>
                                        <a className='dropdown-item' href='#'>
                                            Liyue
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('Inazuma')}>
                                        <a className='dropdown-item' href='#'>
                                            Inazuma
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('Sumeru')}>
                                        <a className='dropdown-item' href='#'>
                                            Sumeru
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('Fontaine')}>
                                        <a className='dropdown-item' href='#'>
                                            Fontaine
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('Natlan')}>
                                        <a className='dropdown-item' href='#'>
                                            Natlan
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('Snezhnaya')}>
                                        <a className='dropdown-item' href='#'>
                                            Snezhnaya
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {totalAmountOfProducts > 0 ?
                    <>
                    <div className="mt-3">
                    <h5>Number of results: ({totalAmountOfProducts})</h5>
                    </div>
                    <p>
                        {indexOfFirstProduct + 1} to {lastItem} of {totalAmountOfProducts} items:
                        {/* let lastItem = productsPerPage * currentPage <= totalAmountOfProducts ? */}
                        {/* <h1>{totalAmountOfProducts}</h1> */}
                    </p>
                    {
                        products.map(product => (
                            <SearchProduct product = {product} key={product.id}/>
                        ))
                    }
                    </>
                    :
                    <div className='m-5'>
                        <h3>
                            Can't find what you are looking for?
                        </h3>
                        <a type='button' className='btn main-color btn-md px-4 me-md-2 fw-bold text-white'
                            href='#'>Library Services</a>
                    </div>
                    }

                    {totalPages > 1 && 
                        <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
                    }
                </div>
                
            </div>
        </div>
    );
}

export default SearchProductPage;