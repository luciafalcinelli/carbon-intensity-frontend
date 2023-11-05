<template>
  <div>
    <label for="energy">Select Energy Generation:</label>
    <select id="energy" v-model="selectedEnergy">
      <option v-if="isLoading" value="">Loading...</option>
      <option v-for="(name, key) in energies" :key="key" :value="key">
        {{ name }}
      </option>
    </select>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, watch, onMounted } from 'vue';

export default {
  props: {
    modelValue: String
  },
  data() {
    return {
      energies: {},
      selectedEnergy: this.modelValue || '',
      isLoading: false,
      error: null
    };
  },
  watch: {
    selectedEnergy(newVal) {
      this.$emit('update:modelValue', newVal);
    }
  },
  methods: {
    async fetchData() {
      this.isLoading = true;
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/energies`);
        this.energies = response.data;
        if (!this.modelValue) {
          this.selectedEnergy = Object.keys(this.energies)[0] || '';
        }
      } catch (e) {
        this.error = e;
        console.error('There was an error fetching the energies:', e);
      } finally {
        this.isLoading = false;
      }
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>
