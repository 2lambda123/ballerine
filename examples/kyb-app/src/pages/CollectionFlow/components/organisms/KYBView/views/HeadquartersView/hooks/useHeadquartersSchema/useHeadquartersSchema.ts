import { getCountryStates } from '@app/pages/CollectionFlow/components/organisms/KYBView/helpers/get-countries-list';
import { headquartersSchema } from '@app/pages/CollectionFlow/components/organisms/KYBView/views/HeadquartersView/headquarters.schema';
import { HeadquartersContext } from '@app/pages/CollectionFlow/components/organisms/KYBView/views/HeadquartersView/types';
import { AnyObject } from '@ballerine/ui';
import { useMemo } from 'react';

export const useHeadquartersSchema = (
  formData: HeadquartersContext,
  schema = headquartersSchema,
) => {
  const processedSchema = useMemo(() => {
    const countryStates = getCountryStates(formData.country);

    return {
      ...schema,
      required: countryStates.length ? [...schema.required, 'state'] : schema.required,
      properties: {
        ...schema.properties,
        state: {
          ...(schema.properties.state as AnyObject),
          ...(countryStates.length
            ? {
                oneOf: countryStates.map(state => ({
                  const: state.isoCode,
                  title: state.name,
                })),
              }
            : undefined),
        },
      },
    };
  }, [schema, formData.country]);

  return {
    schema: processedSchema,
  };
};
