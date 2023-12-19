<script setup>
defineProps({
    modelValue: {
        type: String
    },
    label: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'text'
    },
    icon: {
        type: String,
        required: false
    }
});
</script>
<template>
    <span class="p-float-label p-input-icon-right">
        <i :class="icon" />
        <InputText :type="type" id="label" :modelValue="modelValue" @input="$emit('update:modelValue', $event.target.value)" class="w-full md:w-30rem" style="padding: 1rem" />
        <label for="label">{{ label }}</label>
    </span>
</template>

<style lang="scss" scoped></style>
