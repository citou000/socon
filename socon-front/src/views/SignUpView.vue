<script setup>
import BaseButton from '@/components/BaseButton.vue'
import logo from '@/components/icons/logo.svg'
</script>

<template>
  <div class="flex flex-col items-center bg-purple-100 w-full h-screen justify-center gap-7">
    <div class="bg-white py-8 rounded-2xl flex flex-col gap-4 px-2 lg:w-[35%]">
      <div class="flex flex-col items-center">
        <img :src="logo" alt="Logo" class="size-12 object-contain" />
        <h1 class="text-balance text-gray-400">Bienvenue sur Soul Connect</h1>
      </div>
      <form action="" class="flex flex-col gap-3 p-5 rounded-2xl items-center w-full">
        <div class="flex flex-col gap-1 w-full">
          <label for="name">Name</label>
          <input
            type="text"
            name="Name"
            id="name"
            class="border-2 border-purple-200 text-xl focus:border-purple-400 outline-0 focus:border-2 rounded-md py-2 px-1 transition-all ease-in"
          />
        </div>
        <div class="flex flex-col gap-1 w-full">
          <label for="name">Password</label>
          <input
            type="password"
            name="Name"
            id="name"
            class="border-2 border-purple-200 text-xl focus:border-purple-400 outline-0 focus:border-2 rounded-md py-2 px-1 transition-all ease-in"
          />
        </div>
        <div class="flex flex-col gap-1 w-full">
          <label for="name">Confirmer le mot de passe</label>
          <input
            type="password"
            name="Name"
            id="name"
            class="border-2 border-purple-200 text-xl focus:border-purple-400 outline-0 focus:border-2 rounded-md py-2 px-1 transition-all ease-in"
          />
        </div>
        <div class="flex justify-center mt-4 w-full">
          <BaseButton :bg="'bg-purple-400'" :hover-bg="'bg-purple-600'" :color="'text-white'"
            ><span>Se connecter</span></BaseButton
          >
        </div>
      </form>
      <div class="text-sm items-center text-center mx-auto">
        Vous avez dejà un compte ?
        <RouterLink to="/" class="text-purple-600 font-bold">Connectez-vous</RouterLink>
      </div>
    </div>
  </div>
</template>
