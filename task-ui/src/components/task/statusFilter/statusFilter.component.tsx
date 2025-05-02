import { TaskStatusOptions } from "@/models";
import { MenuItem, Select } from "@mui/material";
import styles from './styles.module.css';

interface StatusFilterProps {
    setStatus: React.Dispatch<React.SetStateAction<string>>,
    status: string
}

export const StatusFilter: React.FC<StatusFilterProps> = ({ setStatus, status }) => {

    return (
        <div className={styles.container}>
            <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                size="small"
                displayEmpty
                style={{ minWidth: 180 }}
            >
                <MenuItem value="">Todos los estados</MenuItem>
                {TaskStatusOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </div>
    );
};
