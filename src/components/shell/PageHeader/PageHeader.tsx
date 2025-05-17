'use client';

import * as React from 'react';
import { 
    Box, 
    Button,
    CloseButton, 
    Drawer, 
    IconButton, 
    Portal, 
    useBreakpointValue,
    VStack 
} from '@chakra-ui/react';
import { HiMenu } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { useTranslations } from 'next-intl';
import { redirect } from 'next/navigation';
import { RootState } from '../../../store/store';
import { ColorModeButton } from '@/components/ui/color-mode';
import Logo from './Logo';

function PageHeader(props: { params: Promise<{ locale: string }> }) {

    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    const params = await props.params;

    const { t, i18n } = useTranslations();
    const isMobile = useBreakpointValue({ base: true, md: false });


    const handleMenuToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleMenuItemClick = (path: string) => {
        setDrawerOpen(false);
        redirect(`/${params.locale}/${path}`);
    };

    const toggleLanguage = () => {
        const newLanguage = i18n.language === 'en' ? 'es' : 'en';
        i18n.changeLanguage(newLanguage);
    };

    return (
        <React.Fragment>
            <Drawer.Root open={drawerOpen} placement='start' onOpenChange={handleMenuToggle}>
                <Box
                    p='4'
                    borderWidth='1px'
                    borderColor='border.200'
                    color='text.primary'
                    bg='background.paper'
                >
                    <Box display='flex' justifyContent='space-between' alignItems='center'>
                        <Drawer.Trigger asChild>
                            <IconButton
                                aria-label={t('menu.toggle')}
                                variant='ghost'
                                display={(isAuthenticated && isMobile) ? 'block' : 'none'}
                                size='lg'
                            >
                                <HiMenu />
                            </IconButton>
                        </Drawer.Trigger>
                        <Box fontSize='2xl' fontWeight='bold'><Logo /></Box>
                        <Box display="flex" alignItems="center" gap="2">
                            <ColorModeButton />
                            <Button size="sm" variant="ghost" onClick={toggleLanguage}>
                                {i18n.language === 'en' ? 'ES' : 'EN'}
                            </Button>
                        </Box>
                    </Box>
                </Box>
                <Portal>
                    <Drawer.Backdrop />
                    <Drawer.Positioner>
                        <Drawer.Content>
                            <Drawer.Header>
                                <Drawer.Title>{t('greeting')}</Drawer.Title>
                            </Drawer.Header>
                            <Drawer.Body>
                                {/* Navigation Menu Items */}
                                <VStack align='start' gap={4}>
                                    <Button variant='ghost' onClick={() => handleMenuItemClick('/home')}>
                                        {t('menu.home')}
                                    </Button>
                                    <Button variant='ghost' onClick={() => handleMenuItemClick('/profile')}>
                                        {t('menu.profile')}
                                    </Button>
                                    <Button variant='ghost' onClick={() => handleMenuItemClick('/for-you')}>
                                        {t('menu.forYou')}
                                    </Button>
                                    <Button variant='ghost' onClick={() => handleMenuItemClick('/settings')}>
                                        {t('menu.settings')}
                                    </Button>
                                    <Button variant='ghost' onClick={() => handleMenuItemClick('/logout')}>
                                        {t('menu.logout')}
                                    </Button>
                                </VStack>
                            </Drawer.Body>
                            <Drawer.Footer>
                                <Button variant='outline'>Cancel</Button>
                                <Button>Save</Button>
                            </Drawer.Footer>
                            <Drawer.CloseTrigger asChild>
                                <CloseButton size='sm' />
                            </Drawer.CloseTrigger>
                        </Drawer.Content>
                    </Drawer.Positioner>
                </Portal>
            </Drawer.Root>
        </React.Fragment>
    );
}

export default PageHeader;
