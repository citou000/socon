<script setup>
import { ref } from 'vue'
// import { Button } from 'primevue/button'
// import { InputText } from 'primevue/inputtext'

// Reactive variables
// const name = ref('')
const submittedName = ref('')

// Function to handle form submission
// const submitName = () => {
//   if (name.value.trim()) {
//     submittedName.value = name.value
//     name.value = '' // Clear the input after submission
//   }
// }

// ✅ Commented out dashboard statistics (for future use)
// const dashboardOptions = ref({
//   Baptisés: 50,
//   Âmes: 100,
//   Suivis: 50,
// })
</script>

<template>
  <!-- Main welcome section -->
  <div class="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold text-gray-800 mb-4">Hi, and welcome to this app</h1>
    <p class="text-gray-600 mb-4">What's your name?</p>

    <div class="space-y-4">
      <!-- <InputText
        v-model="name"
        placeholder="Enter your name"
        class="w-full"
        @keyup.enter="submitName"
      /> -->

      <!-- <Button label="Submit" @click="submitName" :disabled="!name.trim()" class="w-full" /> -->

      <p v-if="submittedName" class="text-green-600 font-semibold text-center">
        Hello, {{ submittedName }}! 👋
      </p>
    </div>
  </div>

  <!-- Commented out dashboard section for future use -->
  
  <main class="w-full h-full">
    <div class="h-[40%] bg-purple-100 text-purple-900 flex">
      <div class="w-full flex items-center justify-around h-full px-8">
        <div
          v-for="(v, k) in dashboardOptions"
          :key="k"
          class="flex flex-col items-start justify-around w-fit cursor-pointer p-8 hover:bg-purple-200 transition-all duration-300 ease-in-out my-2 rounded-lg"
        >
          <span class="self-start text-xl font-mono font-semibold">{{ k }}</span>
          <span class="text-8xl font-semibold">{{ v }}<span v-if="k !== 'Âmes'">%</span></span>
        </div>
      </div>
    </div>
  </main>

</template>
