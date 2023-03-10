<template>
  <div
    ref="block"
    class="demo-block"
    :class="[{ 'hover': hovering }]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false">
    <div class="source">
      <slot name="source"></slot>
    </div>
    <div class="meta" ref="meta">
      <div class="description" v-if="$slots.default">
        <slot></slot>
      </div>
      <div class="highlight">
        <slot name="highlight"></slot>
      </div>
    </div>
    <div
      class="demo-block-control"
      ref="control"
      :class="{ 'is-fixed': fixedControl }"
      :style="{width:width+'px'}"
      @click="isExpanded = !isExpanded">
      <transition name="text-slide">
        <span
          class="copy-code-button"
          v-show="isExpanded || isExpanded"
          @click.stop="copyCode"
        >复制代码</span>
      </transition>
      <transition name="arrow-slide">
        <i :class="[iconClass, { 'hovering': hovering }]"></i>
      </transition>
      <transition name="text-slide">
        <span>{{ controlText }}</span>
      </transition>
    </div>
  </div>
</template>
<script>

export default {
  name: 'DemoBlock',
  data () {
    return {
      codepen: {
        script: '',
        html: '',
        style: ''
      },
      hovering: false,
      isExpanded: false,
      fixedControl: false,
      scrollParent: null,
      width: ''
    }
  },

  methods: {

    // 代码打开后的滚动事件处理
    scrollHandler () {
      if (!this.$refs.meta) {
        return
      }
      const { top, bottom, left } = this.$refs.meta.getBoundingClientRect()
      this.fixedControl = bottom > document.documentElement.clientHeight &&
        top + 44 <= document.documentElement.clientHeight
      this.$refs.control.style.left = this.fixedControl ? `${left}px` : '0'
    },

    // 移除滚动事件
    removeScrollHandler () {
      this.scrollParent && this.scrollParent.removeEventListener('scroll', this.scrollHandler)
    },

    // 复制code
    copyCode () {
        if (this.code) {
          this.copyToClipboard(this.code)
        }
    },
    copyToClipboard (textToCopy) {
      if (!textToCopy || textToCopy === '-') {
        return
      }
      const textArea = document.createElement('textarea')
      document.body.appendChild(textArea)
      textArea.value = textToCopy
      textArea.select()
      document.execCommand('Copy')
      textArea.remove()
      this.$message.success('代码已复制到剪切板')
    },
  },

  computed: {
    langConfig () {
      return {
        'hide-text': '隐藏代码',
        'show-text': '显示代码',
        'button-text': '在线运行',
        'tooltip-text': '前往 codepen.io 运行此示例'
      }
    },
    iconClass () {
      return this.isExpanded ? 'ml-icon-caret-top' : 'ml-icon-caret-bottom'
    },

    controlText () {
      return this.isExpanded ? this.langConfig['hide-text'] : this.langConfig['show-text']
    },

    codeArea () {
      return this.$el.getElementsByClassName('meta')?.[0]
    },

    codeAreaHeight () {
      if (this.$el.getElementsByClassName('description').length > 0) {
        return this.$el.getElementsByClassName('description')[0].clientHeight +
          this.$el.getElementsByClassName('highlight')[0].clientHeight + 20
      }
      return this.$el.getElementsByClassName('highlight')[0].clientHeight
    }
  },

  watch: {

    // 展开代码块
    isExpanded (val) {
      this.codeArea.style.height = val ? `${this.codeAreaHeight + 1}px` : '0'
      if (!val) {
        this.fixedControl = false
        this.$refs.control.style.left = '0'
        this.removeScrollHandler()
        return
      }
      setTimeout(() => {
        window.addEventListener('scroll', this.scrollHandler)
        this.scrollHandler()
      }, 200)
    }
  },

  mounted () {
    this.$nextTick(() => {
        this.width = this.$refs.block.clientWidth
        let highlight = this.$el.getElementsByClassName('highlight')[0]
        if (this.$el.getElementsByClassName('description').length === 0) {
          highlight.style.width = '100%'
          highlight.borderRight = 'none'
        }
        const highlight2 = this.$slots.default
        const highlight2El = highlight2?.[highlight2.length - 1];
        this.code = highlight2El?.elm?.children?.[0]?.innerText || '';
    })
  },

  beforeDestroy () {
    this.removeScrollHandler()
  }
}
</script>

<style lang="stylus">
  .demo-block {
    border: solid 1px #ebebeb;
    border-radius: 3px;
    transition: .2s;
    width: 100%;
    &.hover {
      box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6), 0 2px 4px 0 rgba(232, 237, 250, .5);
    }
    code {
      font-family: Menlo, Monaco, Consolas, Courier, monospace;
    }
    .demo-button {
      float: right;
    }
    .source {
      padding: 24px;
    }
    .meta {
      background-color: #fff;
      border-top: solid 1px #eaeefb;
      overflow: hidden;
      height: 0;
      transition: height 0.6s;
    }
    .description {
      padding: 20px;
      box-sizing: border-box;
      font-size: 14px;
      line-height: 22px;
      color: #666;
      word-break: break-word;
      background-color: #fff;
      p {
        margin: 0;
        line-height: 26px;
      }
      code {
        color: #5e6d82;
        background-color: #e6effb;
        margin: 0 4px;
        display: inline-block;
        padding: 1px 5px;
        font-size: 12px;
        border-radius: 3px;
        height: 18px;
        line-height: 18px;
      }
    }
    .highlight {
      pre {
        margin: 0;
      }
      code.hljs {
        margin: 0;
        border: none;
        max-height: none;
        border-radius: 0;
        &::before {
          content: none;
        }
      }
    }
    .demo-block-control {
      width: 100%;
      border-top: solid 1px #eaeefb;
      height: 44px;
      box-sizing: border-box;
      background-color: #fff;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      text-align: center;
      margin-top: -1px;
      color: #d3dce6;
      cursor: pointer;
      position: relative;
      &.is-fixed {
        position: fixed;
        bottom: 0;
        z-index 1000
      }
      i {
        font-size: 16px;
        line-height: 44px;
        transition: .3s;
        &.hovering {
          transform: translateX(-40px);
        }
      }
      > span {
        position: absolute;
        transform: translateX(-30px);
        font-size: 14px;
        line-height: 44px;
        transition: .3s;
        display: inline-block;
      }
      &:hover {
        color: #409EFF;
        background-color: #f9fafc;
      }
      & .text-slide-enter,
      & .text-slide-leave-active {
        opacity: 0;
        transform: translateX(10px);
      }
      .control-button {
        line-height: 26px;
        position: absolute;
        top: 10px;
        right: 0;
         color: #409eff;
        font-size: 14px;
        padding-left: 5px;
        padding-right: 25px;
      }
      .copy-code-button {
        position: absolute;
        left: 0;
        top: 10px;
        color: #409eff;
        transform: translateX(10px);
        font-size: 14px;
        line-height: 26px;
        padding-left: 5px;
        padding-right: 25px;
      }
    }
  }
</style>


