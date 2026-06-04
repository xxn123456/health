/**
 * 放射与超声服务图表配置
 * @param {Object} radiation - 放射与超声数据
 * @param {Array} radiation.x - X轴数据
 * @param {Array} radiation.y1 - 放射数据(Y1轴)
 * @param {Array} radiation.y2 - 超声数据(Y2轴)
 * @returns {Object} ECharts 配置对象
 */
export function getBlasChartOptions(radiation = {}) {
  return {
    legend: {
      right: '5%',
      itemGap: 16,
      itemWidth: 18,
      itemHeight: 10,
      data: [
        { name: '放射' },
        { name: '超声' }
      ],
      textStyle: {
        color: '#fff',
        fontSize: 12
      }
    },

    tooltip: {
      show: true,
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        label: 'cross',
        show: true
      },
      backgroundColor: 'rgba(255,255,255,0)',
      borderWidth: '1',
      borderColor: 'gray',
      textStyle: {}
    },

    grid: {
      top: '15%',
      left: '4%',
      bottom: '12%',
      containLabel: true
    },

    dataZoom: [
      {
        xAxisIndex: 0,
        show: false,
        type: 'slider',
        startValue: 0,
        endValue: 4
      }
    ],

    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: '#616582'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        fontSize: '75%',
        color: '#fff'
      },
      data: radiation.x || []
    },

    yAxis: {
      type: 'value',
      name: '/人',
      nameTextStyle: {
        fontSize: '75%',
        color: '#fff'
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#616582'
        }
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: '#616582'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        fontSize: '75%'
      }
    },

    series: [
      {
        type: 'line',
        name: '放射',
        showAllSymbol: true,
        symbol: 'circle',
        symbolSize: 4,
        lineStyle: {
          normal: {
            color: '#6c50f3',
            shadowColor: 'rgba(0, 0, 0, .3)',
            shadowBlur: 0,
            shadowOffsetY: 5,
            shadowOffsetX: 5
          }
        },
        label: {
          show: true,
          position: 'top',
          textStyle: {
            color: '#fff',
            fontSize: '8'
          }
        },
        itemStyle: {
          color: '#6c50f3',
          borderColor: '#fff',
          borderWidth: 1,
          shadowColor: 'rgba(0, 0, 0, .3)',
          shadowBlur: 0,
          shadowOffsetY: 2,
          shadowOffsetX: 2
        },
        data: radiation.y1 || []
      },
      {
        type: 'line',
        name: '超声',
        showAllSymbol: true,
        symbol: 'circle',
        symbolSize: 4,
        lineStyle: {
          normal: {
            color: 'rgba(236, 169, 44, 1)',
            shadowColor: 'rgba(0, 0, 0, .3)',
            shadowBlur: 0,
            shadowOffsetY: 5,
            shadowOffsetX: 5
          }
        },
        label: {
          show: true,
          position: 'top',
          textStyle: {
            color: '#fff',
            fontSize: '8'
          }
        },
        itemStyle: {
          color: 'rgba(236, 169, 44, 0.8)',
          borderColor: '#fff',
          borderWidth: 1,
          shadowColor: 'rgba(0, 0, 0, .3)',
          shadowBlur: 0,
          shadowOffsetY: 2,
          shadowOffsetX: 2
        },
        data: radiation.y2 || []
      }
    ]
  }
}

/**
 * 服务总量统计图表配置 (堆叠柱状图)
 * @param {Object} serverTotal - 服务总量数据
 * @param {Array} serverTotal.x - X轴数据
 * @param {Array} serverTotal.y1 - 放射数据
 * @param {Array} serverTotal.y2 - 超声数据
 * @param {Array} serverTotal.y3 - 心电数据
 * @param {Array} serverTotal.y4 - 会诊数据
 * @returns {Object} ECharts 配置对象
 */
export function getSignChartOptions(serverTotal = {}) {
  return {
    legend: {
      right: '5%',
      itemGap: 16,
      itemWidth: 10,
      itemHeight: 6,
      data: [
        { name: '放射' },
        { name: '超声' },
        { name: '心电' },
        { name: '会诊' }
      ],
      textStyle: {
        color: '#fff',
        fontSize: 12
      }
    },

    tooltip: {
      show: true,
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        label: 'cross',
        show: true
      },
      backgroundColor: 'rgba(255,255,255,0)',
      borderWidth: '1',
      borderColor: 'gray',
      textStyle: {}
    },

    color: ['#4C98FB', '#83CCE7', '#26C7C8', '#73DEBD'],

    grid: {
      top: '15%',
      left: '4%',
      bottom: '12%',
      containLabel: true
    },

    dataZoom: [
      {
        xAxisIndex: 0,
        show: false,
        type: 'slider',
        startValue: 0,
        endValue: 4
      }
    ],

    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: '#616582'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        fontSize: '75%',
        color: '#fff'
      },
      data: serverTotal.x || []
    },

    yAxis: {
      type: 'value',
      name: '/人',
      nameTextStyle: {
        fontSize: '75%',
        color: '#fff'
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#616582'
        }
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: '#616582'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        fontSize: '75%'
      }
    },

    series: [
      {
        type: 'bar',
        name: '放射',
        stack: '总量',
        barWidth: '20',
        itemStyle: {
          color: '#6c50f3'
        },
        label: {
          show: true,
          position: 'right',
          textStyle: {
            color: '#fff',
            fontSize: '8'
          }
        },
        data: serverTotal.y1 || []
      },
      {
        type: 'bar',
        name: '超声',
        stack: '总量',
        barWidth: '20',
        itemStyle: {
          color: 'rgba(236, 169, 44, 1)'
        },
        label: {
          show: true,
          position: 'right',
          textStyle: {
            color: '#fff',
            fontSize: '8'
          }
        },
        data: serverTotal.y2 || []
      },
      {
        type: 'bar',
        name: '心电',
        stack: '总量',
        barWidth: '20',
        itemStyle: {
          color: '#00ca95'
        },
        label: {
          show: true,
          position: 'right',
          textStyle: {
            color: '#fff',
            fontSize: '8'
          }
        },
        data: serverTotal.y3 || []
      },
      {
        type: 'bar',
        name: '会诊',
        stack: '总量',
        barWidth: '20',
        itemStyle: {
          color: '#ac4ed3'
        },
        label: {
          show: true,
          position: 'right',
          textStyle: {
            color: '#fff',
            fontSize: '8'
          }
        },
        data: serverTotal.y4 || []
      }
    ]
  }
}

/**
 * 心电与会诊图表配置 (双折线图带渐变填充)
 * @param {Object} ecg - 心电与会诊数据
 * @param {Array} ecg.x - X轴数据
 * @param {Array} ecg.y1 - 心电数据
 * @param {Array} ecg.y2 - 会诊数据
 * @returns {Object} ECharts 配置对象
 */
export function getEcgChartOptions(ecg = {}) {
  return {
    legend: {
      right: '5%',
      itemGap: 16,
      itemWidth: 18,
      itemHeight: 10,
      data: [
        { name: '心电' },
        { name: '会诊' }
      ],
      textStyle: {
        color: '#fff',
        fontSize: 12
      }
    },

    tooltip: {
      show: true,
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        label: 'cross',
        show: true
      },
      backgroundColor: 'rgba(255,255,255,0)',
      borderWidth: '1',
      borderColor: 'gray',
      textStyle: {}
    },

    grid: {
      top: '15%',
      left: '4%',
      bottom: '12%',
      containLabel: true
    },

    dataZoom: [
      {
        xAxisIndex: 0,
        show: false,
        type: 'slider',
        startValue: 0,
        endValue: 4
      }
    ],

    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: '#616582'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        fontSize: '75%',
        color: '#fff'
      },
      data: ecg.x || []
    },

    yAxis: {
      type: 'value',
      name: '/人',
      nameTextStyle: {
        fontSize: '75%',
        color: '#fff'
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#616582'
        }
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: '#616582'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        fontSize: '75%'
      }
    },

    series: [
      {
        type: 'line',
        name: '心电',
        showAllSymbol: true,
        symbol: 'circle',
        symbolSize: 4,
        lineStyle: {
          normal: {
            color: '#00ca95',
            shadowColor: 'rgba(0, 0, 0, .3)',
            shadowBlur: 0,
            shadowOffsetY: 5,
            shadowOffsetX: 5
          }
        },
        label: {
          show: true,
          position: 'top',
          textStyle: {
            color: '#fff',
            fontSize: '8'
          }
        },
        itemStyle: {
          color: '#00ca95',
          borderColor: '#fff',
          borderWidth: 1,
          shadowColor: 'rgba(0, 0, 0, .3)',
          shadowBlur: 0,
          shadowOffsetY: 2,
          shadowOffsetX: 2
        },
        areaStyle: {
          normal: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(0,202,149,0.3)' },
                { offset: 1, color: 'rgba(0,202,149,0)' }
              ]
            },
            shadowColor: 'rgba(0,202,149, 0.9)',
            shadowBlur: 20
          }
        },
        data: ecg.y1 || []
      },
      {
        type: 'line',
        name: '会诊',
        showAllSymbol: true,
        symbol: 'circle',
        symbolSize: 4,
        lineStyle: {
          normal: {
            color: '#ac4ed3',
            shadowColor: 'rgba(0, 0, 0, .3)',
            shadowBlur: 0,
            shadowOffsetY: 5,
            shadowOffsetX: 5
          }
        },
        label: {
          show: true,
          position: 'top',
          textStyle: {
            color: '#fff',
            fontSize: '8'
          }
        },
        itemStyle: {
          color: '#ac4ed2',
          borderColor: '#fff',
          borderWidth: 1,
          shadowColor: 'rgba(0, 0, 0, .3)',
          shadowBlur: 0,
          shadowOffsetY: 2,
          shadowOffsetX: 2
        },
        areaStyle: {
          normal: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(0,202,149,0.3)' },
                { offset: 1, color: 'rgba(0,202,149,0)' }
              ]
            },
            shadowColor: 'rgba(0,202,149, 0.9)',
            shadowBlur: 20
          }
        },
        data: ecg.y2 || []
      }
    ]
  }
}

/**
 * 阴性诊断图表配置 (环形图)
 * @param {Object} diagnosis - 阴性诊断数据
 * @param {Number} diagnosis.num - 阴性数量
 * @param {Number} diagnosis.all - 总数量
 * @returns {Object} ECharts 配置对象
 */
export function getNegChartOptions(diagnosis = {}) {
  return {
    series: [
      {
        name: '第一个圆环',
        type: 'pie',
        clockWise: false,
        radius: ['80%', '90%'],
        itemStyle: {
          normal: {
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            shadowBlur: 0,
            shadowColor: '#203665'
          }
        },
        hoverAnimation: false,
        center: ['50%', '50%'],
        data: [
          {
            value: diagnosis.num || 0,
            label: {
              normal: {
                rich: {
                  a: {
                    color: '#fff',
                    align: 'center',
                    fontSize: 10,
                    fontWeight: 'bold'
                  },
                  b: {
                    color: '#b220fa',
                    align: 'center',
                    fontSize: 12
                  }
                },
                formatter: function(params) {
                  return '{b|阴性}\n\n' + '{a|' + params.value + '个}';
                },
                position: 'center',
                show: true,
                textStyle: {
                  fontSize: '12',
                  fontWeight: 'normal',
                  color: '#fff'
                }
              }
            },
            itemStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 0,
                  colorStops: [
                    { offset: 0, color: '#b51dfa' },
                    { offset: 1, color: '#b220fa' }
                  ]
                },
                shadowColor: '#2ba6fe',
                shadowBlur: 0
              }
            }
          },
          {
            value: diagnosis.all || 0,
            name: 'invisible',
            itemStyle: {
              normal: {
                color: '#24375c'
              },
              emphasis: {
                color: '#24375c'
              }
            }
          }
        ]
      }
    ]
  }
}

/**
 * 阳性诊断图表配置 (环形图)
 * @param {Object} diagnosis - 阳性诊断数据
 * @param {Number} diagnosis.num - 阳性数量
 * @param {Number} diagnosis.total - 总数量
 * @returns {Object} ECharts 配置对象
 */
export function getMasChartOptions(diagnosis = {}) {
  return {
    series: [
      {
        name: '第一个圆环',
        type: 'pie',
        clockWise: false,
        radius: ['80%', '90%'],
        itemStyle: {
          normal: {
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            shadowBlur: 0,
            shadowColor: '#203665'
          }
        },
        hoverAnimation: false,
        center: ['50%', '50%'],
        data: [
          {
            value: diagnosis.num || 0,
            label: {
              normal: {
                rich: {
                  a: {
                    color: '#fff',
                    align: 'center',
                    fontSize: 10,
                    fontWeight: 'bold'
                  },
                  b: {
                    color: '#2FD587',
                    align: 'center',
                    fontSize: 12
                  }
                },
                formatter: function(params) {
                  return '{b|阳性}\n\n' + '{a|' + params.value + '个}';
                },
                position: 'center',
                show: true,
                textStyle: {
                  fontSize: '12',
                  fontWeight: 'normal',
                  color: '#fff'
                }
              }
            },
            itemStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 0,
                  colorStops: [
                    { offset: 0, color: '#05D2C3' },
                    { offset: 1, color: '#2FD587' }
                  ]
                },
                shadowColor: '#2ba6fe',
                shadowBlur: 0
              }
            }
          },
          {
            value: diagnosis.total || 0,
            name: 'invisible',
            itemStyle: {
              normal: {
                color: '#24375c'
              },
              emphasis: {
                color: '#24375c'
              }
            }
          }
        ]
      }
    ]
  }
}

/**
 * 患者来源统计图表配置 (柱状图带渐变)
 * @param {Object} patient - 患者来源数据
 * @param {Array} patient.x - X轴数据
 * @param {Array} patient.y1 - 患者数量数据
 * @returns {Object} ECharts 配置对象
 */
export function getPatientChartOptions(patient = {}) {
  return {
    tooltip: {
      trigger: 'axis'
    },

    grid: {
      top: '16%',
      left: '3%',
      bottom: '3%',
      containLabel: true
    },

    dataZoom: [
      {
        xAxisIndex: 0,
        show: false,
        type: 'slider',
        startValue: 0,
        endValue: 4
      }
    ],

    xAxis: {
      type: 'category',
      axisLine: {
        lineStyle: {
          color: '#616582'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        interval: 0,
        fontSize: '12',
        color: '#fff'
      },
      data: patient.x || []
    },

    yAxis: {
      type: 'value',
      name: '/次',
      nameTextStyle: {
        fontSize: '75%',
        color: '#fff'
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#616582'
        }
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: '#616582'
        }
      },
      axisLabel: {
        fontSize: '75%'
      }
    },

    series: [
      {
        type: 'bar',
        barWidth: 16,
        itemStyle: {
          normal: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: '#8e0cfa' },
                { offset: 0.5, color: '#406ae3' },
                { offset: 1, color: '#09aad6' }
              ]
            },
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#fff',
                fontSize: '75%'
              }
            }
          }
        },
        data: patient.y1 || []
      }
    ]
  }
}

/**
 * 阴阳性统计占比图表配置 (饼图)
 * @param {Array} diagnosisRadio - 阴阳性统计数据数组
 * @param {String} diagnosisRadio[].name - 数据名称
 * @param {Number} diagnosisRadio[].value - 数据值
 * @returns {Object} ECharts 配置对象
 */
export function getNegRadioChartOptions(diagnosisRadio = []) {
  return {
    color: ['#6c50f3', 'rgba(236, 169, 44, 1)', '#00ca95'],

    tooltip: {
      trigger: 'item',
      formatter: '{d}%'
    },

    toolbox: {
      show: true
    },

    legend: {
      textStyle: {
        color: '#fff'
      }
    },

    grid: {
      top: '15%',
      right: '4%',
      bottom: '12%',
      containLabel: true
    },

    series: [
      {
        name: '业务警种',
        type: 'pie',
        radius: [0, '70%'],
        label: {
          normal: {
            formatter: (params) => {
              return params.name + params.percent.toFixed(0) + '%';
            },
            padding: [0, -5, 0, -5]
          }
        },
        data: Array.isArray(diagnosisRadio) ? diagnosisRadio : []
      }
    ]
  }
}
