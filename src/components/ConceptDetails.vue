<template>
  <div class="concept-details">
    <template v-if="concept">
      <template v-if="concept.ancestors && concept.ancestors.length">
        <Spinner
          v-if="concept.ancestors.length === 1 && concept.ancestors[0] === null"
          size="20" />
        <ul
          v-else
          class="ancestors">
          <li
            v-for="ancestor in concept.ancestors"
            :key="ancestor.uri">
            ⬑
            <ItemName
              :item="ancestor"
              :isLink="true"
              @click="store.setSelected(ancestor)" />
          </li>
        </ul>
      </template>
      <p>
        <ItemName :item="concept" />
      </p>
    <p>
      {{ concept.uri }}
    </p>
      <template v-if="concept.narrower && concept.narrower.length">
        <Spinner
          v-if="concept.narrower.length === 1 && concept.narrower[0] === null"
          size="20" />
        <ul
          v-else
          class="narrower">
          <li
            v-for="child in concept.narrower"
            :key="child.uri">
            ⬐
            <ItemName
              :item="child"
              :isLink="true"
              @click="store.setSelected(child)" />
          </li>
        </ul>
      </template>
    </template>
    <p v-else>
      No concept given.
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Spinner from "./Spinner.vue"
import ItemName from "./ItemName.vue"
import store from "../store"

export default defineComponent({
  name: 'ConceptDetails',
  components: {
    Spinner,
    ItemName,
  },
  props: {
    concept: {
      type: Object,
      default: null,
    },
  },
  setup: () => {
    return { store }
  }
})
</script>

<style scoped>
  .concept-details {
    padding: 10px;
    margin-top: 20px;
  }
  .ancestors, .narrower {
    list-style: none;
    padding: 0;
    font-size: 0.9em;
  }
</style>
