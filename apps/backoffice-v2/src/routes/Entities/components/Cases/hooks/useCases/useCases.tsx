import { useDocumentListener } from '../../../../../../common/hooks/useDocumentListener/useDocumentListener';
import { useCallback, useRef } from 'react';
import { useUsersQuery } from '../../../../../../domains/users/hooks/queries/useUsersQuery/useUsersQuery';
import { useFilterEntity } from '../../../../../../domains/entities/hooks/useFilterEntity/useFilterEntity';
import { z } from 'zod';
import { useZodSearchParams } from '../../../../../../common/hooks/useZodSearchParams/useZodSearchParams';

export const useCases = () => {
  const [{ filter, sortBy }] = useZodSearchParams(
    z.object({
      filter: z.string().catch(''),
      sortBy: z.string().catch(''),
    }),
  );
  const entity = useFilterEntity();
  const sharedSortByOptions = [
    {
      label: 'Created At',
      value: 'caseCreatedAt',
    },
  ];
  const individualsSortByOptions = [
    ...sharedSortByOptions,
    {
      label: 'First Name',
      value: 'firstName',
    },
    {
      label: 'Last Name',
      value: 'lastName',
    },
    {
      label: 'Email',
      value: 'email',
    },
  ] as const;
  const { data: users } = useUsersQuery();
  const businessesSortByOptions = [
    ...sharedSortByOptions,
    {
      label: 'Business Name',
      value: 'companyName',
    },
  ];
  const sortByOptions =
    entity === 'individuals' ? individualsSortByOptions : businessesSortByOptions;
  const filterByOptions = [
    {
      label: 'Case Status',
      value: 'caseStatus',
      options: [
        {
          label: 'Active',
          value: 'active',
        },
        {
          label: 'Completed',
          value: 'completed',
        },
        {
          label: 'Failed',
          value: 'failed',
        },
      ],
    },
    {
      label: 'Assignee',
      value: 'assigneeId',
      options: [
        ...users.map(({ id, fullName }) => ({
          label: fullName,
          value: id,
          key: id,
        })),
        {
          label: 'Unassigned',
          value: null,
        },
      ],
    },
  ] as const;
  const searchRef = useRef<HTMLInputElement>();
  const sortRef = useRef<HTMLButtonElement>();
  const filterRef = useRef<HTMLButtonElement>();
  const handleDropdown = useCallback(e => {
    const dropdown = e.target.closest('.dropdown');

    if (dropdown.classList.contains('dropdown-hover')) return;

    dropdown.classList.add('dropdown-hover');
    dropdown.classList.remove('dropdown-open');
  }, []);

  useDocumentListener('keydown', event => {
    if (!event.ctrlKey) return;

    event.preventDefault();

    switch (event.key) {
      case 'k':
        if (!searchRef.current) break;

        searchRef.current.focus();
        break;
      case 's':
        if (!sortRef.current) break;

        sortRef.current.focus();
      case 'f':
        if (!filterRef.current) break;

        const dropdown = filterRef.current.closest('.dropdown');

        dropdown.classList.toggle('dropdown-open');
        dropdown.classList.toggle('dropdown-hover');

        if (!dropdown.classList.contains('dropdown-hover')) {
          filterRef.current.click();
        }

        break;
    }
  });

  return {
    entity,
    sortByOptions,
    filterByOptions,
    filter,
    sortBy,
    searchRef,
    sortRef,
    filterRef,
    handleDropdown,
  };
};