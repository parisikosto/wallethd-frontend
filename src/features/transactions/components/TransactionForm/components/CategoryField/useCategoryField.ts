import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import type { Category } from '@/api';

import { FormFieldKey } from '../../interfaces';
import type { TransactionFormSchema } from '../../TransactionForm';

export const useCategoryField = ({
  categories,
  selectedCategoryId,
  type,
}: {
  categories: Category[];
  selectedCategoryId: string;
  type: string;
}): {
  childCategories: Category[];
  childrenOfExpandedParent: Category[];
  expandedParentId: string | null;
  handleBackClick: () => void;
  handleChildClick: (childId: string) => void;
  handleParentSelect: (parentId: string) => void;
  parentCategories: Category[];
} => {
  const { setValue } = useFormContext<TransactionFormSchema>();

  const filteredCategories = categories.filter(
    ({ transactionType }) => transactionType === type,
  );

  const parentCategories = filteredCategories
    .filter((category) => category.parent === null)
    .sort((a, b) => a.order - b.order);

  const childCategories = filteredCategories
    .filter((category) => category.parent !== null)
    .sort((a, b) => a.order - b.order);

  const selectedCategory = filteredCategories.find(
    (cat) => cat._id === selectedCategoryId,
  );
  const selectedParentId = selectedCategory?.parent?._id || selectedCategoryId;

  const [expandedParentId, setExpandedParentId] = useState<string | null>(
    selectedParentId || null,
  );

  useEffect(() => {
    if (selectedCategory) {
      const parentId = selectedCategory.parent?._id || selectedCategory._id;
      setExpandedParentId(parentId);
    }
  }, [selectedCategoryId, selectedCategory]);

  const childrenOfExpandedParent = childCategories.filter(
    (category) => category.parent?._id === expandedParentId,
  );

  const handleBackClick = (): void => {
    setExpandedParentId(null);
    setValue(FormFieldKey.Category, '');
  };

  const handleChildClick = (childId: string): void => {
    setValue(FormFieldKey.Category, childId);
  };

  const handleParentSelect = (parentId: string): void => {
    const hasChildren = childCategories.some(
      (cat) => cat.parent?._id === parentId,
    );

    if (!hasChildren) {
      setValue(FormFieldKey.Category, parentId);
      setExpandedParentId(null);
    } else {
      setExpandedParentId(parentId);
      setValue(FormFieldKey.Category, '');
    }
  };

  return {
    childCategories,
    childrenOfExpandedParent,
    expandedParentId,
    handleBackClick,
    handleChildClick,
    handleParentSelect,
    parentCategories,
  };
};
