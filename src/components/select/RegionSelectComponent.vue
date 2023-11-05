<template>
  <div>
    <label for="region">Select Region:</label>
    <select id="region" v-model="selectedRegion">
      <option v-if="isLoading" value="">Loading...</option>
      <option v-for="(name, key) in regions" :key="key" :value="key">
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
      regions: {},
      selectedRegion: this.modelValue || '',
      isLoading: false,
      error: null
    };
  },
  watch: {
    selectedRegion(newVal) {
      this.$emit('update:modelValue', newVal);
    }
  },
  methods: {
    async fetchData() {
      this.isLoading = true;
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/regions`);
        this.regions = response.data;
        if (!this.modelValue) {
          this.selectedRegion = Object.keys(this.regions)[0] || '';
        }
      } catch (e) {
        this.error = e;
        console.error('There was an error fetching the regions:', e);
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
