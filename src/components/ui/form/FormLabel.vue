<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import type { HTMLAttributes } from 'vue'
import type { LabelProps } from 'radix-vue'
import { useFormField } from './useFormField'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'

const props = defineProps<LabelProps & { class?: HTMLAttributes['class'] }>()

// Create reactive references
const error = ref('')
const formItemId = ref('')

onMounted(async () => {
  // Await the resolution of useFormField and update the reactive references
  const formField = await useFormField()
  error.value = formField.error.value // Correct if formField.error is a ComputedRef
  formItemId.value = formField.formItemId // Correct if formField.formItemId is a string
})
</script>

<template>
  <Label :class="cn(
    error && 'text-destructive',
    props.class,
  )" :for="formItemId.valueOf">
    <slot />
  </Label>
</template>