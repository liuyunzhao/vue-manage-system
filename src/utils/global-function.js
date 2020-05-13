/**
 * Created by liuyz on 2020/05/13 16:04
 */
import { export_json_to_excel } from "../vendor/Export2Excel";

/**
 * 导出excel
 * @param tHeader excel内的第一行标题 ['姓名','性别','年龄']
 * @param filterVal jsonData数据的key, 如：["name", "sex", "age"]
 * @param jsonData
 *  [{ "name": "小明", "sex": "男", "age": "23" },
 *  { "name": "小红", "sex": "女", "age": "20" }]
 *  formatJson后：生成如：[["小明", "男", "23"], ["小红", "女", "20"]]
 * @param excelName excel文件名
 */
export const exportExcel = (tHeader, filterVal, jsonData, excelName = "excel-list") => {
  require.ensure([], () => {
    const data = formatJson(filterVal, jsonData);
    export_json_to_excel(tHeader, data, excelName);
  });
};

export const formatJson = (filterVal, jsonData) => {
  return jsonData.map(v => filterVal.map(j => v[j]));
};