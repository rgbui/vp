<template>
  <div class="color-box">
    <div
      class="color-box-sv"
      @mousedown="hsl_mousedown"
      ref="sv"
      :style="{ background: 'hsl(' + h + ',100%,50%)' }"
    >
      <div class="color-white"></div>
      <div class="color-black"></div>
      <div class="color-thumb" ref="sv_thumb" :style="svStyle"></div>
    </div>
    <div class="color-box-bar">
      <div class="color-current-value color-transparent-bg" @click="pickColor">
        <i :style="{ backgroundColor: rgba }"></i>
      </div>
      <div class="color-hue">
        <div class="color-bar"></div>
        <input
          type="range"
          min="0"
          max="360"
          step="10"
          :value="h"
          @input="input({ h: $event.currentTarget.value })"
        />
      </div>
      <div class="color-alpha color-transparent-bg">
        <div class="color-bar" :style="{ background: alphaBg }"></div>
        <input
          type="range"
          min="0"
          max="100"
          step="10"
          :value="a"
          @input="input({ a: $event.currentTarget.value })"
        />
      </div>
    </div>
    <div class="color-box-form">
      <ol>
        <li>
          <input
            type="text"
            @input="input({ hex: $event.currentTarget.value })"
            @keydown.stop=""
            :value="hex"
          />
          <span>HEX</span>
        </li>
        <li>
          <input
            type="text"
            @input="input({ r: $event.currentTarget.value })"
            @keydown.stop=""
            :value="r"
          />
          <span>R</span>
        </li>
        <li>
          <input
            type="text"
            @input="input({ g: $event.currentTarget.value })"
            @keydown.stop=""
            :value="g"
          />
          <span>G</span>
        </li>
        <li>
          <input
            type="text"
            @input="input({ b: $event.currentTarget.value })"
            @keydown.stop=""
            :value="b"
          />
          <span>B</span>
        </li>
        <li>
          <input
            type="text"
            @input="input({ A: $event.currentTarget.value })"
            @keydown.stop=""
            :value="A"
          />
          <span>A</span>
        </li>
      </ol>
    </div>
  </div>
</template>