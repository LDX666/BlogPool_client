import axios from "axios"

/**
 * 1.查询全部用户的请求
 * 为什么不把请求地址写完,因为可能会换网址,但是接口地址不会变
 * @param {*} url 请求地址,前缀不用写了
 * @param {*} data 传入ref对象
 */
function GetAllUser(url,data,datacope,total) {
    axios.get(`http://localhost:3000${url}`).then((res)=>{
        console.log(res.data.total);
        data.value = res.data.data
        datacope.value = Object.assign(data.value) //将数据浅拷贝
        total.value = res.data.total
    }).catch((e)=>{
        console.log('请求出错',e);

    })
}




export {
    GetAllUser
}