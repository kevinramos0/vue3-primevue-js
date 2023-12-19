<script setup>
import { useLayout } from '@/layout/composables/layout';
import { computed } from 'vue';

const { layoutConfig, contextPath } = useLayout();
defineProps({
    className: {
        type: String,
        default: 'mb-5 w-6rem flex-shrink-0'
    }
});
const logoUrl = computed(() => {
    return `${contextPath}layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});
</script>
<template>
    <img :src="logoUrl" alt="Logo" :class="className" />
</template>

<style lang="scss" scoped></style>
