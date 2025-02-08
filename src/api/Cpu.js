import axios from 'axios'


// 页面的增删改查都在这里


/**
 * 1.查询所有处理器的函数
 * @param 为空,没有需要填写的参数
 */
async function GetCpu() {
    try {
        const res = await axios.get('http://localhost:3000/api/get/SelectAllCpu');
        console.log(`数据查询成功,返回${res.data.total}条数据`); //后期可以删了,因为可能拿错误的值,看状态码就行了
        //console.log(res.data);     //调试的时候打开,其他时候关了就行
        return res.data;
    } catch (err) {
        return err;
    }
}

/**
 * 2.添加处理器的函数
 * @param {*} data 参数是一个对象，需要下面四个数据
 * {处理器名称,内核数,性能核数,能效核数,总线程数,性能核基本频率,能效核基本频率,
    处理器基本频率,性能核最大睿频频率,能效核最大睿频频率,处理器最大睿频频率,缓存,光刻,TDP,
    处理器基本功耗,处理器最大功耗,发行日期,系列id,内存类型,最大内存容量,最大内存通道数,
    核显名称,显卡基本频率,显卡最大加速频率,显卡最大内存,支持的显示器数量,支持ECC内存,
    支持的插槽类型,最大CPU配置数}
 */
async function PostCpu(data) {
    try {
        const res = await axios.post('http://localhost:3000/api/post/InsertCpu', data);
        //console.log(`数据添加成功`); //后期可以删了,因为可能拿错误的值,看状态码就行了
        return res.data;
    } catch (err) {
        return err;
    }
}


/**
 * 3.修改处理器的函数
 * @param {*} data 这是要传入的参数,一个对象
 * {cpu_id,处理器名称,内核数,性能核数,能效核数,总线程数,性能核基本频率,能效核基本频率,
        处理器基本频率,性能核最大睿频频率,能效核最大睿频频率,处理器最大睿频频率,缓存,光刻,TDP,
        处理器基本功耗,处理器最大功耗,发行日期,系列id,内存类型,最大内存容量,最大内存通道数,
        核显名称,显卡基本频率,显卡最大加速频率,显卡最大内存,支持的显示器数量,支持ECC内存,
        支持的插槽类型,最大CPU配置数} 这一大堆参数
 */
async function PutCpu(data) {
    try {
        console.log(data);
        const res = await axios.put('http://localhost:3000/api/put/UpdateCpu', data);
        console.log(`数据修改成功`); //后期可以删了,因为可能拿错误的值,看状态码就行了
        return res.data;
    } catch (err) {
        return err;
    }
}


/**
 * 4.删除cpu的函数
 * @param {*} cpu_id 当前的代码id，根据这个来删除数据
 */
async function DeleteCpu(cpu_id) {
    try {
        const res = await axios.delete('http://localhost:3000/api/delete/DeleteCpu', { data:{cpu_id} });
        //怕自己忘记了{cpu_id}是简写的{cpu_id:cpu_id},post,put和Delete都是传数据到body,{}里面的就是body的数据
        console.log('数据删除成功');
        return res.data;
    } catch (err) {
        return err;
    }
}

/**
 * 5.根据处理器id获取详细数据
 * @param {*} 处理器id 这是cpu_id的值,只不过名字要改成这个参数传给后端
 */
async function GetCpuDetail(cpu_id) {
    try {
        const res = await axios.get('http://localhost:3000/api/select/CpuDetail',{params:{cpu_id}});
        //console.log(`数据查询成功,返回${res.data.total}条数据`); //后期可以删了,因为可能拿错误的值,看状态码就行了
        console.log('后端返回的数据',res.data);     //调试的时候打开,其他时候关了就行
        return res.data;
    } catch (err) {
        return err;
    }
}
export {
    GetCpu,      //获取处理器数据
    PutCpu,      //修改处理器数据
    PostCpu,     //添加处理器数据
    DeleteCpu,   //删除处理器数据
    GetCpuDetail  //根据id查询对应的处理器数据
}