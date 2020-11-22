<template>
  <div class="vp-date" tabindex="1" @focusin="focus" @focusout="blur">
    <input
      type="text"
      :value="dateText"
      :placeholder="placeholder"
      readonly
      @click="toggle"
    />
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
          <a @click="setNow">此刻</a><a @click="setEmit(true)">确定</a>
        </div>
      </div>
      <div class="vp-date-selector-time" v-else-if="selector == 'time'">
        <div class="vp-date-selector-time-hours"></div>
        <div class="vp-date-selector-time-minutes"></div>
        <div class="vp-date-selector-time-seconds"></div>
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
    if (!this.value) this.$set(this, "value", new Date());
    else
      dateText = `${this.value.getFullYear()}-${
        this.value.getMonth() + 1
      }-${this.value.getDate()}`;
    var year = this.value.getFullYear();
    return {
      dateText,
      isFocus: false,
      spread: false,
      selector: "day",
      year: year,
      day: (this.value as Date).getDate(),
      month: (this.value as Date).getMonth() + 1,
      hour: (this.value as Date).getHours(),
      minute: (this.value as Date).getMinutes(),
      second: (this.value as Date).getSeconds(),
      fromYear: Math.floor(year % 10 == 0 ? (year - 1) / 10 : year / 10) * 10,
      toYear: Math.ceil(year / 10) * 10,
    };
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
    showDateText() {
      this.dateText = `${this.year}-${this.month}-${this.day}`;
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
        }
      }
      &-time {
      }
    }
  }
}
</style>