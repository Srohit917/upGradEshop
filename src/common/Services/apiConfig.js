const BASE_URL = "http://localhost:8080";

export const url = {
    signIn: `${BASE_URL}/api/auth/signin`,
    signUp: `${BASE_URL}/api/auth/signup`,
    categories: `${BASE_URL}/api/products/categories`,
    products: `${BASE_URL}/api/products`,
    productDetails: `${BASE_URL}/api/products`,
    addresses: `${BASE_URL}/api/addresses`,
    addAddress: `${BASE_URL}/api/addresses`,
    placeOrder: `${BASE_URL}/api/orders`,
    addProduct: `${BASE_URL}/api/products`,
    modifyProduct:`${BASE_URL}/api/products`
}