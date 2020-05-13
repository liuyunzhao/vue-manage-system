/**
 * Created by liuyz on 2020/04/21 17:29
 */

/**
 * 如果路由是动态添加的但不包括在左侧菜单内，
 * 左侧代表：不需要添加到左侧菜单的路由名字；右侧代表：属于哪个左侧菜单的
 * 如order-detail则属于左侧菜单order-list页内
 */
export const hideRouteObj = {
  "order-detail": "order-list"
};