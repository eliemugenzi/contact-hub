<template>
    <header class="flex justify-between mt-5">
        <div class="logo">
            <h2>Contact Hub</h2>
        </div>
        <nav>
            <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800" />
        </nav>
    </header>
</template>
<script lang="ts" setup>
import { useAuth } from '../../composables/useAuth';

const { isLoggedIn } = useAuth();

const loggedInLinks = [
    {
        label: "Profile",
        icon: 'i-heroicons-user',
        to: '#profile'
    },
    {
        label: "Log Out",
        icon: "i-heroicons-lock-open",
        to: "#logout"
    }
]

const anonymousLinks =  [
    {
        label: "Login",
        icon: "i-heroicons-lock-open",
        to: "/"
    },
    {
        label: "Sign Up",
        icon: "i-heroicons-user",
        to: "/signup"
    }
]



const links = isLoggedIn ? loggedInLinks : anonymousLinks;
</script>

<style lang="scss" scoped>
    
</style>