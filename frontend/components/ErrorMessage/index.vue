<template>
    <main>
        <div class="wrapper">
            <p v-if="!!error?.value" class="text-red-600 my-3">
          <UIcon name="i-heroicons-exclamation-circle" class="size-3"/> &nbsp;
          {{ error?.value }}</p>
        </div>
    </main>
</template>

<script lang="ts" setup>
    const { error } = defineProps(['error'])
</script>

