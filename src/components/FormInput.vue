<template>
  <div class="mb-4">
    <label :for="name" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <Field
      :name="name"
      :type="type"
      :rules="rules"
      v-model="modelValue"
      :placeholder="placeholder"
      class="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
      :class="{ 'border-red-500': errorMessage }"
      @update:modelValue="$emit('update:modelValue', $event)"
    />
    <span v-if="errorMessage" class="text-red-500 text-sm mt-1">{{ errorMessage }}</span>
  </div>
</template>

<script>
import { Field, useField } from 'vee-validate';

export default {
  name: 'FormInput',
  components: {
    Field,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    rules: {
      type: [String, Object],
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
  },
  setup(props) {
    const { errorMessage } = useField(props.name);
    return { errorMessage };
  },
};
</script>