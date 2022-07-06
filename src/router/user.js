const {loginCheck} =require('../controller/user')
const {SuccessModel,ErrorModel} =require('../model/resModel')
const {set} =require('../db/redis')
const handleUserRouter=(req,res)=>{
    const method=req.method
    const url=req.url
    const path=req.path
    //登录
    if(method==='POST' && path==='/api/blog/login'){
       const {username,password}=req.body
        // const {username,password}=req.query
       const result=loginCheck(username,password)
       return result.then(data=>{
           if(data.username){
               //设置session
               req.session.username=data.username
               req.session.realname=data.realname
               //同步到redis中
               set(req.sessionId,req.session)
            return new SuccessModel
           }
           return new ErrorModel('登录失败')
       })
    }
}
module.exports=handleUserRouter