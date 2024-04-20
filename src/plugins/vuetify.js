import {createVuetify} from "vuetify";
import colors from 'vuetify/util/colors'
import { VBtn } from 'vuetify/components/VBtn'

import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';

const vuetify = createVuetify({
    theme: {
        themes: {
            light: {
                dark: false,
                colors: {
                    primary: colors.teal.darken2,
                    primarylight: colors.teal.lighten2,
                }
            },
        },
    },
    aliases: {
        VBtnPrimary: VBtn,
        VBtnBackPage: VBtn,
        VBtnEditPage: VBtn,
    },
    defaults: {
        VBtn: {
            class: 'text-none',
            flat: true,
        },
        VBtnPrimary: {
            color: 'primary',
            class: 'text-none',
            density: 'default',
        },
        VBtnBackPage: {
            density: 'default',
            variant: 'plain',
        },
        VBtnEditPage: {
            size: 'small',
            variant: 'text',
        },
        VTextField:{
            density: 'compact',
            color: 'primary',
            variant: 'outlined',
        },
        VCard: {
            rounded: 'md',
            elevation: 4,
            class: 'pa-4'
        },
        VDataTableServer: {
            density: 'compact',
            hover: true,
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