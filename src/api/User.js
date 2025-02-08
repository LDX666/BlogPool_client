import { url } from "@/config";
import axios from 'axios'

/**
 * 1.查询对应的代号和系列
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
 * 2.查询菜单栏参数
 * 没有参数,直接使用就行,现在有了,不过都是默认的
 */

async function GetAside(类型id) {
    try {
        const res = await axios.get(`${url}/api/select/UserAside`,{params:{类型id}})
        return res.data
    } catch (error) {
        return err
    }
}

/**
 * 3.获取Cpu的详细数据
 */
async function GetCpuDetail(cpu_id) {
    try {
        const res = await axios.get(`${url}/api/select/UserCpuDetail`,{params:{cpu_id}});
        //console.log('后端返回的数据',res.data);   
        return res.data;
    } catch (err) {
        return err;
    }
}
/**
 * 4.应该放在3前面的,这是点击商品页右边的数据
 * 接收的参数是series_id
 */
async function GetUserSeriesCpu(series_id) {
    try {
        const res = await axios.get(`${url}/api/select/UserSeriesCpu`,{params:{series_id}});
        //console.log('后端返回的数据',res.data);   
        return res.data;
    } catch (err) {
        return err;
    }
}

/**
 * 5.这是首页查询数据使用的函数
 */
async function GetHomeQuery(series_id) {
    try {
        const res = await axios.get(`${url}/api/select/UserCpuQuery`);
        console.log('后端返回的数据',res.data.msg);   
        return res.data;
    } catch (err) {
        return err;
    }
}

/**
 * 6.这是用户查询自己信息的函数
 * @param {*} user_id number类型
 */
async function GetUserInformation(user_id) {
    try {
        const res = await axios.get(`${url}/api/select/UserInformation`,{params:{user_id}});
        //console.log('后端返回的数据',res.data.msg);   
        return res.data;
    } catch (err) {
        return err;
    }
}
/**
 * 7.这是用户修改自己信息的函数
 * @param {*} data 一个对象,6个属性
 * 包括{user_id,useraccount,username,password,create_time,userurl,}
 * {username,create_time}这两个属性不重要,写不写都一样
 */
async function PutUserInformation(data) {
    try {
        const res = await axios.put(`${url}/api/select/UserInformation`,data);
        //console.log('后端返回的数据',res.data.msg);   
        return res.data;
    } catch (err) {
        return err;
    }
}
export{
    GetHome,
    GetAside,
    GetCpuDetail,
    GetUserSeriesCpu,
    GetHomeQuery,
    GetUserInformation,
    PutUserInformation
}