import { type JSX } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import type { Settings } from '@/api';
import { cn } from '@/lib/utils';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Spinner,
} from '@/ui';

import { useUpdateSettings } from '../../queries';

enum CurrencyCode {
  EUR = 'EUR',
  GBP = 'GBP',
  USD = 'USD',
}

const CURRENCY_OPTIONS = [
  { label: 'USD - US Dollar', value: CurrencyCode.USD },
  { label: 'EUR - Euro', value: CurrencyCode.EUR },
  { label: 'GBP - British Pound', value: CurrencyCode.GBP },
];

enum LocaleCode {
  DE_DE = 'de-DE',
  EL_GR = 'el-GR',
  EN_GB = 'en-GB',
  EN_US = 'en-US',
  ES_ES = 'es-ES',
  FR_FR = 'fr-FR',
}

const LOCALE_OPTIONS = [
  { label: 'English (US)', value: LocaleCode.EN_US },
  { label: 'English (GB)', value: LocaleCode.EN_GB },
  { label: 'Greek (Greece)', value: LocaleCode.EL_GR },
  { label: 'German (Germany)', value: LocaleCode.DE_DE },
  { label: 'French (France)', value: LocaleCode.FR_FR },
  { label: 'Spanish (Spain)', value: LocaleCode.ES_ES },
];

const validationSchema = z.object({
  defaultCurrency: z.nativeEnum(CurrencyCode),
  firstDayOfMonth: z
    .number()
    .min(1, { message: 'Day must be between 1 and 31' })
    .max(31, { message: 'Day must be between 1 and 31' }),
  locale: z.nativeEnum(LocaleCode),
  showDeletedMedia: z.boolean(),
});

type SettingsFormSchemaType = z.infer<typeof validationSchema>;

export const SettingsForm = ({
  settings,
}: {
  settings: Settings;
}): JSX.Element => {
  const { isPendingUpdate, updateSettings } = useUpdateSettings();

  const {
    defaultCurrency,
    firstDayOfMonth,
    locale,
    showDeletedMedia,
    updatedAt,
  } = settings;

  const {
    control,
    formState: { errors, isDirty },
    handleSubmit,
    register,
  } = useForm<SettingsFormSchemaType>({
    defaultValues: {
      defaultCurrency: defaultCurrency as CurrencyCode,
      firstDayOfMonth,
      locale: locale as LocaleCode,
      showDeletedMedia,
    },
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<SettingsFormSchemaType> = (data) => {
    updateSettings(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>
              Update your general preferences and configurations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="defaultCurrency">
                  Default Currency
                </FieldLabel>
                <Controller
                  control={control}
                  name="defaultCurrency"
                  render={({ field }) => (
                    <Select
                      disabled={isPendingUpdate}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger
                        className={cn(
                          errors.defaultCurrency && 'border-destructive',
                        )}
                        id="defaultCurrency"
                      >
                        <SelectValue placeholder="Select a currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {CURRENCY_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.defaultCurrency?.message && (
                  <FieldError>{errors.defaultCurrency.message}</FieldError>
                )}
                <p className="text-muted-foreground text-sm mt-1">
                  The default currency for your transactions and reports.
                </p>
              </Field>

              <Field>
                <FieldLabel htmlFor="firstDayOfMonth">
                  First Day of Month
                </FieldLabel>
                <Input
                  {...register('firstDayOfMonth', {
                    valueAsNumber: true,
                  })}
                  className={cn(errors.firstDayOfMonth && 'border-destructive')}
                  disabled={isPendingUpdate}
                  id="firstDayOfMonth"
                  max={31}
                  min={1}
                  type="number"
                />
                {errors.firstDayOfMonth?.message && (
                  <FieldError>{errors.firstDayOfMonth.message}</FieldError>
                )}
                <p className="text-muted-foreground text-sm mt-1">
                  Set the first day of the month for monthly reports and budgets
                  (1-31).
                </p>
              </Field>

              <Field>
                <FieldLabel htmlFor="locale">Language & Region</FieldLabel>
                <Controller
                  control={control}
                  name="locale"
                  render={({ field }) => (
                    <Select
                      disabled={isPendingUpdate}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger
                        className={cn(errors.locale && 'border-destructive')}
                        id="locale"
                      >
                        <SelectValue placeholder="Select a locale" />
                      </SelectTrigger>
                      <SelectContent>
                        {LOCALE_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.locale?.message && (
                  <FieldError>{errors.locale.message}</FieldError>
                )}
                <p className="text-muted-foreground text-sm mt-1">
                  Your preferred language and regional format for dates and
                  numbers.
                </p>
              </Field>

              <Field orientation="horizontal">
                <div className="flex items-start space-x-3">
                  <Controller
                    control={control}
                    name="showDeletedMedia"
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        disabled={isPendingUpdate}
                        id="showDeletedMedia"
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                  <div className="flex-1 space-y-1">
                    <FieldLabel
                      className="font-medium cursor-pointer"
                      htmlFor="showDeletedMedia"
                    >
                      Show Deleted Media
                    </FieldLabel>
                    <p className="text-muted-foreground text-sm">
                      Display deleted media files in your media library with a
                      visual indicator.
                    </p>
                  </div>
                </div>
              </Field>

              <div className="flex justify-end pt-4">
                {isPendingUpdate ? (
                  <Button disabled>
                    <Spinner />
                    Saving...
                  </Button>
                ) : (
                  <Button disabled={!isDirty} type="submit">
                    Save Changes
                  </Button>
                )}
              </div>
            </FieldGroup>
          </CardContent>
        </Card>
      </form>
      <p className="text-muted-foreground text-xs mt-2">
        Last updated:{' '}
        {new Date(updatedAt).toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </p>
    </>
  );
};
