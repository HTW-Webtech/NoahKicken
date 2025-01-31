<!-- src/views/Impressum.vue -->

<template>
  <div class="impressum">
    <h1>Impressum</h1>
    <p>Angaben gemäß § 5 TMG (Telemediengesetz):</p>
    <p>
      <strong>Max Mustermann</strong><br />
      Musterstraße 1<br />
      12345 Musterstadt<br />
      Deutschland
    </p>
    <p>
      <strong>Telefon:</strong> 01234 567890<br />
      <strong>E-Mail:</strong> <a href="mailto:info@example.com">kicken@gmail.com</a>
    </p>
    <p>
      <strong>Verantwortlich für den Inhalt gemäß § 55 Abs. 2 RStV:</strong><br />
      Max Mustermann
    </p>
    <p>
      <strong>USt-IdNr.:</strong> DE123456789
    </p>
    <p>
      <strong>Haftungsausschluss:</strong><br />
      Die Inhalte dieser Webseite wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Haftungsansprüche gegen uns, die sich auf Schäden materieller oder ideeller Art beziehen, die durch die Nutzung oder Nichtnutzung der dargebotenen Informationen bzw. durch die Nutzung fehlerhafter oder unvollständiger Informationen verursacht wurden, sind grundsätzlich ausgeschlossen.
    </p>
  </div>
</template>

<script setup>
// Es sind keine zusätzlichen Skripte nötig
</script>

<style scoped>
.impressum {
  margin: 20px;
  font-size: 16px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

a {
  color: #1e90ff;
}
</style>
