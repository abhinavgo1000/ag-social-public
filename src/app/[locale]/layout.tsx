/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { ChakraProvider } from '@chakra-ui/react';

export default async function LocaleLayout({
    children,
    params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
    let messages;
    try {
        messages = (await import(`@/messages/${params.locale}.json`)).default;
    } catch (error) {
        notFound();
    }

    return (
        <NextIntlClientProvider messages={messages}>
            <ChakraProvider>
                {children}
            </ChakraProvider>
        </NextIntlClientProvider>
    );
}
