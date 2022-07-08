<!--
 * @Author: tushan
 * @Date: 2022-01-07 20:07:17
 * @LastEditTime: 2022-01-07 21:35:57
 * @Description: 文件介绍
 * @FilePath: /mcecy-admin/src/views/dashboard/friendlink.vue
-->
<template>
    <div class="app-page">
        <div>
            <el-button type="primary" @click="add">添加友链</el-button>
        </div>
        <el-table
            :data="list"
            element-loading-text="Loading"
            border
            fit
            row-key="id"
            highlight-current-row
            mt
        >
            <el-table-column label="logo" width="80" align="center">
                <template slot-scope="scope">
                    <el-image :src="scope.row.logo" class="el-image-link" fit="contain"></el-image>
                </template>
            </el-table-column>
            <el-table-column label="网站名称" align="center">
                <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column label="网站介绍" align="center">
                <template slot-scope="scope">{{ scope.row.tips }}</template>
            </el-table-column>
            <el-table-column label="网站链接" align="center">
                <template slot-scope="scope">
                    <el-link
                        type="primary"
                        :href="scope.row.href"
                        target="_blank"
                    >{{ scope.row.href }}</el-link>
                </template>
            </el-table-column>
            <el-table-column label="添加时间" align="center">
                <template slot-scope="scope">{{ scope.row.addtime }}</template>
            </el-table-column>
            <el-table-column label="状态" align="center">
                <template slot-scope="scope">
                    <el-tag type="success" v-if="scope.row.status == 1">展示</el-tag>
                    <el-tag type="danger" v-if="scope.row.status == 2">隐藏</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="100">
                <template slot-scope="scope">
                    <el-button size="mini" @click="edit(scope.row)">操作</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-drawer
            title="数据修改"
            :visible.sync="drawer"
            size="400px"
            direction="rtl"
            :wrapperClosable="false"
        >
            <FriendlinkEdit :info="editinfo" @close="closeEdit" />
        </el-drawer>
    </div>
</template>

<script>import { friend_link } from "@/api/settings"
import FriendlinkEdit from "./component/friendlinkEdit.vue";

export default {
    data() {
        return {
            list: [],
            drawer: false,
            editinfo: {}
        };
    },
    methods: {
        closeEdit() {
            this.editinfo = {};
            this.drawer = false;
            this.fetchData();
        },
        add() {
            this.drawer = true;
            this.editinfo = {};
        },
        edit(item) {
            this.editinfo = item;
            this.drawer = true;
        },
        async fetchData() {
            const { code, list = [] } = await friend_link();
            this.list = list;
        }
    },
    mounted() {
        this.fetchData();
    },
    components: { FriendlinkEdit }
}
</script>

<style lang="scss">
.el-image-link {
    width: 50px;
    height: 50px;
}
</style>
