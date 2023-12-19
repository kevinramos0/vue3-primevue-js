<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { toastService } from '@/utils/composables/toastNotificationHelper';
import { useToast } from 'primevue/usetoast';
const toastNotifications = new toastService(useToast());

const router = useRouter();

const login = reactive({
    email: '',
    password: ''
});

const checked = ref(false);

const validForm = ref(false);
const valid = ref(false);

const handleSubmit = (valid) => {
    toastNotifications.Success(`Welcome ${login.email}!`);
    validForm.value = true;
    if (valid) {
        router.push({ name: 'home' });
    }
};
</script>

<template>
    <div class="grid card flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="xs:col-12 sm:col-12 md:col-12 lg:col-7 xl:col-7">
            <div class="flex flex-column align-items-center lg:align-items-end">
                <div class="px-5 sm:px-8 border-round-xl">
                    <px-logo class="pt-8 w-15rem flex-shrink-0" />
                    <div class="text-center pb-0 lg:pb-8 text-5xl font-semibold">
                        <span class="text-primary">Plantillas</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="xs:col-12 sm:col-12 md:col-12 lg:col-5 xl:col-5">
            <div class="flex flex-column align-items-center lg:align-items-start">
                <!-- <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, rgba(233, 30, 99, 0.4) 10%, rgba(33, 150, 243, 0) 30%)"> -->
                <div class="border-round-3xl" style="padding: 0.2rem; background: var(--primary-color)">
                    <div class="surface-card pt-8 pb-6 px-5 sm:px-8 border-round-3xl">
                        <div class="text-center mb-5">
                            <div class="text-900 text-3xl font-medium mb-3">Welcome!</div>
                            <span class="text-600 font-medium">Sign in to continue</span>
                        </div>
                        <!-- <div> -->
                        <form @submit.prevent="handleSubmit(valid)">
                            <px-email v-model="login.email" :label="'Email'" @validate="(v) => (valid = v)" :check="validForm" />
                            <px-password v-model="login.password" :isLogin="true" :label="'Password'" class="mt-5" @validate="(v) => (valid = v)" :check="validForm" />
                            <div class="flex align-items-center justify-content-between my-5 gap-5">
                                <div class="flex align-items-center">
                                    <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                    <label for="rememberme1">Remember me</label>
                                </div>
                                <a @click="router.push({ name: 'forgotPassword' })" class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Forgot password?</a>
                            </div>
                            <Button type="submit" label="Sign In" class="w-full p-3 text-xl"></Button>
                        </form>
                        <!-- </div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
