import { createAsyncThunk } from '@reduxjs/toolkit';
import * as apis from '../../apis';

// Lấy sản phẩm mới
export const getNewProducts = createAsyncThunk('product/getNewProducts', async (_, { rejectWithValue }) => {
    const response = await apis.apiGetProducts({ sort: "-createdAt", limit: 4 });
    if (!response.success) return rejectWithValue(response);
    return response.products;
});

// Lấy sản phẩm bán chạy
export const getBestSellers = createAsyncThunk('product/getBestSellers', async (_, { rejectWithValue }) => {
    const response = await apis.apiGetProducts({ sort: "-sold", limit: 4 });
    if (!response.success) return rejectWithValue(response);
    return response.products;
});



// Lấy một sản phẩm
export const getProduct = createAsyncThunk('product/getProduct', async (pid, { rejectWithValue }) => {
    const response = await apis.apiGetProduct(pid);
    if (!response.success) return rejectWithValue(response);
    return response.productData;
});

// Tạo một sản phẩm
export const createProduct = createAsyncThunk('product/createProduct', async (data, { rejectWithValue }) => {
    const response = await apis.apiCreateProduct(data);
    if (!response.success) return rejectWithValue(response);
    return response.createdProduct;
});

// Cập nhật sản phẩm
export const updateProduct = createAsyncThunk('product/updateProduct', async ({ pid, data }, { rejectWithValue }) => {
    const response = await apis.apiUpdateProduct(pid, data);
    if (!response.success) return rejectWithValue(response);
    return response.updateProduct;
});

// Xóa sản phẩm
export const deleteProduct = createAsyncThunk('product/deleteProduct', async (pid, { rejectWithValue }) => {
    const response = await apis.apiDeleteProduct(pid);
    if (!response.success) return rejectWithValue(response);
    return pid;
});

// Đánh giá sản phẩm
export const rateProduct = createAsyncThunk('product/rateProduct', async (data, { rejectWithValue }) => {
    const response = await apis.apiRateProduct(data);
    if (!response.status) return rejectWithValue(response);
    return response.updateProduct;
});

// Tải lên ảnh sản phẩm
export const uploadImagesProduct = createAsyncThunk('product/uploadImagesProduct', async ({ pid, formData }, { rejectWithValue }) => {
    const response = await apis.apiUploadImagesProduct(pid, formData);
    if (!response.status) return rejectWithValue(response);
    return response.updatedProduct;
});
