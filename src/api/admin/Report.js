import { url } from "@/config";
import axios from 'axios'

/** 1.请求全部被举报的文章数据
 *  没有参数
 */
async function Report1() {
    try {
        const res = await axios.get(`${url}/admin/Report/1`);
        return res.data;
    } catch (err) {
        return err;
    }
}
/** 2.清空举报的信息,就是清空这一个文章的举报,没有举报就不会上这个表
 *  @param {*} blog_id 文章id
 */
async function Report2(blog_id) {
    try {
        const res = await axios.post(`${url}/admin/Report/2`,{blog_id});
        return res.data;
    } catch (err) {
        return err;
    }
}
/** 2.清空举报的信息,就是清空这一个文章的举报,没有举报就不会上这个表
 *  @param {*} blog_id 文章id
 */
async function Report3(blog_id) {
    try {
        const res = await axios.post(`${url}/admin/Report/3`,{blog_id});
        return res.data;
    } catch (err) {
        return err;
    }
}


export{
    Report1,
    Report2,
    Report3,
}