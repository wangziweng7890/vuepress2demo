<!--
 * @Author: Feng
 * @Description: 页面尾部，用于layout
-->
<script setup lang="ts" name="footer">
</script>

<template>
  <footer id="foot-wrapper">
    <div class="foot-wrap">
      <div class="left_wrap">
        <div class="left">
          <div class="desc">
            详细目录
          </div>
        </div>
        <div class="left">
          <dl>
            <dd class="dd-content">
              <span>内容1</span>
            </dd>
          </dl>
        </div>
      </div>
      <div class="right_wrap">
        <div class="right">
          <dl>
            <dt>标题1</dt>
            <dd>内容1</dd>
          </dl>
          <dl>
            <dt>标题2</dt>
            <dd>内容2</dd>
          </dl>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
html {
    min-height: 100%;
    position: relative;
}
</style>

<style lang="scss" scoped>
$footer-width: 1200px;
footer {
    position: absolute;
    bottom: 0;
    left: 0;
    margin: 0;
    width: 100%;
    min-width: $footer-width;
    background-color: #010c32;
    @media screen and (min-width: 1200px) and (max-width: 1920px) {
        .foot-wrap {
            padding: 77px 36px;
        }
        @media (min-width: 1920px) {
            .foot-wrap {
                padding: 77px 80px;
            }
        }
    }
    .foot-wrap {
        display: flex;
        min-width: $footer-width;
        width: 100%;
        background-color: #010c32;
        min-height: 294px;
        padding: 77px 36px;
        position: absolute;
        bottom: 0;
        left: 0;
        .left_wrap {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .left {
                min-width: 352px;
                .item {
                    cursor: pointer;
                    color: #fff;
                }
                .dt-title {
                    font-size: 16px;
                    line-height: 16px;
                    color: #fff;
                }
                .dd-content {
                    font-size: 12px;
                    line-height: 12px;
                    margin-top: 12px;
                }
            }
            .desc {
                font-size: 14px;
                line-height: 14px;
                opacity: 0.9;
                margin-top: 12px;
            }
        }
        .right_wrap {
            display: flex;
            @media (min-width: 1920px) {
                .right:nth-child(3) {
                    margin-left: 160px;
                }
            }
            @media (min-width: 1200px) and (max-width: 1920px) {
                .right:nth-child(3) {
                    margin-left: 60px;
                }
            }
            @media (min-width: 1920px) {
                .right:nth-child(2) {
                    margin-left: 160px;
                }
            }
            @media (min-width: 1200px) and (max-width: 1920px) {
                .right:nth-child(2) {
                    margin-left: 60px;
                }
            }
            .right {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: space-between;
                dt {
                    font-size: 14px;
                    line-height: 14px;
                }
                dd {
                    font-size: 14px;
                    line-height: 16px;
                    margin-top: 12px;
                }
            }
        }
    }
}
</style>
