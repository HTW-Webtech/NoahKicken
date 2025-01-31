<template>
  <div class="contact-form">
    <h2>Kontaktieren Sie uns</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="form.name" required />
      </div>
      <div class="form-group">
        <label for="email">E-Mail:</label>
        <input type="email" id="email" v-model="form.email" required />
      </div>
      <div class="form-group">
        <label for="message">Nachricht:</label>
        <textarea id="message" v-model="form.message" required></textarea>
      </div>
      <button type="submit">Absenden</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Definiere das Formularmodell
const form = ref({
  name: '',
  email: '',
  message: ''
});

// Die Funktion, die beim Absenden des Formulars aufgerufen wird
const submitForm = () => {
  // Hier kannst du das Formular an einen Server senden oder eine Bestätigung ausgeben
  console.log('Formular gesendet:', form.value);

  // Zeige eine Bestätigung (optional)
  alert('Vielen Dank für Ihre Nachricht!');
  // Setze das Formular zurück
  form.value = { name: '', email: '', message: '' };
};
</script>

<style scoped>
.contact-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.contact-form h2 {
  text-align: center;
  margin-bottom: 20px;
}

.contact-form .form-group {
  margin-bottom: 15px;
}

.contact-form label {
  display: block;
  margin-bottom: 5px;
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.contact-form button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.contact-form button:hover {
  background-color: #45a049;
}
</style>
