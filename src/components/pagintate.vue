<!--
 * @Author: your name
 * @Date: 2021-11-03 10:05:32
 * @LastEditTime: 2021-11-03 22:22:03
 * @LastEditors: Please set LastEditors
 * @Description:分页
 * @FilePath: \mcecy-admin\src\components\pagintate.vue
-->
<template>
    <div class="paginate">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="pageInfo.current_page"
            :page-sizes="pageInfo.sizes"
            :page-size="pageInfo.per_page"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageInfo.total"
        ></el-pagination>
    </div>
</template>

<script>
export default {
    props: ["info"],
    data() {
        return {
            pageInfo: {
                current_page: 1,
                per_page: 50,
                sizes: [10, 50, 100, 200, 500],
                total: 0
            }
        }
    },
    methods: {
        /**修改当前每页多少条 */
        handleSizeChange(val) {
            this.info.per_page = val
            this.$emit("limit", val)
        },
        /**页面切换 */
        handleCurrentChange(val) {
            this.info.current_page = val
            this.$emit("topage", val)
        },
        render() {
            if (!this.info) return false;
            let info = this.info;
            this.pageInfo.current_page = info.current_page;
            this.pageInfo.per_page = info.per_page;
            this.pageInfo.total = info.total;
        }
    },
    mounted() {
        this.render()
    },
    watch: {
        info(e) {
            this.render()
        }
    }
}
</script>
<style lang="scss" scoped>
.paginate {
    padding: 30px 0px;
    display: flex;
    justify-content: center;
}
</style>
