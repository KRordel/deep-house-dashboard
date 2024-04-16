import {createVuetify} from "vuetify";

import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';

const vuetify = createVuetify({
    defaults: {
        VDataTableServer: {
            noDataText: 'Нет данных...',
            loadingText: 'Загрузка данных...',
            itemsPerPageText: 'Записей на странице:',
            pageText: 'c {0} - {1} из {2}',
            showCurrentPage: true,
            itemsPerPageOptions: [
                {value: 10, title: '10'},
                {value: 25, title: '25'},
                {value: 50, title: '50'},
                {value: 100, title: '100'},
            ],
        },
        VDataTable: {
            noDataText: 'Нет данных...',
            itemsPerPageText: 'Записей на странице:',
            pageText: 'c {0} - {1} из {2}',
            showCurrentPage: true,
            itemsPerPageOptions: [
                {value: 10, title: '10'},
                {value: 25, title: '25'},
                {value: 50, title: '50'},
                {value: 100, title: '100'},
                {value: -1, title: 'Все'},
            ],
        },
    }
});
export default vuetify;