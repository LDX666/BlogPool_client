import axios from 'axios'



/**
 * 1.用户登录功能
 * @param {*} body 一个对象
 * 包含{username,password}两个属性
 */
async function LoginUser(body) {
    try {
        const res = await axios.post('http://localhost:3000/api/post/LoginUser',body)
        if (res.data.code === 200) {
            return res.data
        }else{
            return res.data
        }
    } catch (error) {
        console.log('请求出错',error);
        return error
    }
}

/**
 * 2.用户注册功能
 * @param {*} body 一个对象
 * 包含{username,password}两个属性
 */
async function RegisterUser(body) {
    try {
        const res = await axios.post('http://localhost:3000/api/post/RegisterUser',body)
        if (res.data.code === 200) {
            return res.data
        }else{
            return res.data
        }
    } catch (error) {
        console.log('请求出错',error);
        return error
    }
}

/**
 * 3.管理员登录功能
 * @param {*} body 一个对象
 * 包含{username,password}两个属性
 */
async function LoginAdmin(body) {
    try {
        const res = await axios.post('http://localhost:3000/api/post/LoginAdmin',body)
        if (res.data.code === 200) {
            return res.data
        }else{
            return res.data
        }
    } catch (error) {
        console.log('请求出错',error);
        return error
    }
}

export {
    LoginUser,
    RegisterUser,
    LoginAdmin
}