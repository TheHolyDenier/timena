<script setup lang="ts">
import { InputDefinitionInterface } from '~/interfaces/input-definition.interface';
import BaseForm from '~/components/base/form/BaseForm.vue';
import { useUser } from '~/stores/user.store';
import { FormDataInterface } from '~/interfaces/form-data.interface';

definePageMeta({
  middleware: 'unsign',
  layout: 'auth'
});

const user = useUser();

const inputDefinitions: InputDefinitionInterface[] = [
  { name: 'username', label: 'Username', required: true },
  { name: 'email', label: 'Email', required: true },
  { name: 'password', label: 'Password', required: true, type: 'password' }
];

const signUp = async (signUp: FormDataInterface) => {
  await user.signUp(signUp);
};
</script>

<template>
  <div class="signup-form">
    <h1 class="form-title">Sign Up</h1>

    <BaseForm
      :input-definitions="inputDefinitions"
      ok-button-label="Sign Up"
      @on:submit="signUp"
    />
  </div>
</template>

<style lang="scss"></style>
