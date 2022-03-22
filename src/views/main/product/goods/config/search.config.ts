import { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  labelWidth: '120px',
  itemStyle: {
    padding: '5px 30px'
  },
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '商品名称',
      placeholder: '请输入商品名称'
    },
    {
      field: 'address',
      type: 'input',
      label: '商品地址',
      placeholder: '请输入商品地址'
    },
    {
      field: 'status',
      type: 'select',
      label: '状态',
      placeholder: '请输入状态',
      options: [
        { title: '禁用', value: 0 },
        { title: '启用', value: 1 }
      ]
    },
    {
      field: 'createAt',
      type: 'datepicker',
      label: '创建时间',
      otherOptions: {
        type: 'daterange',
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间'
      }
    }
  ]
}
