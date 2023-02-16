<template>
  <div class="calculator">
    <div class="display">
      <p class="display__result">{{ calculateStore.result || "0" }}</p>
    </div>
    <div @click="clear" class="btn">C</div>
    <div @click="sign" class="btn">+/-</div>
    <div @click="percent" class="btn">%</div>
    <div @click="divide" class="btn operator">÷</div>
    <div @click="append('7')" class="btn">7</div>
    <div @click="append('8')" class="btn">8</div>
    <div @click="append('9')" class="btn">9</div>
    <div @click="times" class="btn operator">x</div>
    <div @click="append('4')" class="btn">4</div>
    <div @click="append('5')" class="btn">5</div>
    <div @click="append('6')" class="btn">6</div>
    <div @click="minus" class="btn operator">-</div>
    <div @click="append('1')" class="btn">1</div>
    <div @click="append('2')" class="btn">2</div>
    <div @click="append('3')" class="btn">3</div>
    <div @click="add" class="btn operator">+</div>
    <div @click="append('0')" class="btn zero">0</div>
    <div @click="dot" class="btn">.</div>
    <div @click="equal" class="btn operator">=</div>
  </div>
</template>

<script setup lang="ts">
import { useCalculate } from "@/stores/counter";
import { onBeforeUnmount, onMounted } from "vue";
const calculateStore = useCalculate();

const {
  clear,
  sign,
  percent,
  divide,
  append,
  times,
  minus,
  add,
  dot,
  equal,
  keyDownHandler,
} = calculateStore;

onMounted(() => {
  window.addEventListener("keydown", keyDownHandler);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", keyDownHandler);
});
</script>

<style scoped>
.calculator {
  margin: 0 auto;
  width: 400px;
  font-size: 40px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(50px, auto);
}

.display {
  grid-column: 1 / 5;
  background-color: #333;
  color: white;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
}

.display__result {
  padding-left: 8px;
}

.zero {
  grid-column: 1 / 3;
}

.btn {
  background-color: #f2f2f2;
  border: 1px solid #999;
  padding-left: 8px;
  cursor: pointer;
}

.btn:active {
  opacity: 0.5;
}

.operator {
  background-color: orange;
  color: white;
}
</style>
