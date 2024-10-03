import { createSlice } from '@reduxjs/toolkit';
import { apiRegister, apiFinalRegister, apiLogin, apiGetCurrentUser, apiLogout } from './asyncActions';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        current: null,
        token: null,
        isLoading: false,
        errorMessage: '',
        registrationStep: 1,  // Tracks which registration step the user is in
    },
    reducers: {
        reg: (state, action) => {
            state.current = action.payload?.userData;
            state.token = action.payload?.token;
            state.isLoggedIn = action.payload?.isLoggedIn;
        },
        setRegistrationStep: (state, action) => {
            state.registrationStep = action.payload;
        }
    },
    extraReducers: (builder) => {
        // Handle registration
        builder.addCase(apiRegister.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(apiRegister.fulfilled, (state) => {
            state.isLoading = false;
            state.registrationStep = 2;  // Move to final registration step
        });
        builder.addCase(apiRegister.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload?.message;
        });

        // Handle final registration step
        builder.addCase(apiFinalRegister.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(apiFinalRegister.fulfilled, (state, action) => {
            state.isLoading = false;
            state.current = action.payload.userData;
            state.token = action.payload.accessToken;
            state.isLoggedIn = true;  // User is now fully registered and logged in
            state.registrationStep = 1;  // Reset registration step
        });
        builder.addCase(apiFinalRegister.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload?.message;
        });

        // Handle login
        builder.addCase(apiLogin.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(apiLogin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.current = action.payload.userData;
            state.token = action.payload.accessToken;
            state.isLoggedIn = true;
        });
        builder.addCase(apiLogin.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload?.message;
        });

        // Handle logout
        builder.addCase(apiLogout.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(apiLogout.fulfilled, (state) => {
            state.isLoading = false;
            state.isLoggedIn = false;
            state.current = null;
            state.token = null;
        });
        builder.addCase(apiLogout.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload?.message;
        });

        // Handle fetching current user
        builder.addCase(apiGetCurrentUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(apiGetCurrentUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.current = action.payload;
        });
        builder.addCase(apiGetCurrentUser.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload?.message;
        });
    }
});

export const { reg, setRegistrationStep } = userSlice.actions;
export default userSlice.reducer;
