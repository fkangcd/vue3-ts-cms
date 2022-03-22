export const contentTabelConfig = {
  title: '商品列表',
  propList: [
    { prop: 'name', label: '商品名称', minWidth: '100' },
    { prop: 'oldPrice', label: '原价格', minWidth: '80', slotName: 'oldPrice' },
    { prop: 'newPrice', label: '现价格', minWidth: '80' },
    { prop: 'desc', label: '商品描述', minWidth: '80' },
    { prop: 'status', label: '状态', minWidth: '50', slotName: 'status' },
    { prop: 'imgUrl', label: '图片', minWidth: '100', slotName: 'image' },
    { prop: 'inventoryCount', label: '库存', minWidth: '80' },
    { prop: 'saleCount', label: '销量', minWidth: '80' },
    { prop: 'favorCount', label: '收藏', minWidth: '80' },
    { prop: 'address', label: '地址', minWidth: '80' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '100',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '100',
      slotName: 'updateAt'
    },
    { label: '操作', width: '120', slotName: 'handler' }
  ],

  showIndexColumn: true,
  showSelectColumn: true
}
