<script setup>
import { ref } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import { X } from "@lucide/vue";

const code = ref(null);
const teamCode = ref("");
const emit = defineEmits(["close"]);

const setFocus = async () => {
  code.value?.focus();
};

defineExpose({ setFocus });
</script>
<template>
  <div class="fixed inset-0 bg-gray-700/50 backdrop-blur-sm flex justify-center items-center z-40">
    <div
      class="flex flex-col items-start px-6 pt-4 pb-9 bg-white rounded-lg max-w-md md:w-[40%] mx-4"
    >
      <div class="w-full mb-4 flex justify-between items-center gap-6">
        <section>
          <h2 class="md:text-3xl font-bold text-3xl">Rejoindre une équipe</h2>
        </section>
        <section class="place-self-start md:place-self-center mt-2">
          <X
            class="size-6 cursor-pointer hover:text-red-500 font-bold transition-colors duration-100"
            @click="emit('close')"
          />
        </section>
      </div>
      <form class="w-full flex flex-col gap-4" @submit.prevent>
        <div class="flex flex-col self-center w-full gap-2">
          <label for="joinCode">Code de l'équipe <sup class="text-red-500">*</sup></label>
          <input
            type="text"
            id="joinCode"
            name="joinCode"
            required
            class="border border-purple-200 px-1 py-2 rounded-md outline-0 focus:ring-purple-100 focus:ring-1 focus:border-purple-300 transition-colors duration-100"
            v-model="teamCode"
            placeholder="cdsf-uiln"
            ref="code"
          />
        </div>

        <BaseButton type="submit" variant="primary">Rejoindre l'équipe</BaseButton>
      </form>
    </div>
  </div>
</template>
