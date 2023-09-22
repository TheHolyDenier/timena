<script setup lang="ts">
import { InputDefinition } from '~/utils/interfaces/input-definition.interface';
import BaseForm from '~/components/BaseForm.vue';
import { SignInDto } from '~/utils/models/auth/sign-in.dto';
import { useUser } from '~/stores/user.store';

const inputDefinitions: InputDefinition[] = [
  { name: 'email', label: 'E-mail' },
  { name: 'password', label: 'Password', type: 'password' },
  { name: 'stayLogged', label: 'Keep me logged', type: 'checkbox' },
];

const $user = useUser();

const signIn = async (signIn: SignInDto) => $user.signIn(signIn);
</script>

<template>
  <BaseForm :input-definitions="inputDefinitions" @on:send="signIn" />
</template>

<style scoped lang="scss"></style>
