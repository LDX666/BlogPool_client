import { url } from "@/config";
import axios from 'axios'


/**
 * 1.查询这个用户的所有数据
 * @param {*} user_id 这是用户的id
 */
async function GetCenter(user_id) {
    try {
        const res = await axios.get(`${url}/api/get/Select/Center/user`, { params: { user_id } });
        //console.log('数据查询成功,这是返回的数据',res.data);
        return res.data;
    } catch (err) {
        return err;
    }
}
/**
 * 2.查询这个用户所有写的文章
 * @param {*} user_id 这是用户的id
 */
async function GetCenterBlog(user_id) {
    try {
        const res = await axios.get(`${url}/api/get/Select/Center/blog`, { params: { user_id } });
        //console.log('数据查询成功,这是返回的数据',res.data);
        return res.data;
    } catch (err) {
        return err;
    }
}
/**
 * 3.查询这个用户所有点赞过的文章数据
 * @param {*} user_id 这是用户的id
 */
async function GetCenterLike_blog(user_id) {
    try {
        const res = await axios.get(`${url}/api/get/Select/Center/like_blog`, { params: { user_id } });
        //console.log('数据查询成功,这是返回的数据',res.data);
        return res.data;
    } catch (err) {
        return err;
    }
}
/**
 * 4.查询这个用户所有收藏的数据
 * @param {*} user_id 这是用户的id
 */
async function GetCenterCollect(user_id) {
    try {
        const res = await axios.get(`${url}/api/get/Select/Center/collect`, { params: { user_id } });
        //console.log('数据查询成功,这是返回的数据',res.data);
        return res.data;
    } catch (err) {
        return err;
    }
}
/**
 * 5.查询所有这个用户的粉丝数据
 * @param {*} user_id 这是用户的id
 */
async function GetCenterFollow(user_id) {
    try {
        const res = await axios.get(`${url}/api/get/Select/Center/follow`, { params: { user_id } });
        //console.log('数据查询成功,这是返回的数据',res.data);
        return res.data;
    } catch (err) {
        return err;
    }
}
/**
 * 6.查询所有这个用户的粉丝数据
 * @param {*} user_id 这是用户的id
 */
async function GetCenterBefollow(user_id) {
    try {
        const res = await axios.get(`${url}/api/get/Select/Center/befollow`, { params: { user_id } });
        //console.log('数据查询成功,这是返回的数据',res.data);
        return res.data;
    } catch (err) {
        return err;
    }
}
/**
 * 7.点赞文章的功能
 * @param {*} user_id 用户id 
 * @param {*} blog_id 文章id 
 * 只需要一个函数,点赞之后再点击就会取消点赞
 */
async function PostBlogLikes(user_id,blog_id) {
    try {
        const res = await axios.post(`${url}/api/post/Insert/UserLikes`,{user_id,blog_id});
        //console.log('数据查询成功,这是返回的数据',res.data);
        return res.data;
    } catch (err) {
        return err;
    }
}
/**
 * 8.删除文章的功能
 * @param {*} user_id 用户id
 * @param {*} blog_id 文章id
 * 用户id最好是用缓存的id来删除
 */
async function DeleteBlog(user_id,blog_id) {
    try {
        const res = await axios.delete(`${url}/api/delete/DeleteUserBlog`, { data:{user_id,blog_id} });
        //怕自己忘记了{Series_id}是简写的{Series_id:Series_id},post,put和Delete都是传数据到body,{}里面的就是body的数据
        console.log('数据删除成功');
        
        return res.data;
    } catch (err) {
        return err;
    }
}
/**
 * 9.用户点击关注的功能
 * @param {*} user_id 用户id,使用pinia,这是你的id
 * @param {*} Follow_user_id 关注者id,你要关注的人的id
 */
async function PostFollow(user_id,follow_user_id) {
    try {
        const res = await axios.post(`${url}/api/post/Insert/UserFollow`,{user_id,follow_user_id});
        //console.log('数据查询成功,这是返回的数据',res.data);
        return res.data;
    } catch (err) {
        return err;
    }
}
/**
 * 10.获取用户个人信息
 * @param {*} user_id 用户id,使用pinia数据
 * 注意,需要获取密码,使用Post信息
 */
async function GetUser(user_id) {
    try {
        const res = await axios.post(`${url}/api/UserDetail`,{user_id});
        //console.log('数据查询成功,这是返回的数据',res.data);
        return res.data;
    } catch (err) {
        return err;
    }
}

/**
 * 11.修改用户个人信息
 * @param {*} data 一个对象,三个属性
 * {user_id,username,password} 
 */
async function PutUser(data) {
    try {
        const res = await axios.put(`${url}/api/put/Center/PutUser`, data);
        console.log(`数据修改成功`); //后期可以删了,因为可能拿错误的值,看状态码就行了
        return res.data;
    } catch (err) {
        return err;
    }
}
/**
 * 7.收藏文章的功能
 * @param {*} user_id 用户id 
 * @param {*} blog_id 文章id 
 * 只需要一个函数,点赞之后再点击就会取消点赞
 */
async function Text4(user_id,blog_id) {
    try {
        const res = await axios.post(`${url}/api/text/3`,{user_id,blog_id});
        //console.log('数据查询成功,这是返回的数据',res.data);
        return res.data;
    } catch (err) {
        return err;
    }
}
/**
 * 8.举报文章的功能
 * @param {*} user_id 用户id 
 * @param {*} blog_id 文章id 
 * @param {*} content 举报的内容
 * 只需要一个函数,点赞之后再点击就会取消点赞
 */
async function text5(user_id,blog_id,content) {
    try {
        const res = await axios.post(`${url}/api/text/4`,{user_id,blog_id,content});
        //console.log('数据查询成功,这是返回的数据',res.data);
        return res.data;
    } catch (err) {
        return err;
    }
}
export {
    GetCenter,
    GetCenterBlog,
    GetCenterLike_blog,
    GetCenterCollect,
    GetCenterFollow,
    GetCenterBefollow,
    PostBlogLikes,
    DeleteBlog,
    PostFollow,
    GetUser,
    PutUser,
    Text4,
    text5
}