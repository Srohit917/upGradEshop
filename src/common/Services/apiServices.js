import axios from "axios";
import { showNotification } from "../Notification";
import { navigateTo } from "../history";
import { url } from "./apiConfig";
import { store } from "../../configureStore";

const createHeaders = (includeAuth = false) => {
    const headers = {
        'Content-Type': 'application/json',
    };
    if (includeAuth) {
        const token = localStorage.getItem("token");
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
};

const fetchWrapper = async (reqFn, url, payload, isLogin) => {
    try {
        const response = await reqFn(url, payload);
        return response.data || response;
    } catch (e) {
        const status = e.response ? e.response.status : 500;
        if (status === 401) {
            showNotification(isLogin ? "Invalid Credentials. Please try again." : "Session expired!!!", "error");
            if (!isLogin) {
                navigateTo('/');
                store.dispatch({ type: "RESET_USER_DETAILS" });
            };
        } else {
            showNotification("Something went wrong, please try again", "error");
        }
        return;
    }
}

export const fetchPostRequest = async (url, payload) => {
    return await axios.post(url, payload);
}

export const fetchGetRequest = async (url) => {
    return await axios.get(url);
}

export const fetchPostRequestWithAuthorization = async (url, payload) => {
    return await axios.post(url, payload, {
        headers: createHeaders(true),
    });
}

export const fetchGetRequestWithAuthorization = async (url) => {
    return await axios.get(url, {
        headers: createHeaders(true),
    });
}

export const fetchPutRequestWithAuthorization = async (url) => {
    return await axios.put(url, {
        headers: createHeaders(true),
    });
};

export const deleteRequest = async(url) => {
    const token = localStorage.getItem("token");
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
      try {
        const response = await axios.delete(url, {
            headers: headers
        });
        if(response.status == 204) return "deleted";
        if(response.status === 200 || response.status == 201) return response.data;
    } catch(error) {
        if(error.status === 401) return 401;
        return "error";
    }
    return false;
}

export const fetchProducts = async () => {
    return await fetchWrapper(fetchGetRequest, url.products);
};

export const login = async (payload) => {
    return await fetchWrapper(fetchPostRequest, url.signIn, payload, true);
}

export const signUp = async (payload) => {
    return await fetchWrapper(fetchPostRequest, url.signUp, payload);
}

export const fetchCategories = async () => {
    return await fetchWrapper(fetchGetRequest, url.categories);
}

export const fetchProductDetails = async (productId) => {
    return await fetchWrapper(fetchGetRequest, `${url.productDetails}/${productId}`);
}

export const fetchAddresses = async () => {
    return await fetchWrapper(fetchGetRequestWithAuthorization, url.addresses);
}

export const addAddress = async (payload) => {
    return await fetchWrapper(fetchPostRequestWithAuthorization, url.addAddress, payload);
}

export const placeOrder = async (payload) => {
    return await fetchWrapper(fetchPostRequestWithAuthorization, url.placeOrder, payload);
}

export const addProduct = async (payload) => {
    return await fetchWrapper(fetchPostRequestWithAuthorization, url.addProduct, payload);
}

export const modifyProduct = async (productId) => {
    return await fetchWrapper(fetchPutRequestWithAuthorization, `${url.addProduct}/${productId}`);
}