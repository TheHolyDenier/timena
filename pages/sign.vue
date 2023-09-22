<script setup lang="ts"></script>

<template>
  <div class="sign">
    <SignUpForm />
    <SignInForm />
  </div>
</template>

<style scoped lang="scss">
.sign {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2em;
}
</style>
