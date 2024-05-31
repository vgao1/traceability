<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { fetchy } from "@/utils/fetchy";

let providerRecords = ref<Array<TraceabilityRecord>>([]);
let recipientRecords = ref<Array<TraceabilityRecord>>([]);
let loaded = ref(false);

interface TraceabilityRecord {
  _id: string;
  data_subject: string;
  data_provider: string;
  data_recipient: string;
  description: string;
  service_id: string;
  data: Array<Record<string, string>>;
  dateCreated: string;
}

async function getRecords() {
  try {
    const traceabilityRecords = await fetchy(`/api/traceabilityRecords`, "GET");
    providerRecords.value = traceabilityRecords.providerRecords;
    recipientRecords.value = traceabilityRecords.recipientRecords;
  } catch {
    return;
  }
  return;
}

onBeforeMount(async () => {
  await getRecords();
  loaded.value = true;
});
</script>
<template>
  <div v-if="loaded" class="records-container row">
    <h3>Data Provider's Records</h3>
    <p v-if="providerRecords.length == 0" class="no-records">No traceability records were logged by data provider(s)</p>
    <div class="box" v-for="record in providerRecords" :key="record._id">
      <span>Sent Time: {{ record.dateCreated }}</span>
      <p><b>Purpose</b>: {{ record.description }}</p>
      <p><b>Data Provider: </b>{{ record.data_provider }}</p>
      <p><b>Data Recipient: </b>{{ record.data_recipient }}</p>
      <p><b>Sent Data</b>:</p>
      <ul>
        <li v-for="(field, index) in record.data" :key="index">{{ field.category }}</li>
      </ul>
    </div>
    <h3>Data Recipient's Records</h3>
    <p v-if="recipientRecords.length == 0" class="no-records">No traceability records were logged by data recipient(s)</p>
    <div class="box" v-for="record in recipientRecords" :key="record._id">
      <span>Received Time: {{ record.dateCreated }}</span>
      <p><b>Purpose</b>: {{ record.description }}</p>
      <p><b>Data Provider: </b>{{ record.data_provider }}</p>
      <p><b>Data Recipient: </b>{{ record.data_recipient }}</p>
      <p><b>Received Data</b>:</p>
      <ul>
        <li v-for="(field, index) in record.data" :key="index">{{ field.category }}</li>
      </ul>
    </div>
  </div>
</template>
<style>
.box {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  border: 1px solid #000;
  margin-bottom: 10px;
}

.row {
  max-width: 100%;
  padding: 20px;
  background-color: #f5deb3;
}

h3 {
  text-align: center;
}

.no-records {
  text-align: center;
}
</style>
