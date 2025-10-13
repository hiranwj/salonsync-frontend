import { Card, Col } from 'antd'
import type { FC } from 'react';


interface LabelTypes {
    name: string,
    count: number,
}
const AdminLabels: FC<LabelTypes> = ({ name, count }) => {
    return (
        <Card hoverable style={{
            color: '#7D7D7D',
            marginBottom: '10px',
            boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
        }}>
            <div style={{
                fontWeight: 'bold'
            }}
            >
                {name}
            </div>
            <div style={{
                fontSize: '2em',
                color: '#A78BFA',
                fontWeight: 'bold'
            }}>
                {count}</div>
        </Card>
    )
}

// box - shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
// box - shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

export default AdminLabels