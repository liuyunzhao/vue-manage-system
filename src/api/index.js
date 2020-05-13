/**
 * api接口统一出口
 */
// 首页模块接口
import home from '@/api/module/home';
// 工作模块接口
import work from '@/api/module/work';
// 我的模块接口
import my from '@/api/module/my';

// 导出接口
export default {
    home,
    work,
    my,
}