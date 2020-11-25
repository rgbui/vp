<template>
  <div class="vp-date" tabindex="1" @focusin="focus" @focusout="blur">
    <input
      type="text"
      :value="dateText"
      :placeholder="placeholder"
      readonly
      @click="toggle"
    />
    <vp-icon
      :icon="mode == 'time' ? 'clock-o:font' : 'calendar:font'"
    ></vp-icon>
    <div class="vp-date-drop" v-show="spread">
      <div class="vp-date-selector-year" v-if="selector == 'year'">
        <div class="vp-date-selector-year-head">
          <vp-icon
            @click.native="
              fromYear = fromYear - 10;
              toYear = toYear - 10;
            "
            icon="angle-double-left:font"
          ></vp-icon>
          <span class="vp-date-selector-year-head-title"
            ><i>{{ fromYear }}</i
            >年<em>-</em><i>{{ toYear }}</i
            >年</span
          >
          <vp-icon
            icon="angle-double-right:font"
            @click.native="
              toYear = toYear + 10;
              fromYear = fromYear + 10;
            "
          ></vp-icon>
        </div>
        <div class="vp-date-selector-year-list">
          <a
            v-for="n in 11"
            :key="n"
            @click="
              setYear(fromYear + n - 1);
              setSelector('month');
            "
            :class="{ hover: year == fromYear + n - 1 }"
            >{{ fromYear + n - 1 }}</a
          >
        </div>
      </div>
      <div class="vp-date-selector-month" v-else-if="selector == 'month'">
        <div class="vp-date-selector-month-head">
          <vp-icon
            icon="angle-double-left:font"
            @click.native="setYear(year - 1)"
          ></vp-icon>
          <span class="vp-date-selector-month-head-title"
            ><i @click="setSelector('year')">{{ year }}</i
            >年
          </span>
          <vp-icon
            icon="angle-double-right:font"
            @click.native="setYear(year + 1)"
          ></vp-icon>
        </div>
        <div class="vp-date-selector-month-list">
          <a
            v-for="(mo, i) in months"
            :key="mo"
            @click="
              setMonth(i + 1);
              setSelector('day');
            "
            :class="{ hover: i + 1 == month }"
            >{{ mo }}</a
          >
        </div>
      </div>
      <div class="vp-date-selector-date" v-else-if="selector == 'day'">
        <div class="vp-date-selector-date-head">
          <vp-icon
            icon="angle-double-left:font"
            @click.native="setYear(year - 1)"
          ></vp-icon>
          <vp-icon
            icon="angle-left:font"
            @click.native="setMonth(month == 1 ? 12 : month - 1)"
          ></vp-icon>
          <span class="vp-date-selector-date-head-title"
            ><i @click="setSelector('year')">{{ year }}年</i
            ><i @click="setSelector('month')">{{ month }}月</i></span
          >
          <vp-icon
            icon="angle-right:font"
            @click.native="setMonth(month == 12 ? 1 : month + 1)"
          ></vp-icon>
          <vp-icon
            icon="angle-double-right:font"
            @click.native="setYear(year + 1)"
          ></vp-icon>
        </div>
        <div class="vp-date-selector-date-week">
          <a v-for="w in weeks" :key="w">{{ w }}</a>
        </div>
        <div class="vp-date-selector-date-days">
          <a
            v-for="d in days"
            :class="{
              hover:
                d.getDate() == day &&
                d.getMonth() + 1 == month &&
                d.getFullYear() == year,
            }"
            :key="d.getTime()"
            @click="setDay(d)"
            >{{ d.getDate() }}</a
          >
        </div>
        <div class="vp-date-selector-date-footer">
          <span v-if="mode == 'datetime'" @click="setSelector('time')"
            >{{ pad(hour) }}:{{ pad(minute) }}:{{ pad(second) }}</span
          >
          <a @click="setNow">此刻</a><a @click="setEmit(true)">确定</a>
        </div>
      </div>
      <div class="vp-date-selector-time" v-else-if="selector == 'time'">
        <div class="vp-date-selector-time-drop">
          <div
            ref="time_hour"
            class="vp-date-selector-time-hours"
            @scroll="scroll('hour', $event)"
          >
            <a
              v-for="n in 24"
              @click="setHour(n - 1)"
              :class="{ hover: hour == n - 1 }"
              :key="n"
              >{{ pad(n - 1) }}</a
            >
          </div>
          <div
            ref="time_minute"
            class="vp-date-selector-time-minutes"
            @scroll="scroll('minute', $event)"
          >
            <a
              v-for="n in 60"
              @click="setMinute(n - 1)"
              :key="n"
              :class="{ hover: minute == n - 1 }"
              >{{ pad(n - 1) }}</a
            >
          </div>
          <div
            ref="time_second"
            class="vp-date-selector-time-seconds"
            @scroll="scroll('second', $event)"
          >
            <a
              v-for="n in 60"
              :key="n"
              @click="setSecond(n - 1)"
              :class="{ hover: second == n - 1 }"
              >{{ pad(n - 1) }}</a
            >
          </div>
        </div>

        <div class="vp-date-selector-time-footer">
          <a @click="setTimeEmit()">确定</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    disabled: { type: Boolean, default: false },
    value: { type: Object },
    placeholder: { type: String, default: "" },
    /***
     * @param mode date
     * @param mode datetime
     * @param mode time
     */
    mode: { type: String, default: "date" },
  },
  computed: {
    weeks() {
      return ["周", "一", "二", "三", "四", "五", "六"];
    },
    months() {
      return [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月",
      ];
    },
    days() {
      var from: Date = new Date();
      from.setFullYear(this.year);
      from.setMonth(this.month - 1);
      from.setDate(1);
      from.setHours(1);
      from.setMinutes(0);
      from.setSeconds(0);
      var isLeap =
        (this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0;
      var currentDays = [1, 3, 5, 7, 8, 10, 12].includes(this.month) ? 31 : 30;
      if (this.month == 2) {
        if (isLeap) currentDays = 29;
        else currentDays = 28;
      }
      var end: Date = new Date();
      end.setFullYear(this.year);
      end.setMonth(this.month - 1);
      end.setDate(currentDays);
      end.setHours(1);
      end.setMinutes(0);
      end.setSeconds(0);
      var days: Date[] = [];
      if (from.getDay() > 0) {
        var w = from.getDay();
        for (let j = 0; j < w; j++) {
          var newDate = new Date(
            from.getTime() - (w - j) * 1000 * 60 * 60 * 24
          );
          days.push(newDate);
        }
      }

      for (let i = 1; i <= currentDays; i++) {
        var newDate = new Date(from.getTime() + (i - 1) * 1000 * 60 * 60 * 24);
        days.push(newDate);
      }

      if (end.getDay() < 6) {
        var e = end.getDay();
        for (let m = e + 1; m < 7; m++) {
          var newDate = new Date(end.getTime() + (m - e) * 1000 * 60 * 60 * 24);
          days.push(newDate);
        }
      }
      return days;
    },
  },
  data() {
    var dateText = "";
    var isShowText = false;
    if (!this.value) this.$set(this, "value", new Date());
    else isShowText = true;
    var year = this.value.getFullYear();
    var object = {
      dateText,
      isFocus: false,
      spread: false,
      selector: this.mode == "time" ? "time" : "day",
      year: year,
      day: (this.value as Date).getDate(),
      month: (this.value as Date).getMonth() + 1,
      hour: (this.value as Date).getHours(),
      minute: (this.value as Date).getMinutes(),
      second: (this.value as Date).getSeconds(),
      fromYear: Math.floor(year % 10 == 0 ? (year - 1) / 10 : year / 10) * 10,
      toYear: Math.ceil(year / 10) * 10,
    };
    if (isShowText == true) {
      if (this.mode == "date")
        object.dateText = `${object.year}-${object.month}-${object.day}`;
      else if (this.mode == "datetime") {
        object.dateText = `${object.year}-${object.month}-${object.day} ${object.hour}:${object.minute}:${object.second}`;
      } else if (this.mode == "time") {
        object.dateText = `${object.hour}:${object.minute}:${object.second}`;
      }
    }
    return object;
  },
  methods: {
    focus() {
      this.isFocus = true;
    },
    blur(event: FocusEvent) {
      if (
        (this.$el as HTMLDivElement).contains(
          event.relatedTarget as HTMLDivElement
        )
      )
        return;
      this.isFocus = false;
      this.spread = false;
    },
    toggle(event: MouseEvent) {
      this.spread = this.spread ? false : true;
      if (this.spread == true && this.selector == "time") {
        Vue.nextTick(() => {
          this.setScroll();
        });
      }
    },
    setYear(year) {
      this.year = year;
      this.showDateText();
      this.setEmit();
    },
    setMonth(month) {
      this.month = month;
      this.showDateText();
      this.setEmit();
    },
    setDay(d) {
      this.year = d.getFullYear();
      this.month = d.getMonth() + 1;
      this.day = d.getDate();
      this.showDateText();
      this.setEmit();
    },
    setSelector(selector) {
      this.selector = selector;
      if (this.selector == "time") {
        Vue.nextTick(() => {
          this.setScroll();
        });
      }
    },
    setNow() {
      var now = new Date();
      this.year = now.getFullYear();
      this.day = now.getDay();
      this.month = now.getMonth() + 1;
      this.minute = now.getMinutes();
      this.second = now.getSeconds();
      this.hour = now.getHours();
      this.showDateText();
      this.setEmit();
    },
    setEmit(force?: boolean) {
      var date = new Date();
      date.setFullYear(this.year);
      date.setMonth(this.month - 1);
      date.setDate(this.day);
      date.setHours(this.hour);
      date.setMinutes(this.minute);
      date.setSeconds(this.second);
      this.$emit("change", date);
      if (force == true) {
        this.spread = false;
      }
    },
    setTimeEmit() {
      if (this.mode == "time") {
        this.setEmit(true);
      } else {
        this.selector = "day";
      }
    },
    showDateText() {
      if (this.mode == "date")
        this.dateText = `${this.year}-${this.month}-${this.day}`;
      else if (this.mode == "datetime") {
        this.dateText = `${this.year}-${this.month}-${this.day} ${this.hour}:${this.minute}:${this.second}`;
      } else if (this.mode == "time") {
        this.dateText = `${this.pad(this.hour)}:${this.pad(
          this.minute
        )}:${this.pad(this.second)}`;
      }
    },
    pad(n) {
      return n.toString().length == 1 ? "0" + n : n;
    },
    scroll(name: string, event: MouseEvent) {
      var ele = event.target as HTMLDivElement;
      var top = ele.scrollTop;
      top += 10;
      if (name == "hour") {
        var n = Math.ceil(top / 20) - 1;
        this.hour = n;
      } else if (name == "minute") {
        var n = Math.ceil(top / 20) - 1;
        this.minute = n;
      } else if (name == "second") {
        var n = Math.ceil(top / 20) - 1;
        this.second = n;
      }
      this.showDateText();
      this.setEmit();
    },
    setHour(hour) {
      this.hour = hour;
      this.setScroll();
    },
    setMinute(minute: number) {
      this.minute = minute;
      this.setScroll();
    },
    setSecond(second: number) {
      this.second = second;
      this.setScroll();
    },
    setScroll() {
      if (this.$refs["time_hour"]) {
        (this.$refs["time_hour"] as HTMLDivElement).scrollTop = this.hour * 20;
      }
      if (this.$refs["time_minute"]) {
        (this.$refs["time_minute"] as HTMLDivElement).scrollTop =
          this.minute * 20;
      }
      if (this.$refs["time_second"]) {
        (this.$refs["time_second"] as HTMLDivElement).scrollTop =
          this.second * 20;
      }
    },
  },
});
</script>
<style lang="less">
.vp-date {
  width: 100%;
  position: relative;
  input[type="text"] {
    height: @height;
    width: 100%;
    box-sizing: border-box;
    color: @text-color;
    background-color: @grey;
    border-radius: @radius;
    border: 1px solid @grey-border-3x;
    box-shadow: @shadow-inner-2x;
    text-indent: @gap-min;
    &::-webkit-input-placeholder {
      color: @text-color-disabled;
    }
  }
  > .vp-icon {
    color: @text-color-disabled;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    width: @height;
    height: @height;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &-drop {
    left: 0px;
    position: absolute;
    top: @height;
    box-shadow: @shadow-2x;
    border: 1px solid @grey-border-3x;
    padding: @gap-space;
    border-radius: @radius-2x;
    background-color: @grey-background;

    .vp-date-selector {
      &-year {
        &-head {
          display: flex;
          height: 30px;
          justify-content: flex-start;
          align-items: center;
          > .vp-icon {
            width: 24px;
            height: 24px;
            flex-shrink: 1;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }
          &-title {
            flex-grow: 1;
            display: inline-block;
            text-align: center;
          }
        }
        &-list {
          margin-top: @gap;
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          width: 200px;
          flex-wrap: wrap;
          a {
            display: inline-block;
            width: 50px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            cursor: pointer;
            &.hover {
              color: @primary-color;
            }
          }
        }
      }
      &-month {
        &-head {
          display: flex;
          height: 30px;
          justify-content: flex-start;
          align-items: center;
          > .vp-icon {
            width: 24px;
            height: 24px;
            flex-shrink: 1;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }
          &-title {
            flex-grow: 1;
            display: inline-block;
            text-align: center;
          }
        }
        &-list {
          margin-top: @gap;
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          width: 200px;
          flex-wrap: wrap;
          a {
            display: inline-block;
            width: 50px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            cursor: pointer;
            &.hover {
              color: @primary-color;
            }
          }
        }
      }
      &-date {
        &-head {
          display: flex;
          height: 30px;
          justify-content: flex-start;
          align-items: center;
          > .vp-icon {
            width: 24px;
            height: 24px;
            flex-shrink: 1;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }
          &-title {
            flex-grow: 1;
            display: inline-block;
            text-align: center;
          }
        }
        &-week {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          a {
            width: 30px;
            height: 30px;
            text-align: center;
            line-height: 30px;
          }
        }
        &-days {
          width: 210px;
          flex-wrap: wrap;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          a {
            width: 30px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            border-radius: 50%;
            cursor: pointer;
            &.hover {
              background: @primary-color;
              color: #fff;
            }
          }
        }
        &-footer {
          display: flex;
          height: 30px;
          justify-content: flex-end;
          align-items: center;
          position: relative;
          a {
            display: inline-block;
            margin-left: @gap;
            height: 24px;
            line-height: 24px;
            padding: 0px @gap;
            border-radius: @radius;
            &:first-child {
              color: @primary-color;
              cursor: pointer;
            }
            &:last-child {
              background-color: @primary-color;
              color: #fff;
              cursor: pointer;
            }
          }
          span {
            position: absolute;
            top: 0px;
            left: 0px;
            height: 30px;
            line-height: 30px;
            margin-left: @gap;
            cursor: pointer;
          }
        }
      }
      &-time {
        &-drop {
          margin: @gap 0px;
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          position: relative;
          &::after {
            content: "\20";
            position: absolute;
            top: 50%;
            left: 0px;
            right: 0px;
            height: 20px;
            margin-top: -11px;
            border: 1px solid @grey-border-2x;
            border-left-color: transparent;
            border-right-color: transparent;
            pointer-events: none;
          }
          > * {
            width: 60px;
            height: 180px;
            overflow-x: hidden;
            box-sizing: border-box;
            overflow-y: auto;
            padding-top: 80px;
            padding-bottom: 80px;
            a {
              display: block;
              text-align: center;
              height: 20px;
              line-height: 20px;
              &.hover {
                font-weight: bold;
              }
            }
          }
        }
        &-footer {
          display: flex;
          height: 30px;
          justify-content: flex-end;
          align-items: center;
          a {
            display: inline-block;
            margin-left: @gap;
            height: 24px;
            line-height: 24px;
            padding: 0px @gap;
            border-radius: @radius;
            &:last-child {
              background-color: @primary-color;
              color: #fff;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>