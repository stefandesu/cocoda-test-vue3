<template>
  <main>
    <h1>Cocoda Test Vue 3</h1>

    <section>
      <ConceptSearch
        :scheme="store.scheme"
        @select="(concept) => { store.setSelected(concept) }" />
    </section>
    <section>
      <ConceptDetails
        :concept="store.state.selected" />
    </section>
    <section>
      <p>
        Generate elements:
        <button
          v-for="count in [1000,10000,100000]"
          :key="count"
          @click="generateItems(count)">
          {{ count }}
        </button>
      </p>
      <div
        v-for="(item, index) in items"
        :key="index">
        <ItemName
          :item="item"
          :isLink="true"
          @click="store.setSelected(item)" />
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import ConceptSearch from "./components/ConceptSearch.vue"
import ConceptDetails from "./components/ConceptDetails.vue"
import ItemName from "./components/ItemName.vue"
import store from "./store"

export default defineComponent({
  name: 'App',
  components: {
    ConceptSearch, ConceptDetails, ItemName,
  },
  setup: () => {
    const items = ref(new Array())
    function generateItems(count: number) {
      items.value = Array.from(Array(count).keys()).map((value) => {
        return {
          uri: `uri:test:${value}`,
          notation: [`${value}`],
          prefLabel: { en: `Concept #${value}` },
        }
      })
    }

    const urlParams = new URLSearchParams(window.location.search)
    const uri = urlParams.get("uri")
    if (uri) {
      store.setSelectedUri(uri)
    }

    return { items, generateItems, store }
  },
})
</script>

<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	margin: 0;
}
main {
  padding: 1em;
  margin: 0 auto;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 100vh;
}
section:last-child {
  flex: 1;
  overflow: scroll;
}
</style>
