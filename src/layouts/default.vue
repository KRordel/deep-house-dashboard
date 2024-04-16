<template>
    <nav>
        <ul>
            <li>
                <router-link :to="{ name: 'dashboard' }">Dashboard</router-link>
            </li>
            <li>
                <router-link :to="{ name: 'login' }">Login</router-link>
            </li>
            <li>
                <router-link :to="{ name: 'users.index' }">Users</router-link>
            </li>
        </ul>
    </nav>

    <div>
        <router-view></router-view>
    </div>
</template>