/**
 * Created by liuyz on 2019/09/23 14:39
 * 注意：模块下key和value必须同名，所有变量修改时，必须修改对应的属性和方法调用
 */
//模块名称
export const MODULE_LOGIN = "login";
export const MODULE_HOME = "home";
export const MODULE_WORK = "work";
export const MODULE_MINE = "mine";
export const MODULE_PERMISSION = "permission";

//用于只能写字符串
export const PERMISSION_GET_USER_PERMISSION= "permission/getUserPermission";
export const PERMISSION_SET_SIDEBAR_MENU_LIST= "permission/SET_SIDEBAR_MENU_LIST";


//state中的
export const sidebarMenuList = "sidebarMenuList";
export const permissionList = "permissionList";
export const isSidebarNavCollapse = "isSidebarNavCollapse";
export const tabsList = "tabsList";
export const currentTabPath  = "currentTabPath"; //当前选中的Tab
export const tabDeleteMonitor = "tabDeleteMonitor"; //tab删除监听
export const addressData = "addressData"; //地址


//action中使用
export const loginIn = "loginIn"; //登录
export const loginOut = "loginOut"; //退出
export const getUserPermission = "getUserPermission"; //获取用户权限路由
export const addTab = 'addTab'; //添加tab
export const removeTab = 'removeTab'; //删除tab


//mutation 使用   key和value大小写必须一致，否则this中拿到的就是value
export const LOGIN_IN = "LOGIN_IN";
export const LOGIN_OUT = "LOGIN_OUT";
export const SET_SIDEBAR_NAV_STATE = "SET_SIDEBAR_NAV_STATE"; //隐藏和展开状态
export const ADD_TAB = "ADD_TAB"; //添加tab
export const UPDATE_CURRENT_TAB = "UPDATE_CURRENT_TAB"; //更新当前tab
export const REMOVE_TAB = "REMOVE_TAB"; //删除tab
export const SET_CURRENT_TAB = "SET_CURRENT_TAB"; //设置当前tab
export const TAB_DELETE_MONITOR = 'TAB_DELETE_MONITOR';//tab关闭监听
export const SET_SIDEBAR_MENU_LIST = "SET_SIDEBAR_MENU_LIST"; //设置左侧菜单权限
export const SET_PERMISSION_LIST = "SET_PERMISSION_LIST"; //设置请求获取的权限列表
export const SET_ADDRESS = "SET_ADDRESS"; //设置地址


















// const types = {
//模块名称
// MODULE_HOME: "home",
// MODULE_WORK: "work",
// MODULE_MINE: "mine",

/*home模块下的*/

/*home模块下的*/


/*work模块下的*/

//业务处理
//mutation  设置数据
// PROCESS_PEOPLE: 'PROCESS_PEOPLE', //身份证号和姓名信息
// PROCESS_PAYMENT_LIST_INFO: 'PROCESS_PAYMENT_LIST_INFO', //医疗缴费列表
// PROCESS_PAYMENT_SUCCESS_INFO: 'PROCESS_PAYMENT_SUCCESS_INFO', //医疗缴费成功信息
//
// ENQUIRY_WRITE_OFF_LIST:'ENQUIRY_WRITE_OFF_LIST', //业务查询核销列表

//state  获取数据
// processPaymentListInfo: 'processPaymentListInfo',  //医疗缴费列表
// processPaymentSuccessInfo: 'processPaymentSuccessInfo', //医疗缴费成功信息
//
// enquiryWriteOffList:'enquiryWriteOffList', //业务查询核销列表
/*work模块下的*/


/*mine模块下的*/

/*mine模块下的*/

// };
// export default types;