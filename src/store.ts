import { reactive } from "@vue/reactivity"
// @ts-ignore
import * as cdk from "cocoda-sdk"
// @ts-ignore
import jskos from "jskos-tools"

const registry = cdk.initializeRegistry({
  provider: "ConceptApi",
  status: "https://coli-conc.gbv.de/api/status",
})
// Fixed to DDC
const scheme = {
  uri: "http://dewey.info/scheme/edition/e23/",
  prefLabel: {
    de: "Dewey-Dezimalklassifikation",
  },
  notation: [
    "DDC",
  ],
  identifier: [
    "http://bartoc.org/en/node/241",
  ],
  type: [
    "http://www.w3.org/2004/02/skos/core#ConceptScheme",
  ],
  _registry: registry,
}

// @ts-ignore
let previous
export default {
  scheme,
  state: reactive({
    selected: undefined,
  }),
  // @ts-ignore
  setSelected(value) {
    this.state.selected = value
    this.selectedWasSet(value)
  },
  // @ts-ignore
  async selectedWasSet(value) {
    // @ts-ignore
    if (value !== null && !jskos.compare(value, previous)) {
      previous = value
      // Load data from API
      if (!value.ancestors || value.ancestors[0] === null) {
        try {
          const ancestors = await registry.getAncestors({ concept: value })
          // Check is necessary since value could have changed in the meantime
          if (jskos.compare(value, this.state.selected)) {
            // @ts-ignore
            this.state.selected.ancestors = ancestors
          }
        } catch (error) {
          console.warn("Could not load ancestors for", value.uri)
        }
      }
      if (!value.narrower || value.narrower[0] === null) {
        try {
          const narrower = await registry.getNarrower({ concept: value })
          // Check is necessary since value could have changed in the meantime
          if (jskos.compare(value, this.state.selected)) {
            // @ts-ignore
            this.state.selected.narrower = narrower
          }
        } catch (error) {
          console.warn("Could not load narrower for", value.uri)
        }
      }
      if (!value.__DETAILSLOADED__) {
        try {
          const [details] = await registry.getConcepts({ concepts: [value] })
          if (jskos.compare(details, this.state.selected)) {
            for (const key in details) {
              // @ts-ignore
              if (!this.state.selected[key]) {
                // @ts-ignore
                this.state.selected[key] = details[key]
              }
            }
            // @ts-ignore
            this.state.selected.__DETAILSLOADED__ = 1
          }
        } catch (error) {
          console.warn("Could not load details for", value.uri)
        }
      }
      // Set URI in URL
      const urlParams = new URLSearchParams(window.location.search)
      urlParams.set("uri", value.uri)
      const url = `${window.location.href.replace(window.location.search, "")}?${urlParams.toString()}`
      window.history.replaceState({}, "", url)
    }
  },
  setSelectedUri(uri: string, _scheme?: Record<string, unknown>): void {
    if (!_scheme && uri.startsWith("http://dewey.info/class/")) {
      _scheme = scheme
    }
    const concept = {
      uri,
      scheme: _scheme,
    }
    this.setSelected(concept)
  }
}
