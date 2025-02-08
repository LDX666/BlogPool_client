import { url } from "@/config";
import axios from 'axios'

/**
 * 1.查询所有代号的函数
 * @param 为空,没有需要填写的参数
 */
async function GetHome() {
    try {
        const res = await axios.get(`${url}/api/select/home`);
        //console.log(`数据查询成功,返回${res.data.total}条数据`); //后期可以删了,因为可能拿错误的值,看状态码就行了
        //console.log(res.data);
        return res.data;
    } catch (err) {
        return err;
    }
}

/**
 * 2.查询数据图所需要的数据
 * @param 为空,没有需要填写的参数
 */
async function text1() {
    try {
        const res = await axios.get(`${url}/text/1`);
        return res.data;
    } catch (err) {
        return err;
    }
}
/**
 * 2.查询饼图所需要的数据
 * @param 为空,没有需要填写的参数
 */
async function text2() {
    try {
        const res = await axios.get(`${url}/text/2`);
        return res.data;
    } catch (err) {
        return err;
    }
}
export{
    GetHome,
    text1,
    text2
}