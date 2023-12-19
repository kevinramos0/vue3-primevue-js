<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const email = ref('');

const validForm = ref(false);
const valid = ref(false);

const handleSubmit = (valid) => {
    validForm.value = true;
    if (valid) {
        router.push({ name: 'home' });
    }
};
</script>
<template>
    <div class="flex align-items-center justify-content-center min-h-screen">
        <div class="flex flex-column align-items-center justify-content-center">
            <px-logo />
            <div class="border-round-3xl" style="padding: 0.2rem; background: var(--primary-color)">
                <div class="surface-card pt-8 pb-6 px-2 sm:px-3 border-round-3xl w-25rem sm:w-30rem">
                    <div class="text-center mb-5">
                        <div class="text-900 text-3xl font-medium mb-3">Forgot Password!</div>
                        <span class="text-600 font-medium"> To change your password please enter the email associated with your account.</span>
                    </div>
                    <form @submit.prevent="handleSubmit(valid)">
                        <px-email v-model="email" :label="'Email'" @validate="(v) => (valid = v)" :check="validForm" />
                        <div class="flex justify-content-around pt-3">
                            <Button type="button" @click="router.push({ name: 'login' })" label="Cancel" severity="secondary" class="mt-3 px-6 text-xl"></Button>
                            <Button type="submit" label="Request" class="px-6 py-3 mt-3 text-xl"></Button>
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
