import { createSlice } from '@reduxjs/toolkit';
import { getProduct, createProduct, updateProduct, deleteProduct, rateProduct, uploadImagesProduct, getNewProducts, getBestSellers } from './asyncActions';

export const productSlice = createSlice({
    name: "product",
    initialState: {
        newProducts: [],  // Khởi tạo danh sách sản phẩm mới rỗng
        bestSellers: [],  // Khởi tạo danh sách sản phẩm bán chạy rỗng
        productDetail: null,
        isLoading: false, // Khởi tạo trạng thái loading mặc định là false
        errorMessage: "", // Khởi tạo thông điệp lỗi rỗng
    },
    reducers: {
        logout: (state) => {
            state.isLoading = false;
        }
    },
    extraReducers: (builder) => {
        // Xử lý sản phẩm mới
        builder.addCase(getNewProducts.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getNewProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.newProducts = action.payload;
        });
        builder.addCase(getNewProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload?.message;
        });

        // Xử lý sản phẩm bán chạy
        builder.addCase(getBestSellers.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getBestSellers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.bestSellers = action.payload;
        });
        builder.addCase(getBestSellers.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload?.message;
        });

        // Xử lý lấy sản phẩm chi tiết
        builder.addCase(getProduct.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.productDetail = action.payload;
        });
        builder.addCase(getProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload?.message;
        });

        // Xử lý tạo sản phẩm
        builder.addCase(createProduct.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(createProduct.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(createProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload?.message;
        });

        // Xử lý cập nhật sản phẩm
        builder.addCase(updateProduct.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateProduct.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(updateProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload?.message;
        });

        // Xử lý xóa sản phẩm
        builder.addCase(deleteProduct.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteProduct.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(deleteProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload?.message;
        });

        // Xử lý đánh giá sản phẩm
        builder.addCase(rateProduct.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(rateProduct.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(rateProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload?.message;
        });

        // Xử lý tải lên ảnh sản phẩm
        builder.addCase(uploadImagesProduct.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(uploadImagesProduct.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(uploadImagesProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload?.message;
        });
    }
});

export const { } = productSlice.actions;
export default productSlice.reducer;
