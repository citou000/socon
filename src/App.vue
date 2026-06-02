<script setup>
import { RouterView } from 'vue-router';
import FooterItem from '@/components/FooterItem.vue';
import { useMemberStore } from './store/member';
import { storeToRefs } from 'pinia';
import "@fontsource/inter";


const memberStore = useMemberStore();

const { logging } = storeToRefs(memberStore);
</script>
<template>
  <div class="min-h-screen flex flex-col font-inter">
    <RouterView />
    <FooterItem v-if="!logging" />
  </div>
</template>
