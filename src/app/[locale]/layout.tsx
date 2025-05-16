import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { StyleProvider } from '@/components/ui/provider';
 
export default async function LocaleLayout(
    props: {
            children: React.ReactNode;
            params: Promise<{ locale: string }>;
        }
) {
    const params = await props.params;

    const {
        children
    } = props;

    // Ensure that the incoming `locale` is valid
    const locale = params.locale;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    return (
        <NextIntlClientProvider locale={locale}>
            <StyleProvider>
                {children}
            </StyleProvider>
        </NextIntlClientProvider>
    );
}
