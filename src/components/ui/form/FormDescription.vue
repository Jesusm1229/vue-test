<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import type { HTMLAttributes } from 'vue'
import { useFormField } from './useFormField'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

// Step 2: Create a reactive reference for formDescriptionId
const formDescriptionId = ref('')

// Step 3: Use onMounted to handle the promise
onMounted(() => {
  useFormField().then((formField) => {
    // Step 4: Assign the resolved formDescriptionId to the reactive reference
    formDescriptionId.value = formField.formDescriptionId
  })
})
</script>

<template>
  <p :id="formDescriptionId" :class="cn('text-sm text-muted-foreground', props.class)">
    <slot />
  </p>
</template>