<template>
  <div class="itembox" v-for="item in 文章数据" @click="跳转到文章详情页(item)" v-if="文章数据.length">
    <div class="itembox_left">
      <div class="item1">{{ item.title }}</div>
      <div class="item2">{{ item.introduce }}</div>
      <div class="item3">
        <div class="item3_left">
          <!-- 这是文章作者,下面也是一条竖线-->
          <div>{{ item.account }}</div>
          <div style="width:1px;height:12px;background-color: #e4e6eb;margin: 0px 10px;"></div>
          <!-- 这是写作时间,下面一个是竖线 -->
          <div>{{ item.create_time.split('T')[0] }}</div>
          <div style="width:1px;height:12px;background-color: #e4e6eb;margin: 0px 10px;"></div>
          <!-- 观看人数 -->
          <div class="icon_box">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#guankan"></use>
            </svg>
            <span style="margin-left: 4px;">{{ item.visits }}</span>
          </div>
          <!-- 点赞 -->
          <div class="icon_box" @click="点赞(item)">
            <svg class="icon" aria-hidden="true" :class="item.is_like ? 'ture' : 'flase'">
              <use xlink:href="#dianzan_kuai"></use>
            </svg>
            <span style="margin-left: 4px;">{{ item.likes }}</span>
          </div>
          <!-- 评论 -->
          <div class="icon_box" @click="跳转到文章详情页(item)">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon_huifu-mian"></use>
            </svg>
            <span style="margin-left: 4px;">{{ item.comment }}</span>
          </div>
          <!-- 这是文章操作按钮,如果这个用户和当前用户id一致就显示操作按钮 -->
          <div v-if="store.权限.用户id === props.user_id" class="item3_edit">
            <el-dropdown>
              <span>...</span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="编辑文章(item)">编辑</el-dropdown-item>
                  <el-dropdown-item style="color: #f64242;" @click="删除文章(item)">删除</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
        <div class="item3_right">{{ item.name }}</div>
      </div>
    </div>
    <img class="itembox_img" :src="`${url}/${item.blog_img}`">
  </div>
  <div v-else>该用户没有这方面的数据</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { GetCenterLike_blog, PostBlogLikes, DeleteBlog } from "@/api/user/Center";
import { url } from "@/config";
import { useCounterStore } from "@/stores/counter";
import { useRouter } from 'vue-router';

//用来判断这个是否是自己的文章页面
const store = useCounterStore()
const router = useRouter()

//1.从父组件中获取用户id
const props = defineProps({
  user_id: Number
})
//2.获取文章数据
const 文章数据 = ref([])


//3.功能区
//3.1 点赞功能
const 点赞 = async (item) => {
  //这个item只有文章id和is_like信息,所以user_id要从父组件取
  if (item.is_like) {
    const res = await PostBlogLikes(props.user_id, item.blog_id)
    item.is_like = res.data
    item.likes = item.likes - 1
  } else {
    const res = await PostBlogLikes(props.user_id, item.blog_id)
    item.is_like = res.data
    item.likes = item.likes + 1
  }


}
//3.2 修改文章功能,暂时不开放,就是router跳转过去
const 编辑文章 = (item)=>{router.push(`/home/reviseblog/${item.blog_id}`)}
//3.3 删除文章
const 删除文章 = (item) => {
  ElMessageBox.confirm('是否删除这篇文章', 'Warning', { confirmButtonText: '确认', cancelButtonText: '取消', type: 'warning', })
    .then(async () => {
      const res = await DeleteBlog(props.user_id, item.blog_id)
      if (res.code === 200) {
        ElMessage({ message: '删除文章成功', type: 'success', })
        change()
      } else {
        ElMessage.error('删除文章失败,请再试一次')
      }
    }).catch(() => {
      ElMessage({ message: '取消操作', type: 'info' })
    })

}
//3.4 跳转到文章详情页,点击评论也是一样的

const 跳转到文章详情页 = (item) => {
  router.push(`/home/blogdetail/${item.blog_id}`)
}
//3.3 删除文章

//初始化数据,获取文章数据的基础数据
const change = async () => {
  const res = await GetCenterLike_blog(props.user_id)
  文章数据.value = res.data
}
onMounted(() => { change() })
</script>

<style lang="scss" scoped>
.itembox {
  cursor: pointer;
  padding: 12px 0;
  border-bottom: 1px solid rgba(228, 230, 235, 0.5);
  display: flex;

  .itembox_left {
    flex: 1 1 auto;

    .item1 {
      margin-bottom: 2px;
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      color: #252933;
      width: 100%;
      //下面这一片是超过隐藏成省略号
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }

    .item2 {
      margin-bottom: 4px;
      font-weight: 400;
      color: #8a919f;
      font-size: 13px;
      line-height: 22px;
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }

    .item3 {
      display: flex;
      justify-content: space-between;

      .item3_left {
        display: flex;
        align-items: center;
        font-size: 13px;
        line-height: 20px;
        color: #8a919f;

        .icon_box {
          display: flex;
          align-items: center;
          margin-right: 24px;

          &:hover {
            color: #1171ee;
          }
        }

        .item3_edit {
          cursor: pointer;

          &:hover {
            color: #1171ee;
          }
        }
      }

      .item3_right {
        box-sizing: border-box;
        margin-left: 6px;
        padding: 0 6px;
        background-color: #f2f3f5;
        color: #8a919f;
        font-size: 12px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        min-height: 18px;
        line-height: 18px;
      }
    }
  }

  .itembox_img {
    flex: 0 0 auto;
    width: 108px;
    height: 72px;
    margin-left: 24px;
    border-radius: 4px;
    border: 1px solid rgba(228, 230, 235, 0.5);
  }
}

.icon {
  width: 16px;
  height: 16px;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  transition: all .15s linear;
}

.ture {
  color: #1171ee;
}

.flase {
  color: #8a919f;

  &:hover {
    color: #1171ee;
  }
}
</style>
