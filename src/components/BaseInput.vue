<template>
  <!-- Notice unlike React (or at least older versions of react) we can have multiple Root level nodes, without having to wrap them in one element -->
  <label :for="uuid">{{ label }}</label>
  <input
    v-bind="$attrs"
    :placeholder="label"
    class="field"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :id="uuid"
    :aria-describedby="error ? `${uuid}-error` : null"
  />
  <p
    :id="`${uuid}-error`"
    v-if="error"
    class="errorMessage"
    aria-live="assertive"
    aria-invalid="error ? true : null"
  >
    {{ error }}
  </p>
</template>

<script>
import UniqueID from '../features/UniqueID'
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    error: {
      type: String,
      default: ''
    }
  },
  setup () {
    const uuid = UniqueID().getID()
    return {
      uuid
    }
  }
}
</script>
