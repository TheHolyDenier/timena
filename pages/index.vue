<template>
  <NuxtLayout>
    <div class="intro">
      <h1>Questboard</h1>
      <p>
        Questboard is the ultimate solution for all your tabletop RPG needs.
        Whether you are a seasoned adventurer or just getting started in the
        world of role-playing games, Questboard is the perfect tool to help you
        track your game progress, from the places you have explored to the
        quests you have completed and the NPCs you have encountered.
      </p>
      <p>
        With Questboard, you can easily create and manage your game sessions,
        keep track of your character's stats, and plan your next move. The
        intuitive user interface makes it easy to add new locations, quests, and
        NPCs, and the powerful search functionality ensures that you can always
        find the information you need.
      </p>
      <p>
        Questboard is designed to help you have a great time playing RPG games.
        Say goodbye to the headache of keeping track of your game progress with
        pen and paper, and embrace the convenience and organization of
        Questboard. Try it today and start enjoying the adventure!
      </p>
      <div class="intro__button">
        <BaseButton label="Start now!" :to="{ name: 'sign-up' }" />
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'unsign',
  layout: 'auth'
});
</script>

<style lang="scss" scoped>
.intro {
  > p {
    margin-block-end: 0.5em;
  }

  &__button {
    text-align: center;
    margin-top: 0.5em;
  }
}
</style>
