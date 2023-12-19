<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useLayout } from '@/layout/composables/layout';

const {
    layoutConfig,
    onMenuToggle,
    layoutState: { staticMenuDesktopInactive }
} = useLayout();

const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);

defineProps({
    simple: {
        type: Boolean,
        default: false
    }
});
const updateConfigFuncion = async () => {
    try {
        // const array = {
        //     tema: layoutConfig.theme.value,
        //     escala: layoutConfig.scale.value,
        //     id_usuario: localStorage.getItem('id_usuario')
        // };
        localStorage.setItem('tema', layoutConfig.theme.value);
        localStorage.setItem('escala', layoutConfig.scale.value);
        // await updateConfig(array);
    } catch (error) {
        /* empty */
    }
};

onMounted(() => {
    bindOutsideClickListener();
});

onBeforeUnmount(() => {
    unbindOutsideClickListener();
});

const onTopBarMenuButton = () => {
    topbarMenuActive.value = !topbarMenuActive.value;
};

const topbarMenuClasses = computed(() => {
    return {
        'layout-topbar-menu-mobile-active': topbarMenuActive.value
    };
});

const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                topbarMenuActive.value = false;
            }
        };
        document.addEventListener('click', outsideClickListener.value);
    }
};
const unbindOutsideClickListener = () => {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener);
        outsideClickListener.value = null;
    }
};
const isOutsideClicked = (event) => {
    if (!topbarMenuActive.value) return;

    const sidebarEl = document.querySelector('.layout-topbar-menu');
    const topbarEl = document.querySelector('.layout-topbar-menu-button');

    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};

// const openProfile = () => {
//     router.push('/profile');
// };

const scales = ref([10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
const { changeThemeSettings, setScale } = useLayout();
const onChangeTheme = (theme, mode) => {
    const elementId = 'theme-css';
    const linkElement = document.getElementById(elementId);
    const cloneLinkElement = linkElement.cloneNode(true);
    const newThemeUrl = linkElement.getAttribute('href').replace(layoutConfig.theme.value, theme);
    cloneLinkElement.setAttribute('id', elementId + '-clone');
    cloneLinkElement.setAttribute('href', newThemeUrl);
    cloneLinkElement.addEventListener('load', () => {
        linkElement.remove();
        cloneLinkElement.setAttribute('id', elementId);
        changeThemeSettings(theme, mode === 'dark');
        updateConfigFuncion();
    });
    linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);
};
const decrementScale = () => {
    setScale(layoutConfig.scale.value - 1);
    applyScale();
};
const incrementScale = () => {
    setScale(layoutConfig.scale.value + 1);
    applyScale();
};
const applyScale = () => {
    document.documentElement.style.fontSize = layoutConfig.scale.value + 'px';
    updateConfigFuncion();
};
</script>

<template>
    <div class="layout-topbar">
        <router-link :to="{ name: 'home' }" class="layout-topbar-logo">
            <px-logo v-if="staticMenuDesktopInactive" :className="''" />
            <span v-if="staticMenuDesktopInactive">API</span>
        </router-link>
        <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
            <i class="pi pi-bars"></i>
        </button>

        <button class="p-link layout-topbar-menu-button layout-topbar-button" @click="onTopBarMenuButton()">
            <i class="pi pi-ellipsis-v"></i>
        </button>

        <div class="layout-topbar-menu" :class="topbarMenuClasses">
            <div class="flex align-items-center">
                <Button
                    :icon="layoutConfig.theme.value == 'vela-green' ? 'pi pi-sun' : 'pi pi-moon'"
                    type="button"
                    @click="onChangeTheme(layoutConfig.theme.value === 'vela-green' ? 'saga-green' : 'vela-green', layoutConfig.theme.value === 'vela-green' ? 'light' : 'dark')"
                    class="p-button-text p-button-rounded w-2rem h-2rem mr-2"
                ></Button>
                <Button icon="pi pi-search-minus" type="button" @click="decrementScale()" class="p-button-text p-button-rounded w-2rem h-2rem mr-2" :disabled="layoutConfig.scale.value === scales[0]"></Button>
                <!---<div class="flex gap-2 align-items-center">
                    <i class="pi pi-circle-fill text-300" v-for="s in scales" :key="s" :class="{ 'text-primary-500': s === layoutConfig.scale.value }"></i>
                </div>-->
                <Button icon="pi pi-search-plus" type="button" @click="incrementScale()" class="p-button-text p-button-rounded w-2rem h-2rem ml-2" :disabled="layoutConfig.scale.value === scales[scales.length - 1]"></Button>
            </div>
            <button class="p-link layout-topbar-button">
                <i class="pi pi-user"></i>
                <span>Profile</span>
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
