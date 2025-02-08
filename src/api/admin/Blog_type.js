import axios from 'axios'
import { url } from "@/config.js";

// 类型页面的增删改查都在这里


/**
 * 1.查询所有类型的函数
 * @param 为空,没有需要填写的参数
 */
async function GetType() {
    try {
        const res = await axios.get(`${url}/api/get/SelectAllType`);
        console.log(`数据查询成功,返回${res.data.total}条数据`); //后期可以删了,因为可能拿错误的值,看状态码就行了
        console.log(res.data);
        return res.data;
    } catch (err) {
        return err;
    }
}

/**
 * 2.添加类型的函数
 * @param {*} data 参数是一个对象，需要下面四个数据
 * {类型名称, 所属公司, 产品类型, 类型id}
 */
async function PostType(data) {
    try {
        const res = await axios.post(`${url}/api/post/InsertType`, data);
        console.log(`数据添加成功`); //后期可以删了,因为可能拿错误的值,看状态码就行了
        return res.data;
    } catch (err) {
        return err;
    }
}


/**
 * 3.修改类型的函数
 * @param {*} data 这是要传入的参数,一个对象
 * {type_id, 类型名称, 所属公司, 产品类型, 类型id} 这五个参数
 */
async function PutType(data) {
    try {
        const res = await axios.put(`${url}/api/put/UpdateType`, data);
        console.log(`数据修改成功`); //后期可以删了,因为可能拿错误的值,看状态码就行了
        return res.data;
    } catch (err) {
        return err;
    }
}


/**
 * 4.删除类型的函数
 * @param {*} type_id 当前的代码id，根据这个来删除数据
 */
async function DeleteType(type_id) {
    try {
        const res = await axios.delete(`${url}/api/delete/DeleteType`, { data:{type_id} });
        //怕自己忘记了{type_id}是简写的{type_id:type_id},post,put和Delete都是传数据到body,{}里面的就是body的数据
        console.log('数据删除成功');
        return res.data;
    } catch (err) {
        return err;
    }
}


export {
    GetType,
    PutType,
    PostType,
    DeleteType
}