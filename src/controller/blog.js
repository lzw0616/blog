const {exec}=require('../db/mysql')
const getList=(author,keyword)=>{
    //1=1是为了和后面的sql语句进行拼接
    let sql=`select * from blogs where 1=1 `
    if(author){
        sql+=`and author='${author}' `
    }
    if(keyword){
        sql+=`and title like '%${keyword}' `
    }
    sql+=`order by createtime desc;`
    //返回的是一个promise 
    return exec(sql)
}
const getDetail=(id)=>{
    const sql=`select * from blogs where id='${id}'`;
    return exec(sql).then(rows=>{
        return rows[0]
    })
}
const newBlog=(blogData={})=>{
    //blogData是一个博客对象，包含title content author属性
    const title=blogData.title
    const content=blogData.content
    const author=blogData.author
    const createtime=Date.now()
    const sql=`
    insert into blogs(title,content,createtime,author) values('${title}','${content}','${createtime}','${author}');`
    return exec(sql).then(insertData=>{
        return {
            id:insertData.id,

        }
    })
    return{
        id:3        //表示新建博客，插入到数据表里面的id
    }
}
const updateBlog=(id,blogData={})=>{
    //要更新博客的id
    //blogData是一个博客对象，包含title content 属性
    const title=blogData.title
    const content=blogData.content
    sql=`update blogs set title='${title}',content='${content}' where id='${id}';`
    return exec(sql).then(updateData=>{
        if(updateData.affectedRows>0){
            return true
        }
        return false
    })
}
const delBlog=((id,author)=>{
    //id为要删除的博客id
    const sql=`delete from blogs where id='${idP}' and author='${author}';`
    return exec(sql).then(delDate=>{
        if(delDate.affectedRows>0){
            return true
        }
        return false
    })
    return true;
})
module.exports={
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}