<template>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <RegionSelectComponent v-model="selectedRegion" />
      </div>
      <div class="form-group">
        <EnergySelectComponent v-model="selectedEnergy" />
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="from">From:</label>
            <input type="datetime-local" id="from" v-model="from">
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="to">To:</label>
            <input type="datetime-local" id="to" v-model="to">
          </div>
        </div>
        <span v-if="dateError" class="error-message">{{ dateError }}</span>
      </div>
      <button type="submit" class="btn btn-primary mt-5">View Data</button>
    </form>
  </template>
  
  <script>
  import RegionSelectComponent from '@/components/select/RegionSelectComponent.vue';
  import EnergySelectComponent from '@/components/select/EnergySelectComponent.vue';
  
  export default {
    name: 'CarbonIntensityForm',
    components: {
      RegionSelectComponent,
      EnergySelectComponent,
    },
    data() {
      return {
        selectedRegion: 1,
        selectedEnergy: 'biomass',
        from: null,
        to: null,
        dateError: '',
      };
    },
    methods: {
      validateDates() {
        const fromDate = new Date(this.from);
        const toDate = new Date(this.to);
  
        if (fromDate > toDate) {
          this.dateError = 'The "From" date must be earlier than the "To" date.';
          return false;
        }
        this.dateError = '';
        return true;
      },
      onSubmit() {
        if (!this.validateDates()) {
          return;
        }
        this.$emit('form-submit', {
          region: this.selectedRegion,
          energy: this.selectedEnergy,
          from: this.from,
          to: this.to,
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .error-message {
    color: red;
  }
  </style>
  