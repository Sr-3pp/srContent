<template>
  <div
    class="sr-tabs"
    :class="{ editable, [css.class]: css.class }"
    :style="{ ...css.style }"
  >
    <ul class="sr-tabs-items">
      <li class="sr-tabs-item" v-for="(item, i) in items" :key="i">
        <label>
          <input
            type="radio"
            tabindex="0"
            :name="`${name}-tabs-item`"
            :value="i"
            v-model="current"
            :checked="i == current"
          />
          <span v-if="!editable">
            {{ item.label }}
          </span>
          <input v-else type="text" @focus="current = i" v-model="item.label" />
        </label>
        <button
          class="sr-tabs-delete-btn"
          v-if="editable"
          @click="items.splice(i, 1)"
        >
          <svg
            clip-rule="evenodd"
            fill-rule="evenodd"
            stroke-linejoin="round"
            stroke-miterlimit="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z"
              fill-rule="nonzero"
            />
          </svg>
        </button>
      </li>
      <slot
        name="item"
        :current="current"
        :toggle="(idx: number) => current = idx"
      ></slot>
      <li class="sr-tabs-item" v-if="editable">
        <button class="sr-tabs-add-btn" @click="addItem">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7 14h-5v5h-4v-5h-5v-4h5v-5h4v5h5v4z"
            />
          </svg>
        </button>
      </li>
    </ul>
    <TransitionGroup tag="div" name="component-fade" mode="out-in">
      <article
        tabindex="0"
        v-for="(item, i) in items"
        :key="item.id || new Date().getTime() + i"
        class="sr-tabs-content"
        v-show="current == i"
      >
        <component
          v-for="(element, j) in item.content"
          :is="element.component"
          v-bind="element.props"
          :key="j"
          @input="updateValue(element, $event)"
          @change="updateValue(element, $event)"
          @toggle="updateValue(element, $event)"
          @delete="item.content.splice(j, 1)"
          @edit-props="($event: any, props: any) => {
          Object.entries(props || {}).forEach(([key, value]: [string, any]) => element.props[key] = value)
          EmitHandler($event, element, (data: any) =>
            $emit('edit-props', data)
          )
        }
        "
          @component-list="
            EmitHandler($event, element, (data: any) =>
              $emit('component-list', data)
            )
          "
          @media-gallery="
            EmitHandler($event, element, (data: any) =>
              $emit('media-gallery', data)
            )
          "
          @icon-gallery="
            EmitHandler($event, element, (data: any) =>
              $emit('icon-gallery', data)
            )
          "
        ></component>
        <Button
          class="add-btn"
          v-if="editable"
          @click="
            $emit('component-list', {
              component: { props: { content: items[current].content } },
              sw: false,
            })
          "
        >
          add Component
        </Button>
      </article>
    </TransitionGroup>
    <slot name="content" :current="current"></slot>

    <ActionBox
      v-if="editable"
      @edit-props="$emit('edit-props', null, props)"
      @delete="$emit('delete')"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, useSlots } from "vue";
import { EmitHandler, updateValue } from "../../assets/ts/utilities";
import Button from "../Form/Button.vue";
import ActionBox from "../ActionBox.vue";
const props = defineProps({
  items: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  name: {
    type: String,
    default: "sr",
  },
  active: {
    type: Number,
    default: 0,
  },
  editable: {
    type: Boolean,
    default: false,
  },
  css: {
    type: Object,
    default: () => ({
      class: "",
      style: {},
    }),
  },
});
const emit = defineEmits([
  "input",
  "edit-props",
  "delete",
  "component-list",
  "media-gallery",
  "icon-gallery",
  "new-item",
]);
const current = computed({
  get: () => props.active,
  set: (value) => {
    emit("input", {
      key: "active",
      value,
    });
  },
});

const slots = useSlots();

const addItem = () => {
  const item = { label: "New Tab", content: [] };
  if (Object.keys(slots).length) {
    emit("new-item", item);
  } else {
    props.items.push(item);
  }
};
</script>

<style lang="scss">
.component-fade-move, /* apply transition to moving elements */
.component-fade-enter-active,
.component-fade-leave-active {
  transition: all 0.5s ease;
}

.component-fade-enter-from,
.component-fade-leave-to {
  opacity: 0;
}

.component-fade-leave-active {
  position: absolute;
  display: none;
  width: 100%;
}
.sr-tabs {
  overflow: hidden;
  &-items {
    --bg-color: #eee;
    --focus-color: lightblue;
    --border-color: #ccc;
    display: flex;
    flex-direction: row;
    list-style: none;
    padding: 0;
    margin: 0;
    overflow: auto;
  }
  &-item {
    display: flex;
    position: relative;
    cursor: pointer;

    label {
      cursor: pointer;
      overflow: hidden;
      display: flex;
      align-items: center;
      &:focus-within {
        outline: none;
        border-color: var(--focus-color);
        border-width: 2px;
        border-style: solid;
        background-color: var(--bg-color);
      }
      &:has(input:checked) {
        background-color: var(--bg-color);
      }
    }

    span {
      border: pxToRem(1) solid var(--border-color);
      border-bottom: none;
      display: flex;
      align-items: center;
      padding: pxToRem(10) pxToRem(20);
      height: 100%;
    }

    input[type="text"] {
      padding: pxToRem(10);
      background: none;
      border: none;
    }

    input[type="radio"] {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;

      &:checked + span {
        background-color: var(--bg-color);
      }

      &:focus + span {
        border-color: var(--focus-color);
        border-width: 2px;
      }
    }
    &:hover {
      background-color: var(--bg-color);
    }
  }

  &-content {
    display: flex;
    flex-direction: column;
    padding: pxToRem(16);
    border: 1px solid #ccc;
    border-radius: 0 0 pxToRem(8) pxToRem(8);
    background-color: #fff;

    &:focus {
      outline: none;
      border-color: lightblue;
      border-width: 2px;
      border-style: solid;
    }

    .add-btn {
      flex-grow: 0;
      margin-top: pxToRem(10);
      align-self: center;
    }
  }

  &-delete-btn {
    background: red;
    border: none;
    width: pxToRem(25);
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      fill: white;
      width: 50%;
    }
  }

  &-add-btn {
    background: none;
    padding: pxToRem(10);
    border: none;
    color: var(--highlight-color);
    svg {
      fill: currentColor;
    }
  }
}
</style>
