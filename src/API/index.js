import axios from 'axios';

const APP_API_URL = (process.env.NODE_ENV === 'production') ? process.env.REACT_APP_LIVE_STORE_URL : process.env.REACT_APP_LOCAL_STORE_URL;

// Wordpress API
export const WP         = `${APP_API_URL}/wp-json/wp/v2`;
// WooCommerce API
export const WC         = `${APP_API_URL}/wp-json/wc/v3`;
// JWT API
export const AUTH       = `${APP_API_URL}/wp-json/jwt-auth/v1`;

const LOGIN = async (formData)=>{

    const tokenResult = await axios.post(`${AUTH}/token`, formData);
    return tokenResult.data;

}

const TOKEN_VALIDATE = async (token)=>{

    const result = await axios.post(`${AUTH}/token/validate`, null, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return result.data;

}

const WC_getWooProducts = async (token,perpage,pager,category='all')=>{
    let url;
    if(category !== 'all'){
        url = `${WC}/products?per_page=${perpage}&page=${pager}&category=${category}`;
    }else{
        url = `${WC}/products?per_page=${perpage}&page=${pager}`;
    }
    try {
        const result = await axios.get(url, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return result;
    } catch (error) {
        return error;
    }
}

const WC_getWooProductById = async (token, productId)=>{
    try {
        const result = await axios.get(`${WC}/products/${productId}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return result.data;
    } catch (error) {
        return error;
    }
}

const WC_getWooProductByName = ()=>{
    var call;
    return async (token, productName)=>{

        if (call)
            call.cancel();
        
        call = axios.CancelToken.source();
        try {
            const result_1 = await axios.get(`${WC}/products?search=${productName}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                cancelToken: call.token
            });
            return result_1.data;
        } catch (error) {
            if (!axios.isCancel(error))
                return error;
        }
    }
}

const WC_getWooSearchProducts = ()=>{

    var call;

    return async (token, query)=>{

        if (call)
            call.cancel();
        
        call = axios.CancelToken.source();
        try {
            const result_1 = await axios.get(`${WC}/products?search=${query}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                cancelToken: call.token
            });
            return result_1.data;
        } catch (error) {
            if (!axios.isCancel(error))
                return error;
        }
    }
    

}

const WC_getWooCategories = async (token,hideempty = false)=>{
    try {
        const result = await axios.get(`${WC}/products/categories?per_page=100&hide_empty=${hideempty}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return result.data;
    } catch (error) {
        if (!axios.isCancel(error))
            return error;
    }
}

const WC_getWooTags = async (token)=>{
    try {
        const result = await axios.get(`${WC}/products/tags?per_page=100`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return result.data;
    } catch (error) {
        if (!axios.isCancel(error))
            return error;
    }
}

const WC_createWooTags = async (token,data)=>{
    let newTag = data;
    try {
        const result = await axios.post(`${WC}/products/tags`, newTag, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return result.data;
    } catch (error) {
        if (!axios.isCancel(error))
            return error;
    }
}

const WC_createWooCategories = async (token,data)=>{
    let newTag = data;
    try {
        const result = await axios.post(`${WC}/products/categories`, newTag, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return result.data;
    } catch (error) {
        if (!axios.isCancel(error))
            return error;
    }
}

const WP_getProfileInfo = async (token)=>{
    const result = await axios.get(`${WP}/users/me?context=edit`, {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    });
    return result.data;
}

const WP_updateProfileInfo = async (token, data)=>{

    const result = await axios.post(`${WP}/users/${data.id}`, data, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return result.data;

}

const WP_change_password = async (token, payload)=>{

    const result = await axios.put(`${WP}/current-user/${payload.id}/change_password`, payload, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    return result.data;
}


const WC_updateProduct = async (token, id, property)=>{
    let data = {
        ...property
    }

    const result = await axios.put(`${WC}/products/${id}`, data, {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    });
    return result.data;

}

const WC_deleteProduct = async (token, id)=> {
    const result = await axios.delete(`${WC}/products/${id}?force=true`, {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    });
    return result.data;

}

const WC_createProduct = async (token, property)=>{
    let data = {
        ...property
    }
    const result = await axios.post(`${WC}/products`, data, {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    });
    return result.data;
}

const WP_uploadImage = async (token, data)=>{
    const result = await axios.post(`${WP}/media`, data, {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    });
    return result.data;
}

const WP_deleteImage = async (token, id)=>{
    const result = await axios.delete(`${WP}/media/${id}?force=true`, {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    });
    return result.data;
}

export default {
    APP_API_URL,
    LOGIN,
    TOKEN_VALIDATE,
    WC_getWooProducts,
    WC_getWooSearchProducts,
    WC_getWooCategories,
    WC_getWooTags,
    WC_getWooProductById,
    WP_getProfileInfo,
    WP_updateProfileInfo,
    WP_change_password,
    WC_updateProduct,
    WC_getWooProductByName,
    WP_uploadImage,
    WC_createProduct,
    WC_deleteProduct,
    WC_createWooTags,
    WC_createWooCategories,
    WP_deleteImage
}