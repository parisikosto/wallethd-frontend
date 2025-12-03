import type { JSX } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { ChevronLeft } from 'lucide-react';

import { Button, Card, Field, FieldError, FieldLabel } from '@/ui';
import { cn } from '@/utils';

import { useCategories } from '../../../../../categories';
import type { TransactionFormSchema } from '../../CreateTransactionForm';
import { FormFieldKey } from '../../interfaces';

import { useCategoryField } from './useCategoryField';
import { getCategoryColors, getCategoryIcon } from './utils';

export const CategoryField = (): JSX.Element => {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext<TransactionFormSchema>();

  const type = watch(FormFieldKey.Type);
  const selectedCategoryId = watch(FormFieldKey.Category);

  const {
    categories = [],
    isErrorCategories,
    isFetchingCategories,
    refetchCategories,
  } = useCategories();

  const {
    childCategories,
    childrenOfExpandedParent,
    expandedParentId,
    handleBackClick,
    handleChildClick,
    handleParentSelect,
    parentCategories,
  } = useCategoryField({ categories, type, selectedCategoryId });

  if (isFetchingCategories) {
    return (
      <Field>
        <FieldLabel htmlFor={FormFieldKey.Category}>Category *</FieldLabel>
        <div className="text-sm text-muted-foreground">
          Loading categories...
        </div>
      </Field>
    );
  }

  if (isErrorCategories) {
    return (
      <Field>
        <FieldLabel htmlFor={FormFieldKey.Category}>Category *</FieldLabel>
        <FieldError>
          Failed to fetch categories{' '}
          <Button onClick={() => refetchCategories()} type="button">
            Retry
          </Button>
        </FieldError>
      </Field>
    );
  }

  if (parentCategories.length === 0) {
    return (
      <Field>
        <FieldLabel htmlFor={FormFieldKey.Category}>Category *</FieldLabel>
        <div className="text-sm text-muted-foreground">
          No categories available for this transaction type.
        </div>
      </Field>
    );
  }

  return (
    <Field>
      <FieldLabel htmlFor={FormFieldKey.Category}>Category *</FieldLabel>
      <Controller
        control={control}
        name={FormFieldKey.Category}
        render={() => {
          const expandedParent = expandedParentId
            ? parentCategories.find((p) => p._id === expandedParentId)
            : null;

          if (expandedParentId && expandedParent) {
            return (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                  <Card
                    className={cn(
                      'cursor-pointer transition-all hover:shadow-md py-1 border',
                      'ring-2 ring-primary bg-primary/5',
                      expandedParent &&
                        getCategoryColors(expandedParent.slug).borderColor,
                    )}
                    onClick={handleBackClick}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleBackClick();
                      }
                    }}
                  >
                    <div className="px-2 py-1">
                      <div className="flex items-center gap-1.5 text-sm font-medium leading-tight text-primary">
                        <ChevronLeft className="size-4 shrink-0" />
                        {(() => {
                          const CategoryIcon = getCategoryIcon(
                            expandedParent.slug,
                          );
                          const colors = getCategoryColors(
                            expandedParent.slug,
                            expandedParent.order,
                          );
                          return (
                            <CategoryIcon
                              className={cn(
                                'size-4 shrink-0',
                                colors.iconColor,
                              )}
                            />
                          );
                        })()}
                        <span className="flex-1 text-center">
                          {expandedParent.name}
                        </span>
                      </div>
                    </div>
                  </Card>
                </div>

                {childrenOfExpandedParent.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-xs font-medium text-muted-foreground">
                      Select a subcategory:
                    </div>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                      {childrenOfExpandedParent.map((child) => {
                        const isSelected = selectedCategoryId === child._id;
                        const Icon = getCategoryIcon(child.slug);
                        const colors = getCategoryColors(
                          child.slug,
                          child.order,
                        );

                        return (
                          <Card
                            key={child._id}
                            className={cn(
                              'cursor-pointer transition-all hover:shadow-md py-1',
                              isSelected && 'ring-2 ring-primary bg-primary/5',
                            )}
                            onClick={() => handleChildClick(child._id)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleChildClick(child._id);
                              }
                            }}
                          >
                            <div className="px-2 py-1 text-center">
                              <div className="flex flex-col items-center gap-1">
                                <Icon
                                  className={cn(
                                    'size-4',
                                    isSelected
                                      ? 'text-primary'
                                      : colors.iconColor,
                                  )}
                                />
                                <div
                                  className={cn(
                                    'text-sm font-medium leading-tight',
                                    isSelected && 'text-primary',
                                  )}
                                >
                                  {child.name}
                                </div>
                              </div>
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          }

          return (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              {parentCategories.map((parent) => {
                const isSelected = selectedCategoryId === parent._id;
                const hasChildren = childCategories.some(
                  (cat) => cat.parent?._id === parent._id,
                );
                const Icon = getCategoryIcon(parent.slug);
                const colors = getCategoryColors(parent.slug, parent.order);

                return (
                  <Card
                    key={parent._id}
                    className={cn(
                      'cursor-pointer transition-all hover:shadow-md py-1 border',
                      colors.bgColor,
                      colors.borderColor,
                      isSelected && !hasChildren && 'ring-2 ring-primary',
                      isSelected && !hasChildren && 'bg-primary/5',
                    )}
                    onClick={() => handleParentSelect(parent._id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleParentSelect(parent._id);
                      }
                    }}
                  >
                    <div className="px-2 py-1 text-center">
                      <div
                        className={cn(
                          'flex flex-col items-center gap-1',
                          !hasChildren && 'justify-center min-h-[3rem]',
                        )}
                      >
                        <Icon
                          className={cn(
                            'size-4',
                            isSelected && !hasChildren
                              ? 'text-primary'
                              : colors.iconColor,
                          )}
                        />
                        <div
                          className={cn(
                            'text-sm font-medium leading-tight',
                            isSelected && !hasChildren && 'text-primary',
                          )}
                        >
                          {parent.name}
                        </div>
                        {hasChildren && (
                          <div className="mt-0.5 text-[10px] text-muted-foreground leading-tight">
                            {
                              childCategories.filter(
                                (cat) => cat.parent?._id === parent._id,
                              ).length
                            }{' '}
                            subcategories
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          );
        }}
      />
      {errors[FormFieldKey.Category]?.message && (
        <FieldError>{errors[FormFieldKey.Category].message}</FieldError>
      )}
    </Field>
  );
};
