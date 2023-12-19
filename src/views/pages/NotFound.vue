<script setup>
import { useLayout } from '@/layout/composables/layout';
import { computed } from 'vue';

const { contextPath } = useLayout();
const notFound = computed(() => {
    return `${contextPath}layout/images/notfound.svg`;
});
</script>

<template>
    <div class="flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <img :src="notFound" alt="Not Found" class="image" />
        <div>
            <!-- <div class="w-full surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center" style="border-radius: 53px"> -->
            <!-- <span class="text-blue-500 font-bold text-3xl">404</span>
                    <h1 class="text-900 font-bold text-3xl lg:text-5xl mb-2">Not Found</h1>
                -->
            <div class="text-center text-8xl mb-5 text-primary">Page not found</div>
            <router-link :to="{ name: 'dashboard' }" class="w-full flex align-items-center justify-content-center">
                <span class="flex justify-content-center align-items-center bg-primary border-circle" style="height: 3.5rem; width: 3.5rem">
                    <i class="text-50 pi pi-fw pi-home text-2xl"></i>
                </span>
                <span class="ml-4 flex flex-column">
                    <span class="text-primary text-900 lg:text-xl font-medium mb-0 block">Go to Dashboard</span>
                </span>
            </router-link>
        </div>
        <!-- </div> -->
        <!-- </div> -->
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
