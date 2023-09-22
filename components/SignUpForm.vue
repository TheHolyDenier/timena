<script setup lang="ts">
import { InputDefinition } from '~/utils/interfaces/input-definition.interface';
import BaseForm from '~/components/BaseForm.vue';
import { SignUpDto } from '~/utils/models/auth/sign-up.dto';
import { useUser } from '~/stores/user.store';

const inputDefinitions: InputDefinition[] = [
  { name: 'username', label: 'Username' },
  { name: 'email', label: 'E-mail' },
  { name: 'password', label: 'Password', type: 'password' },
];

const $user = useUser();

const signUp = async (signUp: SignUpDto) => $user.signUp(signUp);
</script>

<template>
  <BaseForm :input-definitions="inputDefinitions" @on:send="signUp" />
</template>

<style scoped lang="scss"></style>
