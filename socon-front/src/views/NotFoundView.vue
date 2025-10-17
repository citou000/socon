<script setup>
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
    <h1 class="text-6xl font-bold text-purple-600 mb-4">404</h1>
    <p class="text-xl text-gray-700 mb-8">Oups! La page que vous recherchez n'existe pas.</p>
    <RouterLink to="/">
      <button
        class="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors cursor-pointer"
      >
        Retour au tableau de bord
      </button>
    </RouterLink>
  </div>
</template>
