<script setup lang="ts">
import SignUpForm from '~/components/SignUpForm.vue';
import SignInForm from '~/components/SignInForm.vue';

const isSingingUp = ref(true);
</script>

<template>
  <div class="sign">
    <Transition :name="isSingingUp ? 'wipe-in-left' : 'wipe-in-right'">
      <div v-if="isSingingUp" class="sign__container">
        <SignUpForm />
        <div class="sign__change" @click="isSingingUp = !isSingingUp">
          <p>Already have an account?</p>
        </div>
      </div>

      <div v-else class="sign__container">
        <div class="sign__change" @click="isSingingUp = !isSingingUp">
          <p>Need an account?</p>
        </div>
        <SignInForm />
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
@import 'assets/scss/global';
.sign {
  &__container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2em;
  }

  &__change {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: rgba(#000, 0.01);
    border-radius: 15px;
    cursor: pointer;

    &:hover {
      background-color: rgba(#000, 0.05);
    }
  }
}

//.turn-page-enter-from,
//.turn-page-leave-to {
//  transform: translateX(20px);
//  opacity: 0;
//}
</style>
