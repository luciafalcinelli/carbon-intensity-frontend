<template>
    <div>
      <h2>Carbon Intensity Data</h2>
      <div class="row">
        <div class="col-6">
          <div class="region-info">
            <p><strong>Average:</strong> {{ avg }}%</p>
          </div>
        </div>
        <div class="col-6">
          <!-- Form for data input -->
          <CarbonIntensityForm @form-submit="handleSubmit" :isLoading="isLoading" />
        </div>
      </div>
      <!-- Table for displaying fetched data -->
      <CarbonIntensityTable :items="items" />
    </div>
  </template>
  
  
  <script>
  import CarbonIntensityForm from '@/components/form/CarbonIntensityForm.vue';
  import CarbonIntensityTable from '@/components/table/CarbonIntensityTable.vue';
  import CarbonIntensityService from '@/services/CarbonIntensityService';
  import 'bootstrap';
  import '@/assets/base.css';
  
  export default {
    name: 'DataTable',
    components: {
      CarbonIntensityForm,
      CarbonIntensityTable,
    },
    data() {
      return {
        items: [],  // Data from the API
        avg: null,  // Average value
        isLoading: false,  // Loading state
      };
    },
    methods: {
      async handleSubmit(formData) {
        this.isLoading = true;
        try {
          const response = await CarbonIntensityService.getData(formData);
          this.items = response.data;
          this.avg = response.avg;
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          this.isLoading = false;
        }
      },
    },
  };
  </script>
  