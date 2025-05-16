'use client';

import * as React from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
    Box, Button, Checkbox, Field, Fieldset, Input, Link, Stack, Text
} from '@chakra-ui/react';
import { useTranslations } from 'next-intl';

function SignInPage() {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [rememberMe, setRememberMe] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const [emailError, setEmailError] = React.useState<string | null>(null);
    const [passwordError, setPasswordError] = React.useState<string | null>(null);

    const router = useRouter();
    const params = useSearchParams();

    const t = useTranslations();

    const handleSubmit = async (e: React.FormEvent) => {
        if (isSubmitting) return; // Prevent multiple submissions

        setIsSubmitting(true);
        setEmailError(null); // Reset error state
        setPasswordError(null); // Reset error state
        e.preventDefault();
        const res = await signIn('credentials', {
            email,
            password,
            redirect: false,
            callbackUrl: params.get('callbackUrl') || '/dashboard',
        });
        if (res?.error) {
            if (email === '') {
                setEmailError(t('errors.validation.required', { field: t('forms.login.email') }));
            }
            if (password === '') {
                setPasswordError(t('errors.validation.required', { field: t('forms.login.password') }));
            }
            return;
        } else if (res?.ok) {
            router.push(res.url || '/dashboard');
        }
    };

    return (
        <React.Fragment>
            <Box width='100%' alignItems='start' maxWidth='400px' mt='40px'>
                <Fieldset.Root size='lg' maxW='md'>
                    <Stack>
                        <Fieldset.Legend>{t('forms.login.loginTitle')}</Fieldset.Legend>
                        <Fieldset.HelperText>
                            {t('forms.login.loginDescription')}
                        </Fieldset.HelperText>
                    </Stack>
                    <Fieldset.Content>
                        <Field.Root required invalid={!!emailError}>
                            <Field.Label>{t('forms.login.email')}</Field.Label>
                            <Input 
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t('forms.login.emailPlaceholder')} />
                            {emailError && (<Field.ErrorText>{emailError}</Field.ErrorText>)}
                        </Field.Root>
                        <Field.Root required invalid={!!passwordError}>
                            <Field.Label>{t('forms.login.password')}</Field.Label>
                            <Input 
                                type='password'
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={t('forms.login.passwordPlaceholder')} />
                            {passwordError && (<Field.ErrorText>{passwordError}</Field.ErrorText>)}
                        </Field.Root>
                    </Fieldset.Content>
                    <Checkbox.Root 
                        variant='subtle'
                        checked={rememberMe} 
                        onCheckedChange={(e) => setRememberMe(!!e.checked)}
                    >
                        <Checkbox.HiddenInput />
                        <Checkbox.Control />
                        <Checkbox.Label>{t('forms.login.rememberMe')}</Checkbox.Label>
                    </Checkbox.Root>
                    <Button type='submit' onClick={handleSubmit}>{t('forms.login.submit')}</Button>
                    <Button variant='outline' onClick={() => signIn('google')}>{t('forms.login.googleSignIn')}</Button>
                    <Button variant='outline' onClick={() => signIn('github')}>{t('forms.login.facebookSignIn')}</Button>
                    <Link href='/reset-password'>{t('forms.login.forgotPassword')}</Link>
                    <Text>
                        {t('forms.login.createAccount')} <Link href='/register'>{t('forms.login.register')}</Link>
                    </Text>
                </Fieldset.Root>
            </Box>
        </React.Fragment>
    );
}

export default SignInPage;
