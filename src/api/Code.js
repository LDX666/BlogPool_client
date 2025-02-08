import axios from 'axios'


// 代号页面的增删改查都在这里


/**
 * 1.查询所有代号的函数
 * @param 为空,没有需要填写的参数
 */
async function GetCode() {
    try {
        const res = await axios.get('http://localhost:3000/api/get/SelectAllCode');
        console.log(`数据查询成功,返回${res.data.total}条数据`); //后期可以删了,因为可能拿错误的值,看状态码就行了
        //console.log(res.data);
        return res.data;
    } catch (err) {
        return err;
    }
}

/**
 * 2.添加代号的函数
 * @param {*} data 参数是一个对象，需要下面四个数据
 * {代号名称, 所属公司, 产品类型, 类型id}
 */
async function PostCode(data) {
    try {
        const res = await axios.post('http://localhost:3000/api/post/InsertCode', data);
        console.log(`数据添加成功`); //后期可以删了,因为可能拿错误的值,看状态码就行了
        return res.data;
    } catch (err) {
        return err;
    }
}


/**
 * 3.修改代号的函数
 * @param {*} data 这是要传入的参数,一个对象
 * {code_id, 代号名称, 所属公司, 产品类型, 类型id} 这五个参数
 */
async function PutCode(data) {
    try {
        const res = await axios.put('http://localhost:3000/api/put/UpdateCode', data);
        console.log(`数据修改成功`); //后期可以删了,因为可能拿错误的值,看状态码就行了
        return res.data;
    } catch (err) {
        return err;
    }
}


/**
 * 4.删除代号的函数
 * @param {*} code_id 当前的代码id，根据这个来删除数据
 */
async function DeleteCode(code_id) {
    try {
        const res = await axios.delete('http://localhost:3000/api/delete/DeleteCode', { data:{code_id} });
        //怕自己忘记了{code_id}是简写的{code_id:code_id},post,put和Delete都是传数据到body,{}里面的就是body的数据
        console.log('数据删除成功');
        return res.data;
    } catch (err) {
        return err;
    }
}


export {
    GetCode,
    PutCode,
    PostCode,
    DeleteCode
}