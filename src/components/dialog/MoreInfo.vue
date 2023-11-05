<template>
  <v-card-text v-if="props.log">
    <span @click="showLog = !showLog" class="cursor-pointer">
      <v-icon color="koperniko-secondary mr-1" size="22">mdi-information-outline</v-icon>
      <span class="text-koperniko-secondary">{{ $t('bookings.validation.more_information')}}</span>
    </span>
    <p class="py-3 text-grey-darken-2 bg-grey-lighten-5 rounded-md" v-if="showLog" v-html="props.log" />
  </v-card-text>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showLog = ref(false)

interface Props {
  log: string
}

const props = withDefaults(defineProps<Props>(), {
  log: ''
})

</script>