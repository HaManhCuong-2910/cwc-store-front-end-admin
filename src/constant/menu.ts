import {
  MailOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined
} from '@ant-design/icons-vue'
export const menuCWC = [
  {
    path: '/',
    name: 'Trang chủ',
    icon: HomeOutlined,
    child: null
  },
  {
    path: '/manage-order',
    name: 'Quản lý đơn hàng',
    icon: ShoppingCartOutlined,
    child: [
      {
        path: `/manage-order/list-order`,
        name: 'Danh sách đơn hàng'
      },
      {
        path: `/manage-order/list-cancel-order`,
        name: 'Đơn hàng đã hủy'
      }
    ]
  }
]
