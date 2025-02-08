import axios from 'axios'


// 页面的增删改查都在这里


/**
 * 1.查询所有系列的函数
 * @param 为空,没有需要填写的参数
 */
async function GetSeries() {
    try {
        const res = await axios.get('http://localhost:3000/api/get/SelectAllSeries');
        console.log(`数据查询成功,返回${res.data.total}条数据`); //后期可以删了,因为可能拿错误的值,看状态码就行了
        //console.log(res.data);     //调试的时候打开,其他时候关了就行
        return res.data;
    } catch (err) {
        return err;
    }
}

/**
 * 2.添加系列的函数
 * @param {*} data 参数是一个对象，需要下面四个数据
 * {系列名称, 所属公司, 产品类型, 类型id}
 */
async function PostSeries(data) {
    try {
        const res = await axios.post('http://localhost:3000/api/post/InsertSeries', data);
        console.log(`数据添加成功`); //后期可以删了,因为可能拿错误的值,看状态码就行了
        return res.data;
    } catch (err) {
        return err;
    }
}


/**
 * 3.修改系列的函数
 * @param {*} data 这是要传入的参数,一个对象
 * {Series_id, 系列名称, 所属公司, 产品类型, 类型id} 这五个参数
 */
async function PutSeries(data) {
    try {
        const res = await axios.put('http://localhost:3000/api/put/UpdateSeries', data);
        console.log(`数据修改成功`); //后期可以删了,因为可能拿错误的值,看状态码就行了
        return res.data;
    } catch (err) {
        return err;
    }
}


/**
 * 4.删除系列的函数
 * @param {*} Series_id 当前的代码id，根据这个来删除数据
 */
async function DeleteSeries(Series_id) {
    try {
        const res = await axios.delete('http://localhost:3000/api/delete/DeleteSeries', { data:{Series_id} });
        //怕自己忘记了{Series_id}是简写的{Series_id:Series_id},post,put和Delete都是传数据到body,{}里面的就是body的数据
        console.log('数据删除成功');
        return res.data;
    } catch (err) {
        return err;
    }
}

/**
 * 5.获取对应系列id的CPU数据
 * @param {*} 系列id 这是series_id的值,只不过名字要改成这个参数传给后端
 */
async function GetSeriesCpu(series_id) {
    try {
        const res = await axios.get('http://localhost:3000/api/get/SelectSeriesCpu',{params:{系列id:series_id}});
        //console.log(`数据查询成功,返回${res.data.total}条数据`); //后期可以删了,因为可能拿错误的值,看状态码就行了
        //console.log(res.data);     //调试的时候打开,其他时候关了就行
        return res.data;
    } catch (err) {
        return err;
    }
}
export {
    GetSeries,      //获取系列数据
    PutSeries,      //修改系列数据
    PostSeries,     //添加系列数据
    DeleteSeries,   //删除系列数据
    GetSeriesCpu    //获取系列对应Cpu数据
}