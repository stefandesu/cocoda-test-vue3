<template>
  <div class="concept-search">
    <input
      v-model="value"
      @focus="onFocus"
      @blur="onBlur"
      @keydown="handleKey"
      placeholder="Type to search..." />

    <div
      v-if="showResults"
      class="results">
      <div
        v-if="loading"
        class="result">
        <Spinner size="20" />
      </div>
      <div
        v-else-if="results.length === 0"
        class="result">
        No results
      </div>
      <template v-else>
        <div
          v-for="(result, index) in results"
          :key="result.uri"
          :class="{
            result: true,
            selected: selected === index,
          }"
          tabindex="-1"
          @mouseover="selected = index">
          <ItemName :item="result" />
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, watch, defineComponent } from 'vue'
import Spinner from "./Spinner.vue"
import ItemName from "./ItemName.vue"
import { debounce } from "../utils"

export default defineComponent({
  name: 'ConceptSearch',
  components: { Spinner, ItemName },
  emits: ["select"],
  props: {
    scheme: {
      type: Object,
      required: true
    },
  },
  setup: (props, { emit }) => {
    const value = ref("")
    const focused = ref(false)

    const loading = ref(false)
    const results = ref(new Array())
    const showResults = computed(() => value.value !== "" && focused.value)
    const selected = ref(0)

    function select() {
      if (results.value[selected.value]) {
        emit("select", results.value[selected.value])
      }
    }

    function handleKey({ code, target }) {
      // TODO: Scrolling for up/down
      switch (code) {
        case "Escape":
          target && target.blur && target.blur()
          break
        case "ArrowDown":
          selected.value = (selected.value + 1) % results.value.length
          break
        case "ArrowUp":
          if (selected.value === 0) {
            selected.value = results.value.length - 1
          } else {
            selected.value -= 1
          }
          break
        case "Enter":
          select()
          target && target.blur && target.blur()
          break
      }
    }

    let cancel: Function
    const handleChange = debounce(async function(value: string) {
      cancel && cancel()
      const promise = props.scheme._registry.search({ scheme: props.scheme, search: value })
      cancel = promise.cancel
      results.value = await promise
      loading.value = false
    }, 200)

    watch(() => value.value, () => {
      if (value.value) {
        loading.value = true
        selected.value = 0
        handleChange(value.value)
      } else {
        results.value = []
      }
    })

    function onFocus() {
      focused.value = true
    }
    function onBlur(event) {
      if (event.relatedTarget && event.relatedTarget.className.includes("result")) {
        select()
      }
      focused.value = false
    }

    return {
      value,
      focused,
      loading,
      results,
      showResults,
      selected,
      select,
      handleKey,
      onFocus,
      onBlur,
    }
  }
})
</script>

<style scoped>
  .concept-search {
    position: relative;
  }
  input {
    width: 100%;
  }
  .results {
    position: absolute;
    overflow: scroll;
    width: 100%;
    max-height: 250px;
    margin: 2px 0 0 4px;
    box-shadow: 0 2px 4px 0 #00000077;
    z-index: 1;
  }
  .result {
    padding: 3px 0 3px 12px;
    cursor: pointer;
    text-align: left;
    background-color: white;
  }
  .result.selected {
    background-color: lightgray;
  }
</style>
