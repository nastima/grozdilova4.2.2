import { useMantineTheme } from '@mantine/core';

interface IconProps {
    size?: number;
    color?: string;
}

export const PlusIcon: React.FC<IconProps> = ({
                                                  size = 12,
                                                  color
                                              }) => {
    const theme = useMantineTheme();
    const iconColor = color || theme.colors.gray[10];

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path fill={iconColor} d="M7 0H5v5H0v2h5v5h2V7h5V5H7z" />
        </svg>
    );
};