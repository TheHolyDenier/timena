<script setup lang="ts">
import { InputDefinition } from '~/utils/interfaces/input-definition.interface';
import { UpdateUserDto } from '~/utils/models/user/update-user.dto';
import { useUser } from '~/stores/user.store';
import BodyLayout from '~/layouts/body-layout.vue';

definePageMeta({
  middleware: ['signed'],
});

const inputDefinitions: InputDefinition[] = [
  { name: 'avatar', label: 'Avatar' },
];

const $user = useUser();
const updateProfile = async (body: UpdateUserDto) => $user.update(body);
</script>

<template>
  <BodyLayout>
    <h1>Edit profile</h1>
    <BaseForm
      :input-definitions="inputDefinitions"
      :model="$user.me"
      compact
      @on:send="updateProfile"
    />
  </BodyLayout>
</template>

<style scoped lang="scss"></style>
