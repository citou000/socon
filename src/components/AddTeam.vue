<script setup>
// import ref from 'vue';
import BaseButton from '@/components/BaseButton.vue';
import { X } from 'lucide-vue-next';
// import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/store/auth';
import { storeToRefs } from "pinia"

const emit = defineEmits(['close']);

const authStore = useAuth();

const { user } = storeToRefs(authStore);

// const teamName = ref();


const submitTeam = async () => {
  console.log("User from addTeam components:", user.value.id)
  // const { data, error } = await supabase().from('teams').insert({
  //   name: teamName.value,
  //   admin_id: user.value.id,
  // })
  // if ()
}
</script>
<template>
  <div class="fixed inset-0 bg-gray-700/50 backdrop-blur-sm flex justify-center items-center z-40">
    <div class="flex flex-col items-start px-6 pt-4 pb-9 bg-white rounded-lg max-w-md md:w-[40%]
      mx-4">
      <div class="w-full mb-4 flex justify-between items-center gap-2">
        <section>
          <h2 class="md:text-3xl font-bold text-3xl">Ajouter une équipe</h2>
        </section>
        <section class="place-self-start md:place-self-center mt-2">
          <X class="size-6 cursor-pointer hover:text-red-500 font-bold transition-colors duration-100"
            @click="emit('close')" />
        </section>
      </div>
      <form class="w-full flex flex-col gap-4" @submit.prevent>
        <div class="flex flex-col self-center w-full">
          <label for="team-name">Nom de l'équipe <sup class="text-red-500">*</sup></label>
          <input type="text" id="team-name" name="team-name" required
            class="border-1 border-purple-200 px-1 py-2 rounded-md" />
        </div>

        <BaseButton type="submit" variant="primary" @click='submitTeam'>Créer l'équipe</BaseButton>
      </form>
    </div>
  </div>
</template>
