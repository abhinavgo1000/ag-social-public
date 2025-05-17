import React from 'react';
import { Box, Text } from '@chakra-ui/react';

function Logo(props: React.ComponentProps<typeof Box>) {
    return (
        <Box {...props}>
            <Text fontSize='lg' fontWeight='bold'>
                Logo
            </Text>
        </Box>
    )
}

export default Logo;
