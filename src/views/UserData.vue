<template>
<div class="table-container">
    <table style="width: 100%">
        <tr>
            <th class="tag">编号</th> 
            <th class="tag">名称</th> 
            <th class="tag">住址</th> 
            <th class="tag">手机号</th>
        </tr>
        <tr 
        v-for="item in pageData" 
        :key="item.id"
        >
            <td class="tag-content">{{item.id}}</td>
            <td class="tag-content">{{item.name}}</td> 
            <td class="tag-content">{{item.address}}</td> 
            <td class="tag-content">{{item.phone}}</td>
        </tr>
    </table>
    <pagination></pagination>
</div>
</template>

<script>
import pagination from '../components/pagination.vue'
import Mock from 'mockjs'
export default {
    name: 'UserData',
    components: {
        pagination,
    },
    data() {
        return {
            pageData: ''
        }
    },
    mounted() {
        let m = Mock.mock({
            'data|10-30': [{
                'id|+1': 1,
                'name': '@CNAME',
                'phone': /^1[385][1-9]\d{8}/,    //18600018456
                'address': '@COUNTY(true)',
            }]
        });
        this.pageData = m.data;
    }
}
</script>

<style scoped>
table
{
    width: 50%;
    max-width: 800px;
    margin: 0 auto;
    margin-top: 100px;
    margin-bottom: 100px;
}
.tag, .tag-content
{
    border-left: 1px solid #c3c3c3;
    border-top: 1px solid #c3c3c3;
}
.tag
{
    padding: 10px;
    text-align: left;
}
.tag-content
{
    padding: 10px;
}
</style>
