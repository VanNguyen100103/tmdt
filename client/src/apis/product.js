import axios from '../utils/axios'

export const apiGetProducts = (params) => axios({
    url: '/product/',
    method: 'get',
    params
})

// API để lấy sản phẩm dựa trên ID
export const apiGetProduct = (pid) => axios({
    url: `/product/${pid}`,
    method: 'get',
});

// API để tạo sản phẩm mới
export const apiCreateProduct = (data) => axios({
    url: '/product/',
    method: 'post',
    data,
});

// API để cập nhật sản phẩm dựa trên ID
export const apiUpdateProduct = (pid, data) => axios({
    url: `/product/${pid}`,
    method: 'put',
    data,
});

// API để xóa sản phẩm dựa trên ID
export const apiDeleteProduct = (pid) => axios({
    url: `/product/${pid}`,
    method: 'delete',
});

// API để thêm/xử lý đánh giá sản phẩm
export const apiRateProduct = (data) => axios({
    url: '/product/ratings',
    method: 'post',
    data,
});

// API để tải lên ảnh sản phẩm
export const apiUploadImagesProduct = (pid, formData) => axios({
    url: `/product/upload/${pid}`,
    method: 'put',
    data: formData,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});
