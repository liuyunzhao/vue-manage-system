/**
 *
 * @param  {Array} userRouter 后台返回的用户权限json
 * @param  {Array} allRouter  前端配置好的所有动态路由的集合
 * @return {Array} realRoutes 过滤后的路由
 */

export function recursionRouter(userRouter = [], allRouter = []) {
    var realRoutes = allRouter
        .filter(item => userRouter.includes(item.name))
        .map(item => ({
            ...item,
            children: item.children
                ? recursionRouter(userRouter, item.children)
                : null
        }))
    return realRoutes
}

/**
 * 设置标题
 */
export function setTitle(title) {
  const newTitle = title ? `${title}` : '刘运召';
  console.log("---title");
  console.log(title);
  console.log(newTitle)
  window.document.title = newTitle
}
