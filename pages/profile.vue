<script setup lang="ts">
import { InputDefinition } from '~/utils/interfaces/input-definition.interface';
import { UpdateUserDto } from '~/utils/models/user/update-user.dto';
import { useUser } from '~/stores/user.store';
import BodyLayout from '~/layouts/body-layout.vue';
import { storeToRefs } from 'pinia';
import { FormData } from '~/utils/interfaces/form.data';

const inputDefinitions: InputDefinition[] = [
  { name: 'avatar', label: 'Avatar' },
];

const $user = useUser();
const $router = useRouter();

const { loading } = storeToRefs($user);
const model = computed(() => $user.me as FormData);
const updateProfile = async (body: UpdateUserDto) => {
  await $user.update(body);
  $router.push({ name: 'index' });
};
</script>

<template>
  <BodyLayout>
    <h1>Edit profile</h1>
    <BaseForm
      :input-definitions="inputDefinitions"
      :model="model"
      :loading="loading"
      compact
      @on:send="updateProfile"
    />
  </BodyLayout>
</template>

<style scoped lang="scss"></style>
