<script setup>
import { useLayout } from '@/layout/composables/layout';
import { computed } from 'vue';

const { contextPath } = useLayout();
const notFound = computed(() => {
    return `${contextPath}layout/images/forbidden.svg`;
});
</script>

<template>
    <div class="flex flex-column lg:flex-row align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex"><img :src="notFound" alt="forbidden" class="image" /></div>
        <div class="">
            <div class="text-center text-8xl text-yellow-500 font-bold">404</div>
            <div class="text-center text-7xl mb-5 text-yellow-500">Forbidden</div>
            <div class="text-center text-2xl mb-5 text-yellow-500">You don't have access to the selected resource</div>
            <router-link :to="{ name: 'dashboard' }" class="w-full flex align-items-center justify-content-center">
                <span class="flex justify-content-center align-items-center bg-yellow-500 border-circle" style="height: 3.5rem; width: 3.5rem">
                    <i class="text-50 pi pi-fw pi-home text-2xl"></i>
                </span>
                <span class="ml-4 flex flex-column">
                    <span class="text-yellow-500 lg:text-xl font-medium mb-0 block">Go to Dashboard</span>
                </span>
            </router-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>
/* Estilo predeterminado para la imagen */
.image {
    width: 30rem;
    height: auto; /* Mantener la proporción de aspecto */
}
@media screen and (min-width: 992px) {
    .image {
        width: 60rem !important;
        height: auto;
    }
}
</style>
