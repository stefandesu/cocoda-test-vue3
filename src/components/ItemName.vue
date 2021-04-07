<template>
  <span
    :class="{
      itemName: true,
      hoverable: isLink,
    }">
    <b v-if="showNotation">
      {{ notation }}
    </b>
    <template v-if="showText">{{ " " + label }}</template>
  </span>

</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
// @ts-ignore
import jskos from "jskos-tools"

export default defineComponent({
  name: 'ItemName',
  props: {
    item: {
      type: Object,
      required: true
    },
    showNotation: {
      type: Boolean,
      default: true,
    },
    showText: {
      type: Boolean,
      default: true,
    },
    isLink: {
      type: Boolean,
      default: false,
    },
  },
  setup: (props) => {
    const notation = computed(() => jskos.notation(props.item))
    const label = computed(() => jskos.prefLabel(props.item, { fallbackToUri: notation == null }))
    return { notation, label }
  }
})
</script>

<style scoped>
  .itemName.hoverable:hover {
		cursor: pointer;
		text-decoration: underline;
	}
</style>
