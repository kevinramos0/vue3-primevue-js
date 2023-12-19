<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const password = ref('');
const confirmpassword = ref('');

const validForm = ref(false);
const valid = reactive({
    password: false,
    confirmPassword: false
});

const handleSubmit = () => {
    validForm.value = true;
    if (valid.password && valid.confirmPassword) {
        router.push({ name: 'home' });
    }
};
</script>
<template>
    <div class="flex align-items-center justify-content-center min-h-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <px-logo />
            <div class="border-round-3xl" style="padding: 0.2rem; background: var(--primary-color)">
                <div class="surface-card pt-8 pb-6 px-4 sm:px-6 border-round-3xl">
                    <div class="text-center mb-5">
                        <div class="text-900 text-3xl font-medium mb-3">Reset Password</div>
                        <span class="text-600 font-medium">Please create a new password.</span>
                    </div>
                    <form @submit.prevent="handleSubmit">
                        <px-password v-model="password" feedback :label="'Password'" class="mt-5" @validate="(v) => (valid.password = v)" :check="validForm" />
                        <px-password v-model="confirmpassword" feedback :confirmPassword="true" :label="'Confirm Password'" :passwordCompare="password" class="mt-5" @validate="(v) => (valid.confirmPassword = v)" :check="validForm" />
                        <div class="flex justify-content-center pt-3">
                            <Button type="button" @click="router.push({ name: 'login' })" label="Cancel" severity="secondary" class="mt-3 px-6 text-xl"></Button>
                            <Button type="submit" label="Request" class="px-6 py-3 ml-5 mt-3 text-xl"></Button>
                        </div>
                    </form>
                    <!-- <div> -->
                    <!-- </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
