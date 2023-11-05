<template>
    <table class="table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Fuel</th>
          <th>Total</th>
          <th>Average Percentage</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in items" :key="key">
          <td>{{ key }}</td>
          <td>{{ Object.keys(item)[0] }}</td>
          <td>{{ item[Object.keys(item)[0]].totalPerc }}</td>
          <td>{{ item[Object.keys(item)[0]].averagePerc }} %</td>
        </tr>
      </tbody>
    </table>
  </template>
  
  <script>
  export default {
    name: 'CarbonIntensityTable',
    props: {
      items: Array,
    },
  };
  </script>
  
