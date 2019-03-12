<template>
<div class="table-container">
    <table style="width: 100%">
        <tr>
            <th class="tag">编号</th> 
            <th class="tag">名称</th> 
            <th class="tag">住址</th> 
            <th class="tag">手机号</th>
            <th class="tag">操作</th>
        </tr>
        <tr 
        class="table-tr"
        v-for="item in pageData" 
        :key="item.id"
        >
            <td class="tag-content">{{item.id}}</td>
            <td class="tag-content">{{item.name}}</td> 
            <td class="tag-content">{{item.address}}</td> 
            <td class="tag-content">{{item.phone}}</td>
            <td class="tag-content">
                <button class="table-button" id="edit">编辑</button>
                <button class="table-button" id="delete">删除</button>
            </td>
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
            'data|20': [{
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
    border-collapse: collapse;
}
.tag, .tag-content
{
    border-left: 1px solid #c3c3c3;
    border-top: 1px solid #c3c3c3;
}
.tag:last-of-type, .table-tr:last-of-type, .tag-content:last-of-type
{
    border-bottom: 1px solid #c3c3c3;
    border-right: 1px solid #c3c3c3;
}
.table-tr:nth-last-of-type(2n+1)
{
    background-color: #ededed;
}
.table-tr:hover
{
    background-color: #b6f5b6;
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
.table-button
{
    padding: 7px 15px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    cursor: pointer;
}
.table-button:last-of-type
{
    margin-left: 10px;
}
#edit
{
    background-color: #fff;
}
#edit:hover
{
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff
}
#delete
{
    color: #fff;
    background-color: #f56c6c;
    border-color: #f56c6c;
}
#delete:hover
{
    background-color: #f78989;
    border-color: #f78989;
    color: #fff;
}
</style>
