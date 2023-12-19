<script setup>
import { defineProps, toRefs, computed, watch } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import ValidateData from '@/utils/composables/validateFields';

const props = defineProps({
    label: {
        type: String,
        required: false,
        default: 'Email'
    },
    check: {
        type: Boolean,
        default: false
    },
    modelValue: {
        type: String,
        required: true,
        default: ''
    }
});
defineEmits(['update:modelValue', 'validate']);

const { modelValue, check } = toRefs(props);

const rules = {
    modelValue: { required, email }
};

const v$ = useVuelidate(rules, { modelValue });

const emailErrors = computed(() => {
    return ValidateData.validateEmail(v$.value.modelValue);
});

watch(
    () => check.value,
    (/*newValue, oldValue */) => {
        if (check.value) v$.value.modelValue.$touch();
    }
    // { deep: true } el nuevo valor y el antiguo serán el mismo
);
</script>

<template>
    <div class="flex flex-column">
        <span class="p-float-label p-input-icon-right">
            <i class="pi pi-user" />
            <InputText
                :modelValue="v$.modelValue.$model"
                @input="$emit('update:modelValue', $event.target.value)"
                @change="$emit('validate', !v$.modelValue.$invalid)"
                :label="label"
                @blur="v$.modelValue.$touch"
                class="w-full"
                style="padding: 1rem"
                id="label"
                type="email"
                :class="{ 'p-invalid': emailErrors.length > 0 }"
            />
            <label for="label">{{ label }}</label>
        </span>
        <small v-if="emailErrors.length > 0" class="p-error" id="text-error">{{ emailErrors[0] }}</small>
    </div>
</template>
