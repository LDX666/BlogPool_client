import axios from 'axios'
import { url } from "@/config.js";

// 文章页面的增删改查都在这里


/**
 * 1.查询所有文章的函数
 * @param 为空,没有需要填写的参数
 */
async function GetBlog() {
    try {
        const res = await axios.get(`${url}/api/get/SelectAllBlog`);
        console.log(`数据查询成功,返回${res.data.total}条数据`); //后期可以删了,因为可能拿错误的值,看状态码就行了
        console.log(res.data);
        return res.data;
    } catch (err) {
        return err;
    }
}

/**
 * 2.添加文章的函数
 * @param {*} data 参数是一个对象，需要下面6个数据
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
 * 3.修改文章的函数
 * @param {*} data 这是要传入的参数,一个对象
 * {user_id, blog_img, title, type_id, introduce, blog_content} 这6个参数
 */
async function PutBlog(data) {
    try {
        const res = await axios.put(`${url}/api/put/UpdateBlog`, data);
        console.log(`数据修改成功`); //后期可以删了,因为可能拿错误的值,看状态码就行了
        return res.data;
    } catch (err) {
        return err;
    }
}


/**
 * 4.删除文章的函数
 * @param {*} blog_id 当前的代码id，根据这个来删除数据
 */
async function DeleteBlog(blog_id) {
    try {
        const res = await axios.delete(`${url}/api/delete/DeleteBlog`, { data: { blog_id } });
        //怕自己忘记了{blog_id}是简写的{blog_id:blog_id},post,put和Delete都是传数据到body,{}里面的就是body的数据
        console.log('数据删除成功');
        return res.data;
    } catch (err) {
        return err;
    }
}

/**
 * 5.查询单个文章的内容
 * @param {*} blog_id 文章id
 */
async function Blog5(blog_id) {
    try {
        const res = await axios.get(`${url}/admin/Blog/5`, { params: { blog_id } });
        //怕自己忘记了{blog_id}是简写的{blog_id:blog_id},post,put和Delete都是传数据到body,{}里面的就是body的数据
        console.log('数据删除成功');
        return res.data;
    } catch (err) {
        return err;
    }
}


export {
    GetBlog,
    PutBlog,
    PostBlog,
    DeleteBlog,
    Blog5
}