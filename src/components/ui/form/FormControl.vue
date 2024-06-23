<script lang="ts" setup>
import { Slot } from 'radix-vue'
import { onMounted, ref } from 'vue'
import { useFormField } from './useFormField'

const error = ref('')
const formItemId = ref('')
const formDescriptionId = ref('')
const formMessageId = ref('')

onMounted(async () => {
  const formField = await useFormField()
  error.value = formField.error.toString()
  formItemId.value = formField.formItemId
  formDescriptionId.value = formField.formDescriptionId
  formMessageId.value = formField.formMessageId
})
</script>

<template>
  <Slot :id="formItemId" :aria-describedby="!error ? formDescriptionId : `${formDescriptionId} ${formMessageId}`"
    :aria-invalid="!!error">
    <slot />
  </Slot>
</template>