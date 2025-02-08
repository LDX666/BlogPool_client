import { url } from "@/config";
import axios from 'axios'

/** 1.请求全部审核文章数据
 *  没有参数
 */
async function BlogAudit1() {
    try {
        const res = await axios.get(`${url}/admin/BlogAudit/1`);
        return res.data;
    } catch (err) {
        return err;
    }
}
/** 2.通过文章审核
 * @param {*} blog_id 文章id
 */
async function BlogAudit2(blog_id) {
    try {
        const res = await axios.post(`${url}/admin/BlogAudit/2`,{blog_id});
        return res.data;
    } catch (err) {
        return err;
    }
}
/** 3.拒绝文章审核
 * @param {*} blog_id 文章id
 */
async function BlogAudit3(blog_id) {
    try {
        const res = await axios.post(`${url}/admin/BlogAudit/3`,{blog_id});
        return res.data;
    } catch (err) {
        return err;
    }
}
export{
    BlogAudit1,
    BlogAudit2,
    BlogAudit3
}