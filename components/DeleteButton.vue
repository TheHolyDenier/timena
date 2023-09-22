<script setup lang="ts">
import BaseDialog from '~/components/base/BaseDialog.vue';

const $emit = defineEmits<{ (e: 'on:delete'): void }>();

const showDialog = ref(false);

const onDelete = () => {
  $emit('on:delete');
  showDialog.value = false;
};
</script>

<template>
  <BaseButton
    leading-icon="trash-can"
    label="Delete"
    @click="showDialog = true"
  />
  <Transition>
    <BaseDialog
      v-if="showDialog"
      title="Are you sure you want to delete?"
      @on:cancel="showDialog = false"
    >
      <template #default>This action cannot be undone.</template>
      <template #actions>
        <BaseButton label="Delete" @click="onDelete" />
        <BaseButton
          label="Cancel"
          color="transparent"
          @click="showDialog = false"
        />
      </template>
    </BaseDialog>
  </Transition>
</template>

<style scoped lang="scss"></style>
