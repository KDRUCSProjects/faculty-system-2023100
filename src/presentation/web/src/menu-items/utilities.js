// assets
import {
    AppstoreAddOutlined,
    AntDesignOutlined,
    BarcodeOutlined,
    BgColorsOutlined,
    FontSizeOutlined,
    LoadingOutlined
} from '@ant-design/icons';

// icons
const icons = {
    FontSizeOutlined,
    BgColorsOutlined,
    BarcodeOutlined,
    AntDesignOutlined,
    LoadingOutlined,
    AppstoreAddOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
    id: 'utilities',
    title: 'Utilities',
    type: 'group',
    children: [
        {
            id: 'teachers',
            title: 'Teachers',
            type: 'item',
            url: '/teachers',
            icon: icons.FontSizeOutlined
        },
        {
            id: 'students',
            title: 'Students',
            type: 'item',
            url: '/students',
            icon: icons.BgColorsOutlined
        },
        {
            id: 'semesters',
            title: 'Semesters',
            type: 'item',
            url: '/semesters',
            icon: icons.BarcodeOutlined
        }
    ]
};

export default utilities;
