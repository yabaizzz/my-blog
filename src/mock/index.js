// src/mock/index.js
import Mock from 'mockjs'  //导入mockjs

//使用Mock下面提供的mock方法进行需要模拟数据的封装
//参数1，是需要拦截的完整请求地址，参数2，是请求方式，参数3，是请求的模拟数据

Mock.mock('/getList?page=1', 'get', {
    status: 200, //请求成功状态码
    dataList: [
        {
            title: '使用 Poi-tl 类库实现 Echarts 图表 + 前端表格导出到 Word 文档',
            author: 'yabaiz',
            date: '2023/6/11',
            label: 'java',
            label2: '1'//1是后端，2是前端
        },
        {
            title: '使用 VuePress + GitHub Pages + GitHub Actions 搭建个人博客',
            author: 'yabaiz',
            date: '2023/6/12',
            label: 'VuePress',
            label2: '2'
        },
        {
            title: 'VuePress 个人博客美化：vuepress-theme-reco 主题使用',
            author: 'yabaiz',
            date: '2023/6/13',
            label: 'vuepress',
            label2: '2'
        },
        {
            title: '使用 Docker Compose 部署 Elasticsearch + Kibana',
            author: 'yabaiz',
            date: '2023/6/14',
            label: 'Docker',
            label2: '1'
        },
        {
            title: '使用 Dockerfile + Docker Compose 部署 Web 项目',
            author: 'yabaiz',
            date: '2023/6/15',
            label: 'Docker',
            label2: '1'
        },

    ]//模拟的请求
})
Mock.mock('/getList?page=2', 'get', {
    status: 200, //请求成功状态码
    dataList: [
        {
            title: '关圣帝君觉世真经',
            author: 'yabaiz',
            date: '2023/6/15',
            label: '道',
            label2: '3'
        },
        {
            title: '太上老君说常清静经',
            author: 'yabaiz',
            date: '2023/6/15',
            label: '道',
            label2: '3'
        },
        {
            title: '太乙金华宗旨',
            author: 'yabaiz',
            date: '2023/6/15',
            label: '道',
            label2: '3'
        },
        {
            title: '素书',
            author: 'yabaiz',
            date: '2023/6/15',
            label: '道',
            label2: '3'
        },
    ]//模拟的请求
})