<script setup>
import { toRefs } from 'vue';

const emit = defineEmits(['close']);
const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    header: {
        type: String,
        default: ''
    },
    ancho: {
        type: String,
        default: '25vw'
    }
});
const { visible } = toRefs(props);

const closed = () => {
    emit('close');
};
</script>
<template>
    <Dialog v-model:visible="visible" :header="header" modal :style="{ width: ancho }">
        <template #closeicon>
            <i @click="closed" class="pi pi-times" />
        </template>
        <div class="flex align-items-center justify-content-center">
            <slot />
        </div>
        <template #footer>
            <div class="flex justify-content-center">
                <Button label="Cerrar" icon="pi pi-times" @click="closed" outlined severity="danger" />
            </div>
        </template>
    </Dialog>
</template>

<style lang="scss" scoped></style>
