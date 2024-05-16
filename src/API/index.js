import axios from "axios";
import {useToast} from "vue-toast-notification";
import 'vue-toast-notification/dist/theme-bootstrap.css';

const axiosInstance = axios.create({
    baseURL:'http://127.0.0.1/api',
    // baseURL: import.meta.env.VITE_API_URL,
    headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

const showNotification = (type, message) => {
    // console.log('showNotification', { type, message });
    useToast().open({
        message: message,
        type: type,
        position: 'bottom-right',
        dismissible: true,
        pauseOnHover: true,
    });
};

const errorHandler = (error) => {
    if (error.response) {
        const { status, data } = error.response;

        switch (status) {
            case 422:
                showNotification('error', 'Ошибка валидации.');
                throw data.errors;
            case 500:
                showNotification('error', 'Ошибка сервера: 500.');
                break;
            default:
                showNotification('error', 'Произошла ошибка.');
        }
    } else if (error.request) {
        showNotification('error', 'Ошибка сети: запрос не удался.');
    } else {
        showNotification('error', 'Произошла неизвестная ошибка.');
    }
};

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        errorHandler(error);
        return Promise.reject(error);
    }
);

export { axiosInstance };