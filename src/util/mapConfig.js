/**
 * 地图配置工具
 * 提供地理坐标映射和数据转换功能
 */

/**
 * 武汉市区地理坐标映射表
 * 格式: { 区域名: [经度, 纬度] }
 */
export const geoCoordMap = {
  '东湖高新区': [12725273.29, 3558757.28],
  '东湖风景区': [12725273.29, 3558757.28],
  '黄陂区': [114.4, 30.9],
  '蔡甸区': [114.0, 30.4],
  '江汉区': [114.27, 30.6],
  '江岸区': [114.3, 30.6],
  '硚口区': [114.27, 30.57],
  '汉阳区': [114.27, 30.55],
  '青山区': [114.38, 30.63],
  '洪山区': [114.503985625, 30.5523195625],
  '东西湖区': [114.0, 30.66056175],
  '江夏区': [114.32, 30.24],
  '新洲区': [114.7, 30.7365407539063],
  '汉南区': [114.0, 30.26],
  '武昌区': [114.313985625, 30.5523195625]
};

/**
 * 转换数据格式,添加地理坐标
 * @param {Array} data - 原始数据数组 [{ name: '区域名', value: 数量 }]
 * @returns {Array} 转换后的数据 [{ name: '区域名', value: [经度, 纬度, 数量] }]
 * 
 * @example
 * // 输入
 * [{ name: '江汉区', value: 100 }]
 * 
 * // 输出
 * [{ name: '江汉区', value: [114.27, 30.6, 100] }]
 */
export const convertData = (data) => {
  if (!Array.isArray(data)) return [];
  
  return data.reduce((res, item) => {
    const geoCoord = geoCoordMap[item.name];
    if (geoCoord) {
      res.push({
        name: item.name,
        value: geoCoord.concat(item.value)
      });
    }
    return res;
  }, []);
};

/**
 * 根据区域名称获取地理坐标
 * @param {string} name - 区域名称
 * @returns {Array|null} 地理坐标 [经度, 纬度] 或 null
 */
export const getGeoCoord = (name) => {
  return geoCoordMap[name] || null;
};

/**
 * 检查区域是否存在于坐标映射中
 * @param {string} name - 区域名称
 * @returns {boolean} 是否存在
 */
export const hasGeoCoord = (name) => {
  return Object.prototype.hasOwnProperty.call(geoCoordMap, name);
};

/**
 * 获取所有已配置的区域名称
 * @returns {Array} 区域名称数组
 */
export const getAllRegionNames = () => {
  return Object.keys(geoCoordMap);
};
