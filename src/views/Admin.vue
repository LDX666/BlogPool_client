<template>
  <div id="home">
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-container>

        <el-aside style="width: 200px;">
          <el-affix>
            <Aside />
          </el-affix>
        </el-aside>

        <el-main>
          <Main />
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<script setup>
import Header from "@/components/admin/Header.vue"
import Aside from "@/components/admin/Aside.vue";
import Main from "@/components/admin/Main.vue"
</script>

<style lang="scss" scoped>
#home {
  //min-height: 100vh;
  display: flex;
}

.el-header {
  padding: 0;
}

.el-aside {
  padding: 0;
  min-height: calc(100vh - 80px);
  background-color: #545c64;
}
</style>