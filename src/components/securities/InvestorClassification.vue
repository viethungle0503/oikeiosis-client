<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import axios from 'axios';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const label = ref('');
const code = ref<{
  label: string;
  value: string;
  organName: string;
  organShortName: string;
}>(
  {
    label: 'MWG',
    value: 'MWG',
    organName: '',
    organShortName: ''
  }
);
const filteredCodes = ref();
const organizationList = ref<any[]>([]);
const searchItems = (event: any) => {
  let query = event.query;
  let _filteredItems = [];

  for (let i = 0; i < organizationList.value.length; i++) {
    let item = organizationList.value[i];

    if (item.label.toLowerCase().indexOf(query.toLowerCase()) === 0) {
      _filteredItems.push(item);
    }
  }

  filteredCodes.value = _filteredItems;
};
const frequently = ref('Daily');
const page = ref(1);
const pageSize = ref(60);
const to = ref('2024-12-31');
const from = ref('2024-01-01');
const size = ref({ label: 'Normal', value: undefined });
const sizeOptions = ref([
  { label: 'Small', value: 'small' },
  { label: 'Normal', value: undefined },
  { label: 'Large', value: 'large' }
]);
const transactionData = ref<any[]>([]);
const total = ref<{
  localIndividualNetValueMatched: number;
  localOrganizationalNetValueMatched: number;
  foreignNetValueMatched: number;
  proprietaryTotalMatchNetTradeValue: number;
  localIndividualNetValue: number;
  localOrganizationalNetValue: number;
  foreignNetValue: number;
  proprietaryTotalNetTradeValue: number;
}>({
  localIndividualNetValueMatched: 0,
  localOrganizationalNetValueMatched: 0,
  foreignNetValueMatched: 0,
  proprietaryTotalMatchNetTradeValue: 0,
  localIndividualNetValue: 0,
  localOrganizationalNetValue: 0,
  foreignNetValue: 0,
  proprietaryTotalNetTradeValue: 0
});

const dates = ref([new Date(new Date().setDate(new Date().getDate() - 30)), new Date()]);

const dt = ref();
const exportCSV = () => {
  dt.value.exportCSV();
};
const columns = ref([
  { field: 'tradingDate', header: 'Ngày giao dịch', sortable: true },
  { field: 'localIndividualNetValueMatched', header: 'Cá nhân khớp lệnh ròng', sortable: true },
  { field: 'localOrganizationalNetValueMatched', header: 'Tổ chức khớp lệnh ròng', sortable: true },
  {
    field: 'proprietaryTotalMatchNetTradeValue',
    header: 'Tự doanh khớp lệnh ròng',
    sortable: true
  },
  { field: 'foreignNetValueMatched', header: 'Nước ngoài khớp lệnh ròng', sortable: true },
  { field: 'localIndividualNetValue', header: 'Tổng cá nhân ròng', sortable: true },
  { field: 'localOrganizationalNetValue', header: 'Tổng tổ chức ròng', sortable: true },
  { field: 'foreignNetValue', header: 'Tổng tự doanh ròng', sortable: true },
  { field: 'proprietaryTotalNetTradeValue', header: 'Tổng nước ngoài ròng', sortable: true }
]);
const selectedColumns = ref(columns.value);
const onToggle = (val: any) => {
  selectedColumns.value = columns.value.filter((col) => val.includes(col));
};

const getInvestorClassification = async () => {
  try {
    toast.add({
      severity: 'info',
      summary: 'Đang lấy dữ liệu',
      detail: `Mã ${code.value.label}`,
      life: 3000
    });
    label.value = code.value.label;
    const baseUrl = `${import.meta.env.VITE_SERVER_OIKEIOSIS_URL}/api/v1/fiin-trade/investor-classification`;
    from.value = formatDate(dates.value[0]);
    to.value = formatDate(dates.value[1]);
    const params = `?language=vi&code=${code.value.value}&frequently=${frequently.value}&page=${page.value}&pageSize=${pageSize.value}&from=${from.value}&to=${to.value}`;
    const url = `${baseUrl}${params}`;
    const response = await axios.get(url, {
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    });
    if (response.data) {
      let result = response.data.items.map((item: any) => {
        item.tradingDate = formatDate(new Date(item.issueDate));
        // Chỉ khớp lệnh ròng
        item.localIndividualNetValueMatched = formatNumber(
          item.localIndividualBuyMatchValue - item.localIndividualSellMatchValue
        );
        item.localInstitutionalNetValueMatched = formatNumber(
          item.localInstitutionalBuyMatchValue - item.localInstitutionalSellMatchValue
        );
        item.foreignNetValueMatched = formatNumber(
          item.foreignBuyValueMatched - item.foreignSellValueMatched
        );
        item.proprietaryTotalMatchNetTradeValue = formatNumber(
          item.proprietaryTotalMatchBuyTradeValue - item.proprietaryTotalMatchSellTradeValue
        );
        item.localOrganizationalNetValueMatched = formatNumber(
          parseCurrency(item.localInstitutionalNetValueMatched) -
            parseCurrency(item.proprietaryTotalMatchNetTradeValue)
        );
        total.value.localIndividualNetValueMatched += parseCurrency(
          item.localIndividualNetValueMatched
        );
        total.value.localOrganizationalNetValueMatched += parseCurrency(
          item.localOrganizationalNetValueMatched
        );
        total.value.foreignNetValueMatched += parseCurrency(item.foreignNetValueMatched);
        total.value.proprietaryTotalMatchNetTradeValue += parseCurrency(
          item.proprietaryTotalMatchNetTradeValue
        );

        // Khớp lệnh và thoả thuận
        item.localIndividualNetValue = formatNumber(
          item.localIndividualBuyValue - item.localIndividualSellValue
        );
        item.localInstitutionalNetValue = formatNumber(
          item.localInstitutionalBuyValue - item.localInstitutionalSellValue
        );
        item.foreignNetValue = formatNumber(item.foreignBuyValue - item.foreignSellValue);
        item.proprietaryTotalNetTradeValue = formatNumber(
          item.proprietaryTotalBuyTradeValue - item.proprietaryTotalSellTradeValue
        );
        item.localOrganizationalNetValue = formatNumber(
          parseCurrency(item.localInstitutionalNetValue) -
            parseCurrency(item.proprietaryTotalNetTradeValue)
        );
        total.value.localIndividualNetValue += parseCurrency(item.localIndividualNetValue);
        total.value.localOrganizationalNetValue += parseCurrency(item.localOrganizationalNetValue);
        total.value.foreignNetValue += parseCurrency(item.foreignNetValue);
        total.value.proprietaryTotalNetTradeValue += parseCurrency(
          item.proprietaryTotalNetTradeValue
        );
        return item;
      });
      transactionData.value = result;
      toast.add({
        severity: 'success',
        summary: 'Lấy dữ liệu thành công',
        detail: `Mã ${code.value.label}`,
        life: 3000
      });
    }
  } catch (error) {
    console.error(error);
  }
};

const getOrganizationList = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_OIKEIOSIS_URL}/api/v1/fiin-trade/organization-list`,
      {
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      }
    );
    if (response.data) {
      organizationList.value = response.data.items.map((item: any) => {
        return {
          label: item.ticker,
          value: item.organCode,
          organName: item.organName,
          organShortName: item.organShortName
        };
      });
    }
  } catch (error) {
    console.error(error);
  }
};

const formatNumber = (value: number) => {
  // return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

const parseCurrency = (value: string): number => {
  const numberString = value.replace(/(?!^-)[^\d]/g, ''); // Loại bỏ các ký tự không phải số, ngoại trừ dấu trừ ở đầu
  return parseInt(numberString);
};

const formatDate = (date: Date) => {
  return date.toISOString().split('T')[0];
};

const getColumnClass = (field: string, data: any) => {
  if (field === 'tradingDate') return 'text-primary';
  else if (data[field].includes('-')) {
    return 'text-danger';
  } else return 'text-success';
};

onMounted(() => {
  getOrganizationList();
});
</script>

<template>
  <div class="card" style="max-width: 100%">
    <Toast />
    <div class="d-flex flex-row justify-content-center mb-2 mt-2" style="gap: 5rem">
      <AutoComplete
        v-model="code"
        :suggestions="filteredCodes"
        @complete="searchItems"
        :virtualScrollerOptions="{ itemSize: 40 }"
        :forceSelection="true"
        optionLabel="label"
        :dropdown="true"
        class="text-uppercase"
        :pt="{
          option: 'flex flex-row items-center h-25'
        }"
      >
        <template #option="slotProps">
          <div class="flex items-center">
            <p
              :class="`flag flag-${slotProps.option.value.toLowerCase()} mr-2`"
              style="min-width: 50px; word-break: break-all; white-space: normal"
            >
              {{ slotProps.option.label }}
              <span> - {{ slotProps.option.organShortName }}</span>
            </p>
          </div>
        </template>
      </AutoComplete>
      <DatePicker
        v-model="dates"
        :invalid="dates === null"
        dateFormat="dd/mm/yy"
        selectionMode="range"
        :manualInput="true"
        :showIcon="true"
        showButtonBar
        showTime
        hourFormat="24"
        class="col-md-4"
        id="range"
      ></DatePicker>
      <Button
        label="Search"
        icon="pi pi-search"
        iconPos="top"
        v-on:click="getInvestorClassification()"
      ></Button>
    </div>
    <div v-if="transactionData.length != 0" class="ms-2">
      <h4>Thống kê giao dịch từ ngày {{ from }} đến ngày {{ to }}:</h4>
      <div class="d-flex flex-row align-items-center">
        <h1 class="display-4 text-danger d-inline">{{ label }}</h1>
        <ul>
          <li>
            <span
              >Cá nhân khớp lệnh ròng:
              {{ formatNumber(total.localIndividualNetValueMatched) }}</span
            >
          </li>
          <li>
            <span
              >Tổ chức khớp lệnh ròng:
              {{ formatNumber(total.localOrganizationalNetValueMatched) }}</span
            >
          </li>
          <li>
            <span
              >Tự doanh khớp lệnh ròng:
              {{ formatNumber(total.proprietaryTotalMatchNetTradeValue) }}</span
            >
          </li>
          <li>
            <span>Nước ngoài khớp lệnh ròng: {{ formatNumber(total.foreignNetValueMatched) }}</span>
          </li>
          <li>
            <span>Cá nhân ròng: {{ formatNumber(total.localIndividualNetValue) }}</span>
          </li>
          <li>
            <span>Tổ chức ròng: {{ formatNumber(total.localOrganizationalNetValue) }}</span>
          </li>
          <li>
            <span>Tự doanh ròng: {{ formatNumber(total.proprietaryTotalNetTradeValue) }}</span>
          </li>
          <li>
            <span>Nước ngoài ròng: {{ formatNumber(total.foreignNetValue) }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="flex justify-center mb-6">
      <SelectButton v-model="size" :options="sizeOptions" optionLabel="label" dataKey="label" />
    </div>
    <DataTable
      :value="transactionData"
      ref="dt"
      :size="size.value"
      showGridlines
      stripedRows
      paginator
      :rows="10"
      :rowsPerPageOptions="[10, 25, 50, 100]"
      :sort-mode="'multiple'"
      :scrollable="true"
      scrollHeight="50vh"
      :reorderableColumns="true"
      :resizableColumns="true"
      :class="['p-datatable-sm', 'p-datatable-striped', 'p-1']"
    >
      <template #header>
        <div class="text-start pb-4">
          <Button icon="pi pi-external-link" label="Export" @click="exportCSV()" />
        </div>
        <div style="text-align: left">
          <MultiSelect
            :modelValue="selectedColumns"
            :options="columns"
            optionLabel="header"
            @update:modelValue="onToggle"
            display="chip"
            placeholder="Select Columns"
            :pt="{
              label: 'flex-wrap'
            }"
          />
        </div>
      </template>
      <Column
        v-for="(col, index) in selectedColumns"
        :key="index"
        :field="col.field"
        :header="col.header"
        :sortable="col.sortable == true"
        style="min-width: 150px"
      >
        <template #body="{ field, data }">
          <div :class="getColumnClass(field, data)">
            {{ data[field] }}
          </div>
        </template></Column
      >
    </DataTable>
  </div>
</template>

<style scoped></style>
