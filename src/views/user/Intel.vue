<template>
    <div id="intel">
        <div class="bk">
            <div class="box-top">
                <h1 style="margin: 0; color: #ffffff; text-align: center;">英特尔处理器</h1>
                <el-image style="width: 150px; height: 150px" :src="英特尔" fit="fill" />
            </div>
        </div>
        <div class="box">
            <div class="aside">
            <el-affix :offset="68">
                <el-scrollbar >
                    <Aside/>
                </el-scrollbar>
            </el-affix>
            </div>
            <div class="main">
                <RouterView :key="$route.fullPath"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import Aside from '@/components/user/aside/IntelAside.vue'
import 英特尔 from '@/assets/intel/英特尔.png'
</script>

<style lang="scss" >
 .el-scrollbar {
	.el-scrollbar__wrap {
        height: calc(100vh - 90px);;
		max-height: calc(100vh - 90px); // 最大高度
		overflow-x: hidden; // 隐藏横向滚动栏
	}
}
#intel{
    .bk{
        height: 270px;
        width: 100%;
        background: radial-gradient(ellipse 120% 210% at 95% 0, #531889 10%, #000 70%);
        .box-top{
            margin: 0 auto;
            height: 90%;
            max-width: 1170px;
            padding: 20px 0;
        }

    }
    .box{
        margin: auto;
        max-width: 1170px;
        display: flex;
        .aside{
            width: 310px;
            padding-top: 20px;
            border: 1px solid #e7e8e7;
        }
        .main{
            padding: 20px;
            width: calc(100% - 310px);
        }
    }
}
</style>
