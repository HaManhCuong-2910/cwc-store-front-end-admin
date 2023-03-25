import {
  MailOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  PartitionOutlined,
  UsergroupAddOutlined,
  UserOutlined
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
  },
  {
    path: '/manage-product',
    name: 'Quản lý sản phẩm',
    icon: ShoppingOutlined,
    child: null
  },
  {
    path: '/manage-news',
    name: 'Quản lý tin tức',
    icon: UsergroupAddOutlined,
    child: null
  },
  {
    path: '/manage-category',
    name: 'Quản lý danh mục',
    icon: PartitionOutlined,
    child: null
  },
  {
    path: '/manage-account',
    name: 'Quản lý tài khoản',
    icon: UserOutlined,
    child: null
  }
]
