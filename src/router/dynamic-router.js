/**
 * Created by liuyz on 2020/04/10 11:46
 */
const OrderList = () => import(/* webpackChunkName: "order" */  "../views/order/order-list.vue");
const OrderDetail = () => import(/* webpackChunkName: "order" */  "../views/order/order-detail.vue");
const GoodsList = () => import(/* webpackChunkName: "goods" */  "../views/goods/goods-list.vue");
const GoodsClassify = () => import(/* webpackChunkName: "goods" */  "../views/goods/goods-classify.vue");
const GoodsClassifyDetail = () => import(/* webpackChunkName: "goods" */  "../views/goods/classify-detail.vue");
const Layout = () => import(/* webpackChunkName: "home" */  "../views/layout/index");
const Home = () => import(/* webpackChunkName: "home" */  "../views/home/home");

/**
 * 全部的动态路由
 */
export const dynamicRoutes = [

  {
    path: "/home",
    component: Layout,
    name: "home-manage",
    redirect: "/home/index",
    meta: {
      name: "首页",
      icon: "icon-yingyongguanli"
    },
    children: [
      {
        path: "index",
        component: Home,
        name: "home",
        meta: {
          name: "首页",
          isHideChildren: true
        }
      }
    ]
  }, {
    path: "/order",
    component: Layout,
    name: "order",
    redirect: "/order/list",
    meta: {
      name: "订单管理",
      icon: "icon-tiaoshi"
    },
    children: [
      {
        path: "list",
        component: OrderList,
        name: "order-list",
        meta: {
          name: "订单列表"
        }
      }, {
        path: "detail",
        component: OrderDetail,
        name: "order-detail",
        meta: {
          name: "订单详情"
        }
      }
    ]
  }, {
    path: "/goods",
    component: Layout,
    redirect: "/goods/list",
    name: "goods",
    meta: {
      name: "产品管理",
      icon: "icon-ying_yong_lie_biao"
    },
    children: [
      {
        path: "list",
        component: GoodsList,
        name: "goods-list",
        meta: {
          name: "产品列表"
        }
      }, {
        path: "classify",
        name: "goods-classify",
        component: GoodsClassify,
        meta: {
          name: "产品分类"
        },
        children:[
          {
            path: "detail",
            component: GoodsClassifyDetail,
            name: "goods-classify-detail",
            meta: {
              name: "分类详情"
            }
          }
        ]
      }
    ]
  },
  {
    path: "*",
    redirect: "/404",
    name: "error"
  }
];

export default dynamicRoutes;