<script setup>
import { RouterView } from 'vue-router';
import FooterItem from '@/components/FooterItem.vue';
import { useMemberStore } from './store/member';
import { storeToRefs } from 'pinia';

const { logging } = storeToRefs(useMemberStore);
</script>
<template>
  <RouterView />
  <FooterItem v-if="!logging" />
</template>
