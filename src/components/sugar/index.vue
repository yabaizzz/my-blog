<!-- 显示代码 -->
<template>
  <div>
    <div class="top"><span @click="copy()">{{ zt }}</span></div>
    <prism-editor
        class="my-editor"
        v-model="codes"
        :highlight="highlighter"
        :line-numbers="true"
        :readonly="true"
        :tabSize="2"></prism-editor>
  </div>
</template>
<script setup>
import {onMounted, ref, defineProps, watch} from "vue";
import {
  PrismEditor
} from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css'; // import the styles somewhere
import {ElMessage} from 'element-plus'

// import highlighting library (you can use any library you want just return html string)
import {
  highlight,
  languages
} from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css'; // import syntax highlighting styles


const props = defineProps(['code'])

const codes = ref('')
const zt = ref('复制')
const highlighter = (code) => {
  return highlight(code, languages.js) // returns html
}
const copy = () => {
  const url = codes.value
  let oInput = document.createElement('input')
  oInput.value = url
  document.body.appendChild(oInput)
  oInput.select() // 选择对象;
  document.execCommand('Copy') // 执行浏览器复制命令
  ElMessage.success({
    message: '复制成功',
    type: 'success',
    duration: 1500,
    customClass: 'messageIndex'
  })
  oInput.remove()

}
watch(() => props.code, (newValue, oldValue) => {
  console.log('newValue===', newValue);
  console.log('oldValue===', oldValue);
})
onMounted(() => {
  if (props.code) {
    codes.value = props.code
  }
})
</script>

<style scoped lang="less">

.my-editor {
  background: #2d2d2d;
  color: #ccc;
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
  box-sizing: border-box;
}

.my-editor-title {
  color: white;
  margin-top: 10px
}

.prism-editor__textarea:focus {
  outline: none
}

.top {
  background: #2D2D2D;
  color: #FFFFFF;
  font-size: 14PX;
  text-align: right;
  padding-right: 37.5px;
  box-shadow: 0px 4px 5px -6px #888888;

  span {
    cursor: pointer;
  }
}
</style>