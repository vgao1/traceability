<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";

const { currentUsername, isLoggedIn } = storeToRefs(useUserStore());
let loaded = ref(false);

onBeforeMount(async () => {
  loaded.value = true;
});
</script>

<template>
  <main>
    <h1>Home Page</h1>
    <section>
      <div v-if="isLoggedIn">
        <h2>Welcome, {{ currentUsername }}!</h2>
        <div v-if="loaded" class="records-container row"></div>
      </div>
      <h1 v-else-if="loaded">Please login!</h1>
    </section>
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
  background-color: #156b12;
  color: white;
  padding: 12px;
  margin-top: 0;
  margin-bottom: 0;
  font-size: 30px;
  font-weight: 600;
  letter-spacing: 1px;
}

h2 {
  text-align: center;
  background-color: #fcfbe1;
  margin-top: 0;
  margin-bottom: 0;
  letter-spacing: 1px;
  color: #156b12;
  font-size: 30px;
}

.row {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  /* max-width: 60em; */
  background-color: #fcfbe1;
}

div {
  background-color: #fcfbe1;
  padding: 20px;
}

h3 {
  text-align: center;
}

form {
  max-width: fit-content;
  margin: auto;
  label {
    width: 5em;
  }
  .pure-controls {
    margin: 0;
    display: flex;
    justify-content: center;
  }
}

#required-fields-input,
#optional-fields-input {
  text-align: center;
}
</style>
