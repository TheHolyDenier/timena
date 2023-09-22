<script setup lang="ts">
import { InputDefinition } from '~/utils/interfaces/input-definition.interface';
import BaseForm from "~/components/BaseForm.vue";

const inputDefinitions: InputDefinition[] = [
  { name: 'email', label: 'E-mail' },
  { name: 'password', label: 'Password', type: 'password' },
  { name: 'stayLogged', label: 'Keep me logged', type: 'checkbox' },
];
</script>

<template>
  <div>
    <h1>Sign-in</h1>
    <BaseForm :input-definitions="inputDefinitions" />
  </div>
</template>

<style scoped lang="scss"></style>
