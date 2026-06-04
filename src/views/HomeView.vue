<template>
  <div class="big-wrap">
    <!-- 延迟监控面板 -->
    <div class="latency-monitor">
      <div class="latency-header">
        <span class="monitor-icon">📊</span>
        <span class="monitor-title">连接延迟监控</span>
      </div>
      <div class="latency-content">
        <div class="latency-time">{{ localTimeDisplay }}</div>
        <div class="latency-value" :class="{ 'high-latency': latency > 200 }">
          {{ latency }}ms
        </div>
      </div>
    </div>
    
    <!-- 连接测试对话框 -->
    <ConnectionDialog
      :visible.sync="showConnectionDialog"
      :socket-url="socketUrl"
      :socket-instance="socket"
      @test-success="onDialogTestSuccess"
      @test-error="onDialogTestError"
      @confirm="onDialogConfirm"
      @close="onDialogClose"
    />
    
    <!-- 连接状态指示器 -->
    <div class="connection-status" :class="{ 'connected': isConnected, 'error': connectionError }">
      <span class="status-dot"></span>
      <span class="status-text">{{ statusText }}</span>
    </div>

    <!-- 加载遮罩 -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-spinner">
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
      </div>
      <p class="loading-text">数据加载中...</p>
    </div>

    <!-- 错误提示 -->
    <div v-if="connectionError" class="error-banner">
      <span class="error-icon">⚠️</span>
      <span>{{ errorMessage }}</span>
      <button class="retry-btn" @click="handleRetry">重试</button>
    </div>
    <div class="header">
      <span>远程诊断-实时监控平台</span>
    </div>
    <div class="cont">
      <div class="dashboard-container">
        <div class="left-panel">
          <div class="panel-header">
            <img src="@/assets/top1.png" alt="" />
          </div>
          <div class="service-statistics">
            <div class="d-top">
              <span class="section-title-indicator"></span>
              <span>服务总量统计</span>
            </div>
            <div class="d-cont">
              <CommonChart 
                ref="signChart" 
                :options="signChartOptions"
              />
            </div>
          </div>
          <div class="radiology-ultrasound">
            <div class="d-top">
              <span class="section-title-indicator"></span>
              <span>放射与超声服务数</span>
            </div>
            <div class="d-cont">
              <CommonChart 
                ref="blasChart" 
                :options="blasChartOptions"
              />
            </div>
          </div>
          <div class="ecg-consultation">
            <div class="d-top">
              <span class="section-title-indicator"></span>
              <span>心电与会诊</span>
            </div>
            <div class="d-cont">
              <CommonChart 
                ref="ecgChart" 
                :options="ecgChartOptions"
              />
            </div>
          </div>
        </div>
        <!-- 中间部分 -->
        <div class="center-panel">
          <div class="panel-header">
            <img src="@/assets/top2.png" alt="" />
          </div>
          <div class="institution-connection">
            <div class="d-top">
              <span class="section-title-indicator"></span>
              <span>机构接入数</span>
            </div>
            <div class="institution-list">
              <div
                class="institution-item"
                v-for="institution in institutions"
                :key="institution.index"
              >
                <img :src="institution.imageUrl" alt="" />
                <div class="institution-info">
                  {{ institution.title
                  }}<span
                    class="institution-count"
                    :style="{ color: institution.countColor }"
                    >{{ institution.count }}</span
                  >
                  家
                </div>
              </div>
            </div>
          </div>
          <div class="business-statistics">
            <div class="d-top">
              <span class="section-title-indicator"></span>
              <span>用户业务量统计</span>
            </div>
            <div class="business-list">
              <div 
                class="business-card" 
                v-for="(businessGroup, groupIndex) in businessGroups" 
                :key="groupIndex"
              >
                <div v-for="item in businessGroup" :key="item.index">
                  {{ item.name }}: <span class="business-value">{{ item.sl }}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 小轮播部分 -->
          <div class="map-carousel">
            <shadow-colud
              ref="shadowColud"
              :shadow-cloud="shadowColud"
            ></shadow-colud>
          </div>
        </div>
        <!-- 右侧 -->
        <div class="right-panel">
          <div class="panel-header">
            <img src="@/assets/top3.png" alt="" />
          </div>
          <div class="diagnosis-result">
            <div class="d-top">
              <span class="section-title-indicator"></span>
              <span>阴阳性诊断</span>
            </div>
            <div class="d-cont">
              <div class="neg-mas">
                <div class="neg-wrap">
                  <CommonChart
                    ref="negChart"
                    :options="negChartOptions"
                  />
                </div>
                <div class="mas-wrap">
                  <CommonChart
                    ref="masChart"
                    :options="masChartOptions"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="diagnosis-proportion">
            <div class="d-top">
              <span class="section-title-indicator"></span>
              <span>阴阳性统计占比</span>
            </div>
            <div class="d-cont">
              <CommonChart
                ref="diagnosisRadioChart"
                :options="diagnosisRadioChartOptions"
              />
            </div>
          </div>
          <div class="patient-source">
            <div class="d-top">
              <span class="section-title-indicator"></span>
              <span>患者来源统计</span>
            </div>
            <div class="d-cont">
              <CommonChart 
                ref="patientChart" 
                :options="patientChartOptions"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-company">
          医疗信息技术发布平台<span class="edition">版本1.0</span>
      </div>
      <div class="technical-support">久别提供技术支持</div>
      <div class="last-update" v-if="lastUpdateTime">
        最后更新: {{ lastUpdateTime }}
        <span v-if="latency > 0" class="latency-indicator">
          | 延迟: <span class="latency-value">{{ latency }}ms</span>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import CommonChart from "@/components/CommonChart.vue";
import shadowColud from "@/components/shadowColud.vue";
import ConnectionDialog from "@/components/ConnectionDialog.vue";
import { 
  getBlasChartOptions, 
  getSignChartOptions,
  getEcgChartOptions,
  getNegChartOptions,
  getMasChartOptions,
  getPatientChartOptions,
  getNegRadioChartOptions 
} from "@/util/chartConfig.js";

// 局部导入 Socket.IO
import SocketIO from 'socket.io-client';

// Socket.IO 连接配置
const SOCKET_URL = 'ws://shutiaogege.top:3000';
// const SOCKET_URL = 'ws://192.168.0.102:3000'; // 本地开发地址

export default {
  data() {
    return {
      // Socket 实例
      socket: null,
      // 延迟监控
      showLatencyMonitor: false,
      latency: 0,
      latencyTimer: null,
      localTime: new Date(),
      // 连接对话框
      showConnectionDialog: true,
      // 连接状态
      isConnected: false,
      connectionError: false,
      errorMessage: '',
      isLoading: true,
      lastUpdateTime: '',
      retryCount: 0,
      maxRetries: 3,
      // 数据
      serverTotal: {},
      radiation: {},
      ecg: {},
      diagnosisYang: {},
      diagnosisYing: {},
      patient: {},
      shadowColud: [],
      diagnosisRadio: [],
      businessData: {},
      institutions: [
        {
          imageUrl: require("@/assets/enter1.png"),
          title: "三级医疗机构数",
          countColor: "#01B3D1",
          count: 0,
        },
        {
          imageUrl: require("@/assets/enter2.png"),
          title: "二级医疗机构数",
          countColor: "#FFB507",
          count: 0,
        },
        {
          imageUrl: require("@/assets/enter3.png"),
          title: "基层医疗机构数",
          countColor: "#9701FD",
          count: 0,
        },
      ],
    };
  },
  components: {
    CommonChart,
    shadowColud,
    ConnectionDialog,
  },
  computed: {
    /**
     * Socket.IO 连接地址
     */
    socketUrl() {
      return SOCKET_URL;
    },
    
    /**
     * 本地时间显示 (月日时分秒)
     */
    localTimeDisplay() {
      if (!this.localTime) return '--';
      const month = String(this.localTime.getMonth() + 1).padStart(2, '0');
      const day = String(this.localTime.getDate()).padStart(2, '0');
      const hours = String(this.localTime.getHours()).padStart(2, '0');
      const minutes = String(this.localTime.getMinutes()).padStart(2, '0');
      const seconds = String(this.localTime.getSeconds()).padStart(2, '0');
      return `${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    
    businessGroups() {
      console.log('businessData', this.businessData);
      if (!this.businessData || typeof this.businessData !== 'object') return [];
      return [
        this.businessData.one || [],
        this.businessData.two || [],
        this.businessData.three || [],
        this.businessData.four || []
      ].filter(group => Array.isArray(group) && group.length > 0);
    },
    statusText() {
      if (this.connectionError) return '连接异常';
      if (this.isLoading) return '初始化中';
      return this.isConnected ? '实时连接中' : '未连接';
    },
    hasData() {
      return Object.keys(this.serverTotal).length > 0 || 
             this.institutions.some(inst => inst.count > 0);
    },
    // 放射与超声图表配置
    blasChartOptions() {
      return getBlasChartOptions(this.radiation);
    },
    // 服务总量统计图表配置
    signChartOptions() {
      return getSignChartOptions(this.serverTotal);
    },
    // 心电与会诊图表配置
    ecgChartOptions() {
      return getEcgChartOptions(this.ecg);
    },
    // 阴性诊断图表配置
    negChartOptions() {
      return getNegChartOptions(this.diagnosisYang);
    },
    // 阳性诊断图表配置
    masChartOptions() {
      return getMasChartOptions(this.diagnosisYing);
    },
    // 患者来源图表配置
    patientChartOptions() {
      return getPatientChartOptions(this.patient);
    },
    // 阴阳性统计占比图表配置
    diagnosisRadioChartOptions() {
      return getNegRadioChartOptions(this.diagnosisRadio);
    }
  },
  mounted() {
    // 移除原有的 $alert,使用新的对话框组件
  },
  
  beforeDestroy() {
    // 清理 Socket 连接
    this.cleanupSocket();
    // 清理延迟监控
    this.stopLatencyMonitor();
  },
  
  methods: {
    /**
     * 初始化 Socket.IO 连接
     */
    initSocket() {
      if (this.socket) {
        console.log('[Socket] Socket 实例已存在');
        return;
      }
      
      try {
        // 创建 Socket.IO 实例
        this.socket = SocketIO(SOCKET_URL, {
          autoConnect: false,
          timeout: 10000,
          transports: ['websocket', 'polling']
        });
        
        console.log('[Socket] Socket 实例已创建:', SOCKET_URL);
      } catch (error) {
        console.error('[Socket] 创建 Socket 实例失败:', error);
        this.handleConnectionError('Socket 初始化失败');
      }
    },
    
    /**
     * 初始化连接
     */
    initConnection() {
      try {
        this.isLoading = true;
        this.connectionError = false;
        this.retryCount = 0;

        // 初始化 Socket 实例
        this.initSocket();
        
        if (!this.socket) {
          throw new Error('Socket 实例未创建');
        }

        // 连接服务器
        this.socket.connect();
        this.isConnected = true;

        // 订阅数据推送
        this.socket.on('his_push', (res) => {
          this.fetchRemoteData(res);
        });

        // 监听连接错误
        this.socket.on('connect_error', (error) => {
          console.error('[Socket] 连接错误:', error);
          this.handleConnectionError('连接服务器失败');
        });

        // 监听连接超时
        this.socket.on('connect_timeout', () => {
          console.error('[Socket] 连接超时');
          this.handleConnectionError('连接超时');
        });

        // 监听断开连接
        this.socket.on('disconnect', (reason) => {
          console.log('[Socket] 连接断开:', reason);
          this.handleDisconnect();
        });

        // 监听重连
        this.socket.on('reconnect', (attemptNumber) => {
          console.log('[Socket] 重连成功,重试次数:', attemptNumber);
          this.isConnected = true;
          this.connectionError = false;
          
          // 重连成功后,自动开始延迟追踪
          this.startLatencyTracking();
        });

        // 监听重连错误
        this.socket.on('reconnect_error', (error) => {
          console.error('[Socket] 重连失败:', error);
        });
        
        // 开始延迟监控
        this.startLatencyTracking();

        // 设置加载超时
        setTimeout(() => {
          if (this.isLoading && !this.hasData) {
            this.handleConnectionError('数据加载超时');
          }
        }, 10000);
        
        // 连接成功后,自动开始延迟追踪
        this.socket.on('connect', () => {
          console.log('[Socket] 连接成功');
          this.isConnected = true;
          this.connectionError = false;
          this.isLoading = false;
          
          // 自动开始延迟监控
          this.startLatencyTracking();
        });
      } catch (error) {
        console.error('[Socket] 初始化连接失败:', error);
        this.handleConnectionError('连接初始化失败');
      }
    },
    
    /**
     * 清理 Socket 连接
     */
    cleanupSocket() {
      if (this.socket) {
        console.log('[Socket] 清理 Socket 连接');
        
        // 移除所有监听器
        this.socket.off('his_push');
        this.socket.off('connect_error');
        this.socket.off('connect_timeout');
        this.socket.off('disconnect');
        this.socket.off('reconnect');
        this.socket.off('reconnect_error');
        this.socket.off('pong');
        
        // 断开连接
        this.socket.disconnect();
        this.socket = null;
        this.isConnected = false;
      }
    },
    
    /**
     * 启动延迟监控面板
     */
    startLatencyMonitor() {
      this.showLatencyMonitor = true;
      
      // 如果已连接,立即开始追踪
      if (this.socket && this.socket.connected) {
        this.startLatencyTracking();
      }
    },
    
    /**
     * 停止延迟监控面板
     */
    stopLatencyMonitor() {
      this.showLatencyMonitor = false;
      if (this.latencyTimer) {
        clearInterval(this.latencyTimer);
        this.latencyTimer = null;
      }
      if (this.localTimeTimer) {
        clearInterval(this.localTimeTimer);
        this.localTimeTimer = null;
      }
    },
    
    /**
     * 开始延迟追踪
     */
    startLatencyTracking() {
      console.log('[Latency] 开始延迟追踪');
      
      // 清除已有定时器
      if (this.latencyTimer) {
        clearInterval(this.latencyTimer);
        this.latencyTimer = null;
      }
      if (this.localTimeTimer) {
        clearInterval(this.localTimeTimer);
        this.localTimeTimer = null;
      }
      
      // 更新时间显示 (每秒更新)
      this.localTimeTimer = setInterval(() => {
        this.localTime = new Date();
        console.log('[Latency] 更新时间:', this.localTimeDisplay);
      }, 1000);
      
      // 每 3 秒测试一次延迟
      this.latencyTimer = setInterval(() => {
        console.log('[Latency] 测量延迟...');
        this.measureLatency();
      }, 3000);
      
      // 立即执行一次
      this.measureLatency();
    },
    
    /**
     * 测量延迟
     */
    measureLatency() {
      console.log('[Latency] measureLatency 被调用');
      console.log('[Latency] socket 存在:', !!this.socket);
      console.log('[Latency] socket.connected:', this.socket ? this.socket.connected : false);
      
      // 模拟延迟模式 (用于测试)
      const USE_MOCK_LATENCY = true; // 设置为 false 使用真实测量
      
      if (USE_MOCK_LATENCY) {
        // 模拟延迟: 生成 20-300ms 之间的随机值
        const mockLatency = Math.floor(Math.random() * 280) + 20;
        this.latency = mockLatency;
        console.log('[Latency] 模拟延迟:', mockLatency, 'ms');
        return;
      }
      
      // 真实延迟测量
      if (!this.socket || !this.socket.connected) {
        console.warn('[Latency] Socket 未连接,跳过延迟测量');
        this.latency = 0;
        return;
      }
      
      const startTime = Date.now();
      console.log('[Latency] 发送 ping, startTime:', startTime);
      
      // 发送 ping 消息
      this.socket.emit('ping', { timestamp: startTime });
      
      // 监听 pong 响应
      const pongHandler = () => {
        const endTime = Date.now();
        this.latency = endTime - startTime;
        console.log('[Latency] 收到 pong, 延迟:', this.latency, 'ms');
        this.socket.off('pong', pongHandler);
      };
      
      this.socket.on('pong', pongHandler);
      console.log('[Latency] pong 监听器已注册');
      
      // 超时处理 (5秒)
      setTimeout(() => {
        console.warn('[Latency] ping 超时 (5s)');
        this.socket.off('pong', pongHandler);
      }, 5000);
    },

    // 处理连接错误
    handleConnectionError(message) {
      this.connectionError = true;
      this.isConnected = false;
      this.isLoading = false;
      this.errorMessage = message;
      console.error('[WebSocket Error]', message);
    },

    // 处理断开连接
    handleDisconnect() {
      this.isConnected = false;
      this.connectionError = true;
      this.errorMessage = '连接已断开';
      
      // 自动重连
      if (this.retryCount < this.maxRetries) {
        this.retryCount++;
        setTimeout(() => {
          this.initConnection();
        }, 3000);
      }
    },

    // 重试连接
    handleRetry() {
      this.connectionError = false;
      this.errorMessage = '';
      this.initConnection();
    },

    /**
     * 处理测试连接
     */
    handleTestConnection() {
      if (this.socket && this.socket.connected) {
        this.socket.emit('his', '测试内容');
        console.log('[Socket] 已发送测试消息');
      } else {
        console.warn('[Socket] Socket 未连接,无法发送测试消息');
        this.$message.warning('Socket 未连接');
      }
    },
    
    /**
     * 对话框测试连接成功回调
     */
    onDialogTestSuccess(result) {
      console.log('[ConnectionDialog] 测试成功:', result);
    },
    
    /**
     * 对话框测试连接失败回调
     */
    onDialogTestError(error) {
      console.error('[ConnectionDialog] 测试失败:', error);
    },
    
    /**
     * 对话框确认连接回调
     */
    onDialogConfirm(callback) {
      // 执行实际的连接逻辑
      this.initConnection();
      // 调用回调关闭对话框
      callback();
    },
    
    /**
     * 对话框关闭回调
     */
    onDialogClose() {
      console.log('[ConnectionDialog] 对话框已关闭');
    },
    fetchRemoteData(data) {
      try {
        // 验证数据格式
        if (!data || typeof data !== 'object') {
          console.warn('[Data Error] 无效的数据格式');
          return;
        }

        // 使用对象解构和默认值提高代码健壮性
        this.serverTotal = data.serverTotal || {};
        this.radiation = data.radiation || {};
        this.ecg = data.ecg || {};
        this.businessData = data.work || {};
        console.log('businessData', this.businessData);
        
        // 优化机构数据更新逻辑
        if (data.institutions && Array.isArray(data.institutions)) {
          data.institutions.forEach((count, index) => {
            if (this.institutions[index]) {
              this.institutions[index].count = count;
            }
          });
        }
        
        this.diagnosisYang = data.diagnosisYang || {};
        this.diagnosisYing = data.diagnosisYing || {};
        this.patient = data.patient || {};
        this.diagnosisRadio = data.diagnosisRadio || [];
        this.shadowColud = data.shadowColud || [];
        
        // 更新状态
        this.isLoading = false;
        this.connectionError = false;
        this.lastUpdateTime = this.formatTime(new Date());
        
        // 刷新图表
        this.refreshCharts();
      } catch (error) {
        console.error('[Data Processing Error]', error);
        this.handleConnectionError('数据处理异常');
      }
    },
    refreshCharts() {
      this.$nextTick(() => {
        try {
          // CommonChart 自动响应数据变化,无需手动调用 update
          if (this.$refs.shadowColud && this.$refs.shadowColud.update) this.$refs.shadowColud.update();
        } catch (error) {
          console.error('[Chart Update Error]', error);
        }
      });
    },

    // 格式化时间
    formatTime(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
  },
};
</script>
<style scoped lang="scss">
// 变量定义
$primary-color: #2550dd;
$secondary-color: #01B3D1;
$accent-color: #FFB507;
$success-color: #00B894;
$error-color: #FF4757;
$error-light: rgba(255, 71, 87, 0.9);
$text-color: #fff;
$bg-dark: #0b0b49;
$border-radius: 8px;
$transition: all 0.3s ease;

// 混入: 弹性布局
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin flex-row {
  display: flex;
  flex-direction: row;
}

@mixin flex-column {
  display: flex;
  flex-direction: column;
}

// 混入: 响应式断点
@mixin respond-to($breakpoint) {
  @if $breakpoint == 'xl' {
    @media screen and (max-width: 1920px) { @content; }
  } @else if $breakpoint == 'lg' {
    @media screen and (max-width: 1440px) { @content; }
  } @else if $breakpoint == 'md' {
    @media screen and (max-width: 1200px) { @content; }
  } @else if $breakpoint == 'sm' {
    @media screen and (max-width: 992px) { @content; }
  } @else if $breakpoint == 'xs' {
    @media screen and (max-width: 768px) { @content; }
  }
}

// 连接状态指示器
.connection-status {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  @include flex-row;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 20px;
  font-size: 14px;
  color: $text-color;
  transition: $transition;

  &.connected {
    background: rgba($success-color, 0.9);
  }

  &.error {
    background: $error-light;
    animation: errorPulse 2s infinite;
  }

  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: $text-color;
    animation: dotPulse 1.5s infinite;
  }

  &.connected .status-dot {
    background: $text-color;
    box-shadow: 0 0 8px $text-color;
  }

  &.error .status-dot {
    background: $text-color;
    animation: dotPulse 0.5s infinite;
  }
  
  // 开始监控按钮
  .start-monitor-btn {
    margin-left: 8px;
    padding: 4px 12px;
    background: $primary-color;
    color: $text-color;
    border: none;
    border-radius: 12px;
    font-size: 12px;
    cursor: pointer;
    transition: $transition;
    
    &:hover {
      background: lighten($primary-color, 10%);
      transform: scale(1.05);
    }
    
    &:active {
      transform: scale(0.95);
    }
  }
}

// 延迟监控面板
.latency-monitor {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
  min-width: 180px;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.85), rgba(20, 20, 60, 0.85));
  border-radius: $border-radius;
  border: 2px solid rgba($error-color, 0.6);
  box-shadow: 0 4px 16px rgba($error-color, 0.4);
  animation: slideInLeft 0.3s ease-out;
  
  .latency-header {
    padding: 10px 15px;
    background: rgba($error-color, 0.2);
    border-bottom: 1px solid rgba($error-color, 0.4);
    @include flex-row;
    align-items: center;
    gap: 8px;
    
    .monitor-icon {
      font-size: 18px;
    }
    
    .monitor-title {
      font-size: 14px;
      font-weight: bold;
      color: $text-color;
      letter-spacing: 1px;
    }
  }
  
  .latency-content {
    padding: 15px;
    @include flex-column;
    align-items: center;
    gap: 10px;
    
    .latency-time {
      font-size: 16px;
      color: rgba($text-color, 0.8);
      font-family: 'Courier New', monospace;
      letter-spacing: 2px;
    }
    
    .latency-value {
      font-size: 32px;
      font-weight: bold;
      color: $error-color;
      font-family: 'Courier New', monospace;
      text-shadow: 0 0 10px rgba($error-color, 0.6);
      animation: latencyPulse 1s infinite;
      
      &.high-latency {
        color: #ff0000;
        text-shadow: 0 0 15px rgba(#ff0000, 0.8);
        animation: latencyWarning 0.5s infinite;
      }
    }
  }
}

@keyframes dotPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

@keyframes errorPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes slideInLeft {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes latencyPulse {
  0%, 100% { 
    transform: scale(1);
    opacity: 1;
  }
  50% { 
    transform: scale(1.02);
    opacity: 0.9;
  }
}

@keyframes latencyWarning {
  0%, 100% { 
    transform: scale(1);
    opacity: 1;
  }
  50% { 
    transform: scale(1.05);
    opacity: 0.8;
  }
}

// 加载遮罩
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.8);
  @include flex-column;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);

  .loading-spinner {
    position: relative;
    width: 80px;
    height: 80px;
    margin-bottom: 20px;

    .spinner-ring {
      position: absolute;
      width: 100%;
      height: 100%;
      border: 4px solid transparent;
      border-top-color: $primary-color;
      border-radius: 50%;
      animation: spin 1.5s cubic-bezier(0.5, 0, 0.5, 1) infinite;

      &:nth-child(2) {
        width: 60px;
        height: 60px;
        top: 10px;
        left: 10px;
        border-top-color: $secondary-color;
        animation-duration: 1.2s;
        animation-direction: reverse;
      }

      &:nth-child(3) {
        width: 40px;
        height: 40px;
        top: 20px;
        left: 20px;
        border-top-color: $accent-color;
        animation-duration: 0.9s;
      }
    }
  }

  .loading-text {
    color: $text-color;
    font-size: 16px;
    letter-spacing: 2px;
    animation: textFade 1.5s infinite;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes textFade {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

// 错误提示横幅
.error-banner {
  position: fixed;
  top: 70px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 998;
  background: linear-gradient(135deg, rgba($error-color, 0.95), rgba(#FF6B6B, 0.95));
  color: $text-color;
  padding: 12px 24px;
  border-radius: $border-radius;
  @include flex-row;
  align-items: center;
  gap: 12px;
  box-shadow: 0 4px 12px rgba($error-color, 0.4);
  animation: slideDown 0.3s ease-out;

  .error-icon {
    font-size: 20px;
  }

  .retry-btn {
    background: $text-color;
    color: $error-color;
    border: none;
    padding: 6px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    transition: $transition;

    &:hover {
      background: #f8f9fa;
      transform: scale(1.05);
    }

    &:active {
      transform: scale(0.95);
    }
  }
}

@keyframes slideDown {
  from {
    transform: translateX(-50%) translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }
}

// 主容器
.big-wrap {
  .header {
    // 如需添加头部样式可在此扩展
    color: #ffffff;
    font-weight: bold;
    font-size: 38px;
  }

  .cont {
    // 内容容器
  }

  .footer {
    position: relative;
    color: #ffffff;
    font-size: 14px;
    
    .footer-company {
      // 公司信息样式
    }

    .technical-support {
      // 技术支持样式
    }

    .last-update {
      position: absolute;
      right: 20px;
      bottom: 10px;
      font-size: 12px;
      color: rgba($text-color, 0.6);
      
      // 延迟指示器
      .latency-indicator {
        margin-left: 8px;
        color: rgba($text-color, 0.6);
        
        .latency-value {
          color: $error-color;
          font-weight: bold;
          font-family: 'Courier New', monospace;
          margin-left: 4px;
        }
      }
    }
  }
}

// 仪表板容器
.dashboard-container {
  width: calc(100% - 30px);
  height: 100%;
  padding-left: 15px;
  padding-right: 15px;
  color: $text-color;
  @include flex-row;
  flex-wrap: wrap;

  // 左侧面板
  .left-panel {
    width: 378px;
    display: inline-flex;
    @include flex-column;
    height: 100%;
    font-size: 16px;

    @include respond-to('lg') {
      width: 320px;
    }

    @include respond-to('sm') {
      width: 100%;
    }
  }

  // 中间面板
  .center-panel {
    width: calc(100% - 776px);
    height: 100%;
    margin-left: 10px;
    margin-right: 10px;

    @include respond-to('lg') {
      width: calc(100% - 660px);
    }

    @include respond-to('sm') {
      width: 100%;
      margin: 0;
    }
  }

  // 右侧面板
  .right-panel {
    width: 378px;
    height: 100%;

    @include respond-to('lg') {
      width: 320px;
    }

    @include respond-to('sm') {
      width: 100%;
    }
  }

  // 面板头部
  .panel-header {
    height: 36px;
    margin-bottom: 4px;
    margin-top: 10px;

    img {
      max-width: 100%;
      height: 36px;
    }
  }

  // 左侧面板内容区
  .service-statistics,
  .radiology-ultrasound,
  .ecg-consultation {
    height: calc((100% - 50px) / 3);
    font-size: 16px;
  }

  // 右侧面板内容区
  .diagnosis-result,
  .diagnosis-proportion,
  .patient-source {
    height: calc((100% - 50px) / 3);
    font-size: 16px;
  }

  // 通用标题结构
  .d-top {
    height: 36px;
    line-height: 36px;
    width: calc(100% - 20px);
    padding-left: 20px;
    font-size: 16px;
  }

  .d-cont {
    height: calc(100% - 36px);
  }

  .section-title-indicator {
    display: inline-block;
    width: 3px;
    height: 15px;
    background-color: $primary-color;
    position: relative;
    top: 2px;
    margin-right: 8px;
  }

  // 中间部分 - 机构接入
  .institution-connection {
    height: 100px;

    .institution-list {
      height: 60px;
      width: 100%;
      @include flex-row;
      flex-wrap: wrap;
      background-color: $bg-dark;

      .institution-item {
        width: 33.3%;
        display: inline-flex;
        justify-content: center;
        margin-top: 15px;
        margin-bottom: 15px;
        line-height: 30px;

        > img {
          width: 32px;
          height: 32px;
          margin-right: 15px;
        }

        .institution-info {
          // 机构信息文本
        }

        .institution-count {
          margin-left: 10px;
          margin-right: 10px;
          display: inline-block;
          font-size: 24px;
          font-weight: bold;

          @include respond-to('md') {
            margin-left: 0;
            margin-right: 0;
          }
        }
      }
    }
  }

  // 中间部分 - 业务统计
  .business-statistics {
    height: 150px;
    margin-bottom: 10px;

    .business-list {
      width: 100%;
      @include flex-row;
      flex-wrap: wrap;
      justify-content: space-between;

      .business-card {
        width: 20%;
        height: 90px;
        background-image: url("@/assets/frame.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        text-align: center;
        padding-top: 10px;
        padding-bottom: 10px;
        display: inline-flex;
        @include flex-column;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        transition: $transition;
        cursor: pointer;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba($primary-color, 0.3);
        }

        > div {
          height: 33.3%;

          @include respond-to('md') {
            -webkit-transform: scale(0.8);
            transform: scale(0.8);
          }
        }

        .business-value {
          display: inline-block;
          margin-left: 8px;
        }

        @include respond-to('md') {
          font-size: 12px;
          white-space: nowrap;
        }
      }
    }
  }

  // 中间部分 - 地图轮播
  .map-carousel {
    height: calc(100% - 310px);
    background-image: url("@/assets/map.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 5px;
    overflow: hidden;
  }

  // 右侧 - 阴阳性诊断
  .neg-mas {
    width: 100%;
    height: 100%;
    @include flex-row;
    justify-content: space-around;
    align-items: center;

    .neg-wrap,
    .mas-wrap {
      width: 130px;
      height: 130px;
    }
  }
}

// 响应式布局调整
@include respond-to('sm') {
  .dashboard-container {
    flex-direction: column;

    .left-panel,
    .center-panel,
    .right-panel {
      width: 100%;
      margin: 0;
    }
  }
}
</style>
