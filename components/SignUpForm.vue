<script setup lang="ts">
import { InputDefinition } from '~/utils/interfaces/input-definition.interface';
import BaseForm from '~/components/BaseForm.vue';

const inputDefinitions: InputDefinition[] = [
  { name: 'username', label: 'Username' },
  { name: 'email', label: 'E-mail' },
  { name: 'password', label: 'Password', type: 'password' },
];
</script>

<template>
  <div>
    <h1>Sign-up</h1>
    <p>Need an account?</p>
    <BaseForm :input-definitions="inputDefinitions" />
  </div>
</template>

<style scoped lang="scss"></style>
