// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';

// icons
const icons = {
    ChromeOutlined,
    QuestionOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const support = {
    id: 'support',
    title: 'Support',
    type: 'group',
    children: [
        {
            id: 'reports',
            title: 'Report',
            type: 'item',
            url: '/reports',
            icon: icons.ChromeOutlined
        },
        {
            id: 'documentation',
            title: 'Documentation',
            type: 'item',
            url: 'http://localhost:4000/docs',
            icon: icons.QuestionOutlined,
            external: true,
            target: true
        }
    ]
};

export default support;
