import { createAsyncThunk } from '@reduxjs/toolkit';
import * as apis from '../../apis';

// Register user (initial step)
export const apiRegister = createAsyncThunk('user/register', async (data, { rejectWithValue }) => {
    try {
        const response = await apis.apiRegister(data);
        if (!response.success) throw new Error(response.mes);
        return response;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

// Finalize registration
export const apiFinalRegister = createAsyncThunk('user/finalRegister', async (token, { rejectWithValue }) => {
    try {
        const response = await apis.apiFinalRegister(token);
        if (!response.success) throw new Error(response.mes);
        return response;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});




// Login user
export const apiLogin = createAsyncThunk('user/login', async (data, { rejectWithValue }) => {
    try {
        const response = await apis.apiLogin(data);
        if (!response.success) throw new Error(response.mes);
        return response;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

// Get current user
export const apiGetCurrentUser = createAsyncThunk('user/getCurrentUser', async (_, { rejectWithValue }) => {
    try {
        const response = await apis.apiGetCurrentUser();
        if (!response.success) throw new Error(response.mes);
        return response;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

// Logout user
export const apiLogout = createAsyncThunk('user/logout', async (_, { rejectWithValue }) => {
    try {
        const response = await apis.apiLogout();
        if (!response.success) throw new Error(response.mes);
        return response;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});
