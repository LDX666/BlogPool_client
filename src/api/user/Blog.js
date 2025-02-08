import axios from 'axios'
import { url } from "@/config.js";

/**
 * 1.查询所有文章页面侧边栏数据的函数
 * @param 为空,没有需要填写的参数
 */
async function GetBlogAside() {
    try {
        const res = await axios.get(`${url}/api/get/Select/UserBlogAside`);

        //console.log('数据查询成功,这是返回的数据',res.data);
        return res.data;
    } catch (err) {
        return err;
    }
}
/**
 * 2.根据文章类型查询所有相关的文章
 * @param {*} type_id 这是类型id,必要的参数
 */
async function GetTypeBlog(type_id) {
    try {
        const res = await axios.get(`${url}/api/get/Select/UserAsideBlog`,{params:{type_id}});
        //console.log('数据查询成功,这是返回的数据',res.data);
        return res.data;
    } catch (err) {
        return err;
    }
}

/**
 * 3.获取文章的详细数据
 */
async function GetBlog_idDetail(blog_id) {
    try {
        const res = await axios.get(`${url}/api/get/Select/blog_id_detail`,{params:{blog_id}});
        //console.log('数据查询成功,这是返回的数据',res.data);
        return res.data;
    } catch (err) {
        return err;
    }
}
/**
 * 4.获取自己的文章
 * @param {*} user_id 这是用户id,必须要的 
 */
async function GetUserBlog(user_id) {
    try {
        const res = await axios.get(`${url}/api/get/SelectUserBlog`,{params:{user_id}});
        //console.log('数据查询成功,这是返回的数据',res.data);
        return res.data;
    } catch (err) {
        return err;
    }
}
/**
 * 5.删除用户自己的文章
 * @param {*} user_id 用户id,可以通过pinia传  
 * @param {*} blog_id 文章id,一前一后
 */
async function DeleteUserBlog(user_id,blog_id) {
    try {
        const res = await axios.delete(`${url}/api/delete/DeleteUserBlog`, { data:{user_id,blog_id} });
        //怕自己忘记了{type_id}是简写的{type_id:type_id},post,put和Delete都是传数据到body,{}里面的就是body的数据
        console.log('数据删除成功');
        return res.data;
    } catch (err) {
        return err;
    }
}
/**6.获取玩家个人信息
 * @param {*} user_id 用户id，如果是查自己就是pinia，别人就传他的id
 */
async function GetUserCenter(user_id) {
    try {
        const res = await axios.get(`${url}/api/get/Select/UserCenter`, { params:{user_id} });
        //怕自己忘记了{type_id}是简写的{type_id:type_id},post,put和Delete都是传数据到body,{}里面的就是body的数据
        console.log('拿到个人信息了',res.data);
        return res.data;
    } catch (err) {
        return err;
    }
}
/**
 * 7. 用户写文章
 * @param {*} data 这是文章需要的参数,一个对象
 * {user_id, blog_img, title, type_id, introduce, blog_content}
 */
async function PostBlog(data) {
    try {
        const res = await axios.post(`${url}/api/post/InsertBlog`, data);
        console.log(`数据添加成功`); //后期可以删了,因为可能拿错误的值,看状态码就行了
        return res.data;
    } catch (err) {
        return err;
    }
}

/**
 * 8. 获取需要修改的文章的数据
 * @param {*} blog_id 文章id
 */
async function GetBlog(blog_id) {
    try {
        const res = await axios.get(`${url}/api/get/Center/BlogDetail`, { params: { blog_id } });
        console.log(`数据修改成功`); //后期可以删了,因为可能拿错误的值,看状态码就行了
        return res.data;
    } catch (err) {
        return err;
    }
}
/**
 * 9.用户修改文章
 * @param {*} data 修改的内容
 * {blog_id, blog_img, title, type_id, introduce, blog_content}
 */
async function PutBlog(data) {
    try {
        const res = await axios.put(`${url}/api/put/blog/updateblog`, data);
        console.log(`数据修改成功`); //后期可以删了,因为可能拿错误的值,看状态码就行了
        return res.data;
    } catch (err) {
        return err;
    }
}


/** 10,获取文章的最详细数据
 * @param {*} user_id 用户id
 * @param {*} blog_id 文章id
 */
async function text3(user_id,blog_id) {
    try {
        const res = await axios.get(`${url}/api/get/Select/BlogDetail`,{params:{user_id,blog_id}});
        //console.log('数据查询成功,这是返回的数据',res.data);
        return res.data;
    } catch (err) {
        return err;
    }
}
export{
    GetBlogAside,
    GetTypeBlog,
    GetBlog_idDetail,
    GetUserBlog,
    DeleteUserBlog,
    GetUserCenter,
    PostBlog,
    GetBlog,
    PutBlog,
    text3
}