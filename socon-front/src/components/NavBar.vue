<script setup>
import logo from '@/components/icons/logo.svg'
import { useRoute } from 'vue-router'

const isActive = (routePath) => {
  const route = useRoute()
  return route.path === routePath
}
</script>
<template>
  <nav class="flex items-center justify-between p-4 bg-white rounded-xl">
    <div class="text-xl font-bold text-purple-900 flex items-center space-x-2">
      <span><img :src="logo" alt="logo" class="size-12" /></span>
      <span>Socon CRM</span>
    </div>
    <div class="space-x-4 font-semibold">
      <RouterLink
        to="/"
        :class="[isActive('/') ? 'text-purple-800' : '', 'text-gray-600', 'hover:text-purple-600']"
        >Dashboard</RouterLink
      >
      <RouterLink
        to="/members"
        :class="[
          isActive('/members') ? 'text-purple-800' : '',
          'text-gray-600',
          'hover:text-purple-600',
        ]"
        >Membres</RouterLink
      >
      <RouterLink
        to="/settings"
        :class="[
          isActive('/settings') ? 'text-purple-800' : '',
          'text-gray-600',
          'hover:text-purple-600',
        ]"
        >Paramètres</RouterLink
      >
    </div>
  </nav>
</template>
