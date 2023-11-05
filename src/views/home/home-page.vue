<template>
    <h2>Carbon Intensity Data</h2>
    <div class="row">
        <div class="col-6">
            <div class="region-info">
                <p><strong>Average:</strong> {{ avg }}%</p>
            </div>
        </div>
        <div class="col-6">
            <form @submit.prevent="submitForm">
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
                <button type="submit" class="btn btn-primary mt-5" :disabled="isLoading">
                    <span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span v-else>View Data</span>
                </button>
            </form>
        </div>
    </div>
    <table>
        <thead>
            <tr>
                <th>Date</th>
                <th>Fuel</th>
                <th>Total</th>
                <th>Average Percentage</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item, key in items" :key="key">
                <td>{{ key }}</td>
                <td>{{ Object.keys(item)[0] }}</td>
                <td>{{ item[Object.keys(item)[0]].totalPerc }}</td>
                <td>{{ item[Object.keys(item)[0]].averagePerc }} %</td>
            </tr>
        </tbody>
    </table>
</template>
  
<script>
import axios from 'axios';
import RegionSelectComponent from '@/components/select/RegionSelectComponent.vue'
import EnergySelectComponent from '@/components/select/EnergySelectComponent.vue'
import 'bootstrap';
import '@/assets/base.css';

export default {
    name: 'DataTable',

    components: {
        RegionSelectComponent,
        EnergySelectComponent,
    },
    data() {
        return {
            items: [], // This will hold the data from the API
            avg: null,
            selectedRegion: 1,
            selectedEnergy: "biomass",
            from: null,
            to: null,
            isLoading: false,
            dateError: '',
        };
    },
    mounted() {
        this.submitForm();
    },
    methods: {
        validateDates() {
            const fromDate = new Date(this.from);
            const toDate = new Date(this.to);

            if (fromDate > toDate) {
                this.dateError = 'The "From" date must be earlier than the "To" date.';
                return false;
            } else {
                this.dateError = ''; // Clear the error message
                return true;
            }
        },
        async submitForm() {
            if (!this.validateDates()) {
                return;
            }
            this.isLoading = true;
            axios.post(`${import.meta.env.VITE_APP_BASE_URL}/getData`, {
                region: this.selectedRegion,
                energy: this.selectedEnergy,
                from: this.from,
                to: this.to,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    console.log(response);
                    this.items = response.data['data'];
                    this.avg = response.data['avg'];
                    this.isLoading = false;

                })
                .catch(error => {
                    console.log(error);
                    console.error('There was an error fetching the data', error);
                    this.isLoading = false;
                });
        }
    }
};
</script>
  
 