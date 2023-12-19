<script>
import { ref } from 'vue';
export default {
    setup() {
        const selectedItem = ref(null);
        const visibleItems = ref([]);
        const totalRecords = ref(100); // Cambia esto al total real de registros

        const loadMoreItems = async (event) => {
            // Simula una llamada a la API para cargar más registros
            // Puedes implementar tu lógica de llamada a la API aquí
            // event.first es el índice del primer elemento visible
            // event.rows es la cantidad de elementos visibles por página
            const startIndex = event.first;
            const endIndex = startIndex + event.rows;

            // Simulamos una llamada a la API con un retraso
            await new Promise((resolve) => setTimeout(resolve, 500));

            // Simulamos la carga de más registros
            const newItems = Array.from({ length: event.rows }, (_, index) => {
                const itemIndex = startIndex + index;
                return { label: `Item ${itemIndex}` };
            });

            // Actualizamos los registros visibles
            visibleItems.value = [...visibleItems.value, ...newItems];
        };

        return {
            selectedItem,
            visibleItems,
            totalRecords,
            loadMoreItems
        };
    }
};
</script>
<template>
    <div>
        <h3>Lazy Virtual Scroll Dropdown</h3>
        <Dropdown v-model="selectedItem" :options="visibleItems" :lazy="true" :virtualScroll="true" :itemSize="30" :totalRecords="totalRecords" @onLazyLoad="loadMoreItems">
            <template #item="{ option }">
                {{ option.label }}
            </template>
        </Dropdown>
    </div>
</template>
<style>
/* Agrega estilos personalizados según tus necesidades */
</style>
