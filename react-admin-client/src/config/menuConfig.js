import React from 'react'
import {
	HomeOutlined,
	SafetyOutlined,
	UserOutlined,
	ToolOutlined,
    AppstoreOutlined,
    BarsOutlined,
    PieChartOutlined,
	AreaChartOutlined,
	LineChartOutlined,
  } from '@ant-design/icons';
 const menuList = [
	{
		title: '首頁',
		key: '/home',
		icon: <HomeOutlined/>,
		isPublic: true,
	},
	{
		title: '商品',
		key: '/products',
		icon: <AppstoreOutlined/>,
		children: [
			{
				title: '品類管理',
				key: '/category',
				icon: <ToolOutlined/>,
			},
			{
				title: '商品管理',
				key: '/product',
				icon: <ToolOutlined/>,
			},
		],
	},
	{
		title: '用戶管理',
		key: '/user',
		icon: <UserOutlined/>,
	},
	{
		title: '角色管理',
		key: '/role',
		icon: <SafetyOutlined/>,
	},
	{
		title: '圖形圖表',
		key: '/charts',
		icon: <AreaChartOutlined/>,
		children: [
			{
				title: '柱狀圖',
				key: '/bar',
				icon: <BarsOutlined/>,
			},
			{
				title: '折線圖',
				key: '/line',
				icon: <LineChartOutlined/>,
			},
			{
				title: '圓餅圖',
				key: '/pie',
				icon: <PieChartOutlined/>,
			},
		],
	},
];
export default menuList