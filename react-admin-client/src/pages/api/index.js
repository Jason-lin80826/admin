import ajax from './ajax'
const BASE = 'http://120.55.193.14:5000'
// 登陸
export const reLogin = (username,password)=>ajax(BASE+'/login',{username,password},'POST');
// 添加使用者
export const reAddUser = (user) => ajax(BASE+'/manger/user/add',user,'POST')
// 獲取分類列表
export const reqCategorys = (parentId)=>ajax(BASE+'/manage/category/list',{parentId})
//添加分類
export const reqAddCategory = (categoryName,parentId)=>ajax(BASE+'/manage/category/add',{categoryName,parentId},'POST')
// 更新分類 
export const reqUpdateCategory = (categoryId,categoryName)=>ajax(BASE+'/manage/category/update',{categoryId,categoryName},'POST')
//獲得商品列表
export const reqProduct = (pageNum,pageSize)=>ajax(BASE+'/manage/product/list',{pageNum,pageSize})
//搜尋商品列表
export const searchProducts = ({pageNum,pageSize,searchName,searchType})=>ajax(BASE+'/manage/product/search',
{pageNum,
pageSize,
[searchType]:searchName
})
//獲取物品的分類
export const reqCategory = (categoryId)=>ajax(BASE+'/manage/category/info',{categoryId})
// 更新商品狀態(上架/下架)
export const reqUpdateStatus = (productId,status)=>ajax(BASE+'/manage/product/updateStatus',{productId,status},'POST')
// 刪除圖片數據
export const reqDelImgs = (name)=>ajax(BASE+'/manage/img/delete',{name},'POST')
// 新增或修改product 
export const reqAddOrUpdate = (product)=>ajax(BASE+'/manage/product/'+ (product._id?'update':'add'),product,'POST')
// 獲取所有角色列表
export const reqRoles = () => ajax(BASE+'/manage/role/list')
// 添加角色
export const reqAddRoles = (roleName) => ajax(BASE+'/manage/role/add',{roleName},'POST')
// 更新角色權限
export const reqUpdateRoles = (role) => ajax(BASE+'/manage/role/update',role,'POST')
// 獲得所以用戶列表
export const reqUsers= () => ajax(BASE+'/manage/user/list')
// 刪除用戶
export const reqDeleteUser= (userId) => ajax(BASE+'/manage/user/delete', {userId},'POST')
// 增加或更新用戶
export const reqAddorUpdateUser= (user) => ajax(BASE+'/manage/user/'+(user._id?'update':'add'), user,'POST')