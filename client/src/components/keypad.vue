<template>
<div class="keypad">
  <div class="keypad-content">
    <div class="keypad-display">
      {{displayValue || ' '}}
    </div>
    <div class="keypad-keys">
      <div class="key" v-for="key in keys" v-on:click="keyClick(key)">
        {{key.label}}
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  props: {
    keys: {
      type: Array,
      default: () => [
        ...Array(9).fill(false).map((value, index) => {
          return {
            label: index + 1,
            value: index + 1
          }
        }),
        {
          label: 'x',
          action: 'clear'
        },
        {
          label: 0,
          value: 0
        },
        {
          label: '<-',
          action: 'complete'
        }
      ]
    },

    value: {
      type: [String, Number]
    }
  },

  data () {
    return {
      inputModel: []
    }
  },

  computed: {
    displayValue () {
      return this.inputModel.join('')
    }
  },

  methods: {
    complete () {
      let emittedValue = this.displayValue
      if (typeof this.value === 'number') {
        emittedValue = parseFloat(this.displayValue)
      }
      this.$emit('input', emittedValue)
    },

    clear () {
      this.inputModel = []
    },

    keyClick (key) {
      if (key.action) {
        this[key.action](key)
        return
      }

      this.inputModel.push(key.value)
    }
  },

  mounted () {
    this.inputModel = (this.value + '').split('')
  },

  watch: {
    value (value) {
      this.inputModel = (value + '').split('')
    }
  }
}
</script>
<style lang="scss">
.keypad {
  position: fixed;
  width:  100%;
  height: 100%;
  display: flex;

  justify-content: center;
  align-items: center;
}

.keypad-content {
  display: flex;
  flex-direction: column;
  max-width: 800px;
  max-height: 800px;
  background-color: white;
  color: #000;
  padding: 16px;
  box-shadow: 0px 0px 50px 0px rgba(0,0,0,0.5);
}

.keypad-display {
  display: flex;
  padding: 2em;
  font-size: 2vw;
  justify-content: center;
}

.keypad-keys {
  font-size: 6vw;
  flex: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  .key {
    flex: 1 0 33%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
