<script lang="ts" setup>
import { ErrorMessage } from 'vee-validate'
import { ref, onMounted } from 'vue'
import { useFormField } from './useFormField'

// Step 2: Create reactive references
const name = ref('')
const formMessageId = ref('')

// Step 3: Use onMounted to handle the promise
onMounted(async () => {
  const field = await useFormField()
  name.value = field.name.toString()
  formMessageId.value = field.formMessageId
})
</script>

<template>
  <ErrorMessage :id="formMessageId" as="p" :name="name" class="text-sm font-medium text-destructive" />
</template>