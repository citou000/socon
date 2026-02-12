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
  <div class="min-h-screen flex flex-col">
    <RouterView/>
    <FooterItem v-if="!logging" />
  </div>
</template>
