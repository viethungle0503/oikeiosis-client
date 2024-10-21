<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import ConditionSelect from './ConditionSelect.vue'
import PriceCondition from './PriceCondition.vue'
import VolumeCondition from './VolumeCondition.vue'

const dates = ref([new Date(new Date().setDate(new Date().getDate() - 30)), new Date()])
const stocks = ref<any>([])
const showStocks = ref(false)
const resultMessage = ref('')

const loading = ref(false)
const leftOperatorOptions = ref([
  { name: 'Giá', code: 'price' },
  { name: 'Khối lượng', code: 'volume' }
])

const priceOperatorOptions = ref([
  { name: 'Lớn hơn', code: 'greater' },
  { name: 'Đang giảm', code: 'decreasing' },
  { name: 'Đang tăng', code: 'increasing' },
])

const volumeOperatorOptions = ref([{ name: 'Lớn hơn', code: 'greater' }])

interface Condition {
  leftOperator: {
    key: string | null
  }
  operator: {
    key: string | null
    range_from?: number | null
    range_to?: number | null
  }
  rightOperator: {
    key: string | null
    p_value?: number | null
  }
}

const conditions = ref<Condition[]>([
  {
    leftOperator: { key: 'price' },
    operator: { key: 'greater' },
    rightOperator: { key: 'SMA', p_value: 200 }
  },
  {
    leftOperator: { key: 'volume' },
    operator: { key: 'greater' },
    rightOperator: { key: 'average', p_value: 1000000 }
  },
  {
    leftOperator: { key: 'price' },
    operator: { key: 'decreasing', range_from: 0, range_to: 10 },
    rightOperator: { key: 'percentage' }
  }
])
const addCondition = () => {
  conditions.value.push({
    leftOperator: {
      key: null
    },
    operator: {
      key: null,
      range_from: null,
      range_to: null
    },
    rightOperator: {
      key: null,
      p_value: null
    }
  })
}

const deleteCondition = (index: number) => {
  conditions.value.splice(index, 1)
}

const toLocalISOString = (date: string | object) => {
  if (typeof date !== 'string') {
    date = date.toString()
  }
  const offset = new Date().getTimezoneOffset()
  const localDate = new Date(new Date(date).getTime() - offset * 60000)
  return localDate.toISOString().split('T')[0]
}

const toViLocaleString = (date: string | object) => {
  date = toLocalISOString(date)
  let temp = date.split('-')
  return `${temp[2]}/${temp[1]}/${temp[0]}`
}

const submit = async () => {
  try {
    loading.value = true
    let fromDate = toViLocaleString(dates.value[0])
    let toDate = toViLocaleString(dates.value[1])
    const basaeUrl = import.meta.env.VITE_SERVER_BASE_URL
    const endpoint = '/api/v1/main/filter-by-condition'
    const response = await axios.post(`${basaeUrl}${endpoint}`, {
      symbols: [],
      conditions: conditions.value,
      fromDate,
      toDate,
      resultType: 'object'
    }, {
      headers: {
        'ngrok-skip-browser-warning': 'true',
      }
    })
    if (response.data && response.data.status == 200) {
      stocks.value = response.data.data
      resultMessage.value = response.data.message
    }
    loading.value = false
  } catch (error: any) {
    console.error(error.message)
  }
}
</script>

<template>
  <div>
    <div class="row mb-2">
      <label for="range">Chọn khoảng thời gian</label>
      <DatePicker
        v-model="dates"
        :invalid="dates === null"
        dateFormat="dd/mm/yy"
        selectionMode="range"
        :manualInput="true"
        :showIcon="true"
        showButtonBar
        class="col-md-4"
        id="range"
      ></DatePicker>
    </div>
    <Button label="Add Condition" icon="pi pi-plus" @click="addCondition()"></Button>
    <div v-for="(condition, index) in conditions" :key="index" class="mt-2">
      <div class="d-flex justify-content-start flex-nowrap overflow-auto gap-2" style="">
        <Button label="Delete Condition" icon="pi pi-minus" severity="danger" @click="deleteCondition(index)"></Button>
        <ConditionSelect
          :condition="condition"
          :leftOperatorOptions="leftOperatorOptions"
        ></ConditionSelect>
        <span v-if="condition.leftOperator.key != null">
          <PriceCondition
            v-if="condition.leftOperator.key == 'price'"
            :condition="condition"
            :priceOperatorOptions="priceOperatorOptions"
          ></PriceCondition>
          <VolumeCondition
            v-if="condition.leftOperator.key == 'volume'"
            :condition="condition"
            :volumeOperatorOptions="volumeOperatorOptions"
          ></VolumeCondition>
        </span>
      </div>
    </div>
    <Button
      label="Submit"
      severity="success"
      class="mt-2"
      @click="submit()"
      :loading="loading"
    ></Button>
    <Button
      :label="showStocks ? 'Đóng bảng' : 'Hiển thị bảng'"
      icon="pi pi-eye"
      severity="info"
      class="ms-2"
      @click="() => (showStocks = !showStocks)"
    ></Button>
    <div v-if="resultMessage != ''">
      <div class="mt-2">
        <span>{{ resultMessage }}</span>
        <span>{{ stocks.map((stock: any) => stock.symbol) }}</span>
      </div>
    </div>
    <div v-if="showStocks && stocks.length > 0 && stocks[0].dailyData.length > 0">
      <div class="card mt-2" v-for="(stock, index) in stocks" :key="index">
        <Avatar :label="stock.symbol" class="mr-2" size="xlarge" />
        <DataTable :value="stock.dailyData" tableStyle="min-width: 50rem">
          <Column field="tradingDate" header="Ngày giao dịch"></Column>
          <Column field="open" header="Giá mở cửa"></Column>
          <Column field="high" header="Giá cao nhất"></Column>
          <Column field="low" header="Giá thấp nhất"></Column>
          <Column field="close" header="Giá đóng cửa"></Column>
          <Column field="volume" header="Khối lượng giao dịch"></Column>
          <Column field="value" header="Giá trị giao dịch"></Column>
          <Column field="psma10" header="Price SMA10"></Column>
          <Column field="psma20" header="Price SMA20"></Column>
          <Column field="psma50" header="Price SMA50"></Column>
          <Column field="psma100" header="Price SMA100"></Column>
          <Column field="psma200" header="Price SMA200"></Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>
