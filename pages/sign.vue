<script setup lang="ts">
import SignUpForm from '~/components/SignUpForm.vue';
import SignInForm from '~/components/SignInForm.vue';
import BaseButton from '~/components/BaseButton.vue';

definePageMeta({
  middleware: ['unsigned'],
});

const isSingingUp = ref(true);
</script>

<template>
  <div class="sign">
    <div class="sign__container">
      <div class="sign__header">
        <h1 v-if="isSingingUp">Sign-up</h1>
        <h1 v-else>Sign-in</h1>

        <BaseButton @click="isSingingUp = !isSingingUp" outline compact>
          <span v-if="isSingingUp">Already have an account?</span>
          <span v-else>Need an account?</span>
        </BaseButton>
      </div>

      <SignUpForm v-if="isSingingUp" />
      <SignInForm v-else />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'assets/scss/global';
.sign {
  display: flex;
  justify-content: center;

  &__header {
    display: flex;
    gap: 1em;
    justify-content: space-between;
    align-items: center;
  }

  &__container {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    max-width: 500px;
    width: 100vw;
  }
}
</style>
