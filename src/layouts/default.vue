<script setup>

    import {ref} from "vue";

    const drawer = ref(true);

</script>
<template>
    <v-layout >
        <v-app-bar color="primary">
            <template v-slot:prepend>
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            </template>

            <v-app-bar-title>Dashboard</v-app-bar-title>
            
            <template v-slot:append>
                <v-btn icon>
                    <v-icon>mdi-account</v-icon>
                    <v-menu activator="parent" open-on-hover>
                        <v-list min-width="240">
                            <v-list-item
                                title="Admin" 
                                subtitle="example@gmail.com"
                            >
                            </v-list-item>
                            <v-divider class="my-2"></v-divider>
                            <v-list-item
                                disabled
                                prepend-icon="mdi-account-cog"
                                title="Профиль"
                                :to="{ name: 'login' }"
                            />
                            <v-list-item
                                disabled
                                prepend-icon="mdi-logout"
                                title="Выход"
                                :to="{ name: 'login' }"
                            />
                        </v-list>
                    </v-menu>
                </v-btn>
            </template>
        </v-app-bar>

      
        <v-navigation-drawer v-model="drawer" color="primary">
            <v-list nav density="compact">
                <v-list-item
                    prepend-icon="mdi-home"
                    title="Главная"
                    :to="{ name: 'dashboard' }"
                />

                <v-list-item
                    prepend-icon="mdi-account-supervisor"
                    title="Пользователи"
                    :to="{ name: 'users.index' }"
                />

                <v-list-item
                    disabled
                    prepend-icon="mdi-account-key"
                    title="Авторизация"
                    :to="{ name: 'login' }"
                />
            </v-list>

            <template v-slot:append>
                <v-list >
                    <v-list-item class="text-sm-body-2">
                        {{ new Date().getFullYear() == 2024 ? new Date().getFullYear()+'' : '2024-' +new Date().getFullYear() }} - <strong>Vuetify</strong> 
                    </v-list-item>
                </v-list>
            </template>
        </v-navigation-drawer>

        <v-main class="bg-grey-lighten-2" style="min-height: 100vh;">
            <router-view></router-view>
        </v-main>

        

    </v-layout>
</template>