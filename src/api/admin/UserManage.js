import { url } from "@/config";
import axios from 'axios'

/** 1.请求全部用户数据
 *  没有参数
 */
async function UserManage1() {
    try {
        const res = await axios.get(`${url}/admin/UserManage/1`);
        return res.data;
    } catch (err) {
        return err;
    }
}
/** 2.添加用户
 * @param {*} data 对象类型
 *  { account, username, password,user_introduce, userurl }
 */
async function UserManage2(data) {
    try {
        const res = await axios.post(`${url}/admin/UserManage/2`,data);
        return res.data;
    } catch (err) {
        return err;
    }
}
/** 3.修改用户
 * @param {*} data 对象类型,6个属性,多一个id
 *  { user_id,account, username, password,user_introduce, userurl }
 */
async function UserManage3(data) {
    try {
        const res = await axios.post(`${url}/admin/UserManage/3`,data);
        return res.data;
    } catch (err) {
        return err;
    }
}
/** 4.删除用户
 * @param {*} user_id 用户id
 */
async function UserManage4(user_id) {
    try {
        const res = await axios.post(`${url}/admin/UserManage/4`,{user_id});
        return res.data;
    } catch (err) {
        return err;
    }
}
export {
    UserManage1,
    UserManage2,
    UserManage3,
    UserManage4
}