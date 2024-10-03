import axios from '../utils/axios'


// API for registering a user (initial step)
export const apiRegister = (data) => axios({
    url: '/user/register',
    method: 'post',
    data,
    withCredentials: true,
});

// API for finalizing the registration
export const apiFinalRegister = (token) => axios({
    url: `/user/finalregister/${token}`,
    method: 'get',
    withCredentials: true,
});



// API for login
export const apiLogin = (data) => axios({
    url: '/user/login',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data
});

// API for getting the current user
export const apiGetCurrentUser = () => axios({
    url: '/user/current',
    method: 'get',
});

// API for refreshing access token
export const apiRefreshAccessToken = () => axios({
    url: '/user/refresh-token',
    method: 'post',
});

// API for logging out
export const apiLogout = () => axios({
    url: '/user/logout',
    method: 'post',
});

// API for requesting password reset
export const apiForgotPassword = (email) => axios({
    url: `/user/forgot-password?email=${email}`,
    method: 'get',
});

// API for resetting the password
export const apiResetPassword = (data) => axios({
    url: '/user/reset-password',
    method: 'post',
    data
});

// API for getting all users (admin access)
export const apiGetUsers = () => axios({
    url: '/user',
    method: 'get',
});

// API for deleting a user (admin access)
export const apiDeleteUser = (userId) => axios({
    url: `/user?id=${userId}`,
    method: 'delete',
});

// API for updating user profile
export const apiUpdateUser = (data) => axios({
    url: '/user/update',
    method: 'put',
    data
});

// API for updating a user's profile by admin (admin access)
export const apiUpdateUserByAdmin = (uid, data) => axios({
    url: `/user/update-admin/${uid}`,
    method: 'put',
    data
});

// API for updating user address
export const apiUpdateUserAddress = (address) => axios({
    url: '/user/address',
    method: 'put',
    data: { address }
});

// API for updating the cart
export const apiUpdateCart = (data) => axios({
    url: '/user/cart',
    method: 'put',
    data
});
