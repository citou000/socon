<script setup>
import { RouterView } from 'vue-router';
import FooterItem from '@/components/FooterItem.vue';
import { useMemberStore } from './store/member';
import { storeToRefs } from 'pinia'

const memberStore = useMemberStore();

memberStore.init();

const { logging } = storeToRefs(useMemberStore);
</script>
<template>
  <div class="flex flex-col">
    <RouterView class="min-h-screen"/>
    <FooterItem v-if="!logging" />
  </div>
</template>
