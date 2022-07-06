const {getList,getDetail,newBlog,updateBlog,delBlog} =require('../controller/blog')
const {SuccessModel,ErrorModel} =require('../model/resModel')
//统一的登录验证函数
const loginCheck=(req)=>{
    if(!req.session.username){
        return new Promise.resolve()
    }
}
const handleBlogRouter=(req,res)=>{
    const method=req.method
    const url=req.url
    const path=req.path.split('?')[0]
    const id=req.query.id

    //获取博客列表
    if(method==='GET' && path==='/api/blog/list'){
        const author =req.query.author || ''
        const keyword =req.query.keyword || ''
        // const listData =getList(author,keyword)
        // return new SuccessModel(listData)
        const result =getList(author,keyword)
        return result.then(listData=>{
            return new SuccessModel(listData)
        })
    }
    //获取博客详情
    if(method==='GET' && path==='/api/blog/detail'){
        // const data=getDetail(id)
        // return new SuccessModel(data)
        const result=getDetail(id)
        return result.then(data=>{
            return new SuccessModel(data)
        })
    }
    //新建博客
    if(method==='POST' && path==='/api/blog/new'){
        // const data=newBlog(req.body)
        // return new SuccessModel(data)
        const loginCheckResult=loginCheck(req)
        if(loginCheckResult){
            return loginCheck
        }
        //假数据
         req.body.author=req.session.username
        const result=newBlog(req.body)
        return result.then(data=>{
            return new SuccessModel(data)
        })

    }
    //更新博客
    if(method==='POST' && path==='/api/blog/update'){
        const loginCheckResult=loginCheck(req)
        if(loginCheckResult){
            return loginCheck
        }
        const result=updateBlog(id,req.data)
        return result.then(value=>{
            if(value){
                return SuccessModel ()
            }
            return new ErrorModel('更新博客失败')
        })
        // if(result){
        //     return SuccessModel ()
        // }else{
        //     return new ErrorModel('更新博客失败')
        // }
    }
    // 删除一篇博客
    if(method==='POST' && req.path==='/api/blog/del'){
        const loginCheckResult=loginCheck(req)
        if(loginCheckResult){
            return loginCheck
        }
        req.body.author=req.session.username
        const result=delBlog(id,author)
        return result.then(value=>{
            if(value){
                return new SuccessModel
            }
            return new ErrorModel('删除博客失败')
        })
        // if(result){
        //     return SuccessModel ()
        // }else{
        //     return new ErrorModel('删除博客失败')
        // }
    }
}
module.exports=handleBlogRouter