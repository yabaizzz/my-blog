<template>
  <div class="root">
    <el-upload
        class="upload-demo"
        drag
        action=""
        :http-request="upload"
        multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>

<script setup>
import calendar from "@/components/calendar.vue";
import {getCurrentInstance, onMounted, reactive, ref} from 'vue'
import utils from "@/util/utils";
import {upPic, getPageParam, getBrowserType, getNowFormatDate} from "@/util/api";
import {useRouter, useRoute} from 'vue-router'

const router = useRouter()
const api = getCurrentInstance()
onMounted(() => {
  utils.getUser({user_id: 2}).then(res => {
    console.log(res, 'resres')
  })
  router.push({
    name: 'home',
    query: {}
  })
  // api.proxy.$request.getUser({user_id: 2}).then(res => {
  //   console.log(res,'resres')
  // })
})

function upload(e) {
  console.log(e, 'file')
  upPic(e.file, true).then(res => {
    console.log(res, '最终图片路劲')
  })
}
</script>

<style scoped lang="less">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>