import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import type { Category } from '@/api';

import { FormFieldKey } from '../../constants';
import type { TransactionFormSchema } from '../../TransactionForm';

const getExpandedParentFromSelection = (
  selectedCategoryId: string,
  filteredCategories: Category[],
  childCategories: Category[],
): string | null => {
  if (!selectedCategoryId || filteredCategories.length === 0) {
    return null;
  }

  const selected = filteredCategories.find(
    (cat) => cat._id === selectedCategoryId,
  );

  if (!selected) {
    return null;
  }

  if (selected.parent?._id) {
    return selected.parent._id;
  }

  const hasChildren = childCategories.some(
    (cat) => cat.parent?._id === selected._id,
  );

  return hasChildren ? selected._id : null;
};

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
  isCategorySelectable: (category: Category) => boolean;
  parentCategories: Category[];
} => {
  const { setValue } = useFormContext<TransactionFormSchema>();

  const filteredCategories = categories.filter(
    ({ transactionType }) => transactionType === type,
  );

  const archivedCategoryIds = new Set(
    categories.filter((cat) => cat.isArchived === true).map((cat) => cat._id),
  );

  const isCategorySelectable = (category: Category): boolean => {
    if (category.isArchived === true) {
      return false;
    }

    if (category.parent?._id) {
      return !archivedCategoryIds.has(category.parent._id);
    }
    return true;
  };

  const parentCategories = filteredCategories
    .filter((category) => category.parent === null)
    .sort((a, b) => a.order - b.order);

  const childCategories = filteredCategories
    .filter((category) => category.parent !== null)
    .sort((a, b) => a.order - b.order);

  const [browsingParentId, setBrowsingParentId] = useState<string | null>(null);

  const expandedParentIdFromSelection = getExpandedParentFromSelection(
    selectedCategoryId,
    filteredCategories,
    childCategories,
  );

  const validBrowsingParentId =
    browsingParentId &&
    parentCategories.some((parent) => parent._id === browsingParentId)
      ? browsingParentId
      : null;

  const expandedParentId = selectedCategoryId
    ? expandedParentIdFromSelection
    : validBrowsingParentId;

  const childrenOfExpandedParent = childCategories.filter(
    (category) => category.parent?._id === expandedParentId,
  );

  const handleBackClick = (): void => {
    setBrowsingParentId(null);
    setValue(FormFieldKey.Category, '');
  };

  const handleChildClick = (childId: string): void => {
    const child = childCategories.find((cat) => cat._id === childId);
    if (child && isCategorySelectable(child)) {
      setValue(FormFieldKey.Category, childId);
    }
  };

  const handleParentSelect = (parentId: string): void => {
    const parent = parentCategories.find((cat) => cat._id === parentId);
    if (!parent || !isCategorySelectable(parent)) {
      return;
    }

    const hasChildren = childCategories.some(
      (cat) => cat.parent?._id === parentId,
    );

    if (!hasChildren) {
      setValue(FormFieldKey.Category, parentId);
      setBrowsingParentId(null);
    } else {
      setBrowsingParentId(parentId);
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
    isCategorySelectable,
    parentCategories,
  };
};
