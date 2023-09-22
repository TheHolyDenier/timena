<script setup lang="ts">
import { InputDefinition } from '~/utils/interfaces/input-definition.interface';
import BaseForm from '~/components/BaseForm.vue';
import { SignUpDto } from '~/utils/models/auth/sign-up.dto';
import { api } from '~/plugins/di';

const inputDefinitions: InputDefinition[] = [
  { name: 'username', label: 'Username' },
  { name: 'email', label: 'E-mail' },
  { name: 'password', label: 'Password', type: 'password' },
];

const signUp = async (signUp: SignUpDto) => api.auth.signUp(signUp);
</script>

<template>
  <BaseForm :input-definitions="inputDefinitions" @on:send="signUp" />
</template>

<style scoped lang="scss"></style>
