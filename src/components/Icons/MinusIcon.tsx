import { useMantineTheme } from '@mantine/core';

interface IconProps {
    size?: number;
    color?: string;
}

export const MinusIcon: React.FC<IconProps> = ({
                                                   size = 12,
                                                   color
                                               }) => {
    const theme = useMantineTheme();
    const iconColor = color || theme.colors.gray[10];

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 12 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path fill={iconColor} d="M0 2V0h12v2z" />
        </svg>
    );
};