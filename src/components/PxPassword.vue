<script setup>
import { defineProps, toRefs, computed, ref, watch, reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, maxLength, helpers, sameAs } from '@vuelidate/validators';
import ValidateData from '@/utils/composables/validateFields';

const props = defineProps({
    modelValue: {
        type: String
    },
    label: {
        type: String,
        default: ''
    },
    feedback: {
        type: Boolean,
        default: false
    },
    confirmPassword: {
        type: Boolean,
        required: false,
        default: false
    },

    // password a comprar con confirm password
    passwordCompare: {
        type: String,
        required: false
    },

    isLogin: {
        type: Boolean,
        required: false,
        default: false
    },
    // used to call function that validate the password
    check: {
        type: Boolean,
        default: false
    }
});
defineEmits(['update:modelValue', 'validate']);

const passwordConfirm = ref('');
let v$ = reactive({});
const { modelValue, confirmPassword, passwordCompare, isLogin, check } = toRefs(props);

// create new password
if (!confirmPassword.value && !isLogin.value) {
    const formatPassword = helpers.regex(/^(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/);

    let rules = {
        modelValue: { required, formatPassword, minLength: minLength(8), maxLength: maxLength(50) }
    };

    v$ = useVuelidate(rules, { modelValue });

    // TODO: password for validate loggin
} else if (isLogin.value && !confirmPassword.value) {
    let rules = {
        modelValue: { required }
    };
    v$ = useVuelidate(rules, { modelValue });

    // TODO: VALIDATION FOR CONFIRM PASSWORD
} else {
    let rules = {
        modelValue: { required, sameAsPassword: sameAs(passwordConfirm) }
    };
    v$ = useVuelidate(rules, { modelValue });

    watch(
        () => passwordCompare.value,
        (/*newValue, oldValue */) => {
            passwordConfirm.value = passwordCompare.value;
        }
    );
}

watch(
    () => check.value,
    (/*newValue, oldValue */) => {
        if (check.value) v$.value.modelValue.$touch();
    }
);

const passwordErrors = computed(() => {
    return ValidateData.validatePassword(v$.value.modelValue);
});

const passwordLoginErrors = computed(() => {
    return ValidateData.validatePasswordLogin(v$.value.modelValue);
});

const errorsConfirmPassword = computed(() => {
    return ValidateData.validateConfirmPassword(v$.value.modelValue);
});

const showPasswordErrors = computed(() => {
    if (confirmPassword.value) return errorsConfirmPassword.value;
    else if (isLogin.value) return passwordLoginErrors.value;
    else return passwordErrors.value;
});
</script>
<template>
    <div class="flex flex-column">
        <span class="p-float-label">
            <Password
                id="label"
                :modelValue="v$.modelValue.$model"
                toggleMask
                :feedback="feedback"
                :showIcon="'pi pi-eye'"
                :hideIcon="'pi pi-eye-slash'"
                @input="$emit('update:modelValue', $event.target.value)"
                @blur="$emit('validate', !v$.modelValue.$invalid)"
                @click="v$.modelValue.$touch"
                class="w-full"
                inputClass="w-full"
                :inputStyle="{ padding: '1rem' }"
                :class="{ 'p-invalid': showPasswordErrors.length > 0 }"
            />
            <label for="label">{{ label }}</label>
        </span>
        <small v-if="showPasswordErrors.length > 0" class="p-error" id="text-error">{{ showPasswordErrors[0] }}</small>
    </div>
</template>

<style lang="css" scoped></style>
