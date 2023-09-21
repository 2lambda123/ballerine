const availableOnButtonRule = {
  and: [
    {
      var: 'entity.data.additionalInfo.mainRepresentative.phone',
    },
    {
      match: [
        {
          var: 'entity.data.additionalInfo.mainRepresentative.phone',
        },
        '^[+]?[0-9]{10,15}$',
      ],
    },
    {
      match: [
        {
          var: 'entity.data.additionalInfo.mainRepresentative.dateOfBirth',
        },
        '^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\\d{4})$',
      ],
    },
    {
      '>': [
        {
          length: [
            {
              var: 'entity.data.additionalInfo.mainRepresentative.additionalInfo.jobTitle',
            },
          ],
        },
        2,
      ],
    },
    {
      '>': [
        {
          length: [
            {
              var: 'entity.data.additionalInfo.mainRepresentative.firstName',
            },
          ],
        },
        1,
      ],
    },
    {
      '>': [
        {
          length: [
            {
              var: 'entity.data.additionalInfo.mainRepresentative.lastName',
            },
          ],
        },
        1,
      ],
    },
  ],
};

export const personalInfoPage = {
  type: 'page',
  number: 1,
  stateName: 'personal_details',
  name: 'Personal details',
  elements: [
    {
      type: 'case',
      elements: [
        {
          type: 'cell',
          uiElements: {
            elementClass: ['inline'],
          },
          elements: [
            {
              name: 'page-stepper',
              type: 'page-stepper',
              uiElements: {
                elementClass: ['inline'],
              },
            },
            {
              name: 'save-popup',
              type: 'save-popup',
            },
          ],
        },
        {
          type: 'cell',
          elements: [
            {
              type: 'h1',
              value: 'Personal information',
            },
          ],
        },
        {
          type: 'cell',
          elements: [
            {
              type: 'input-text',
              valueDestination: 'entity.data.additionalInfo.mainRepresentative.firstName',
              option: {
                label: 'Name',
                hint: 'First Name',
              },
            },
            {
              type: 'input-text',
              valueDestination: 'entity.data.additionalInfo.mainRepresentative.lastName',
              option: {
                hint: 'Last Name',
              },
            },
            {
              type: 'input-text',
              valueDestination:
                'entity.data.additionalInfo.mainRepresentative.additionalInfo.jobTitle',
              option: {
                label: 'Title',
                hint: 'CEO / Manager / Partner',
              },
            },
            {
              type: 'date',
              valueDestination: 'entity.data.additionalInfo.mainRepresentative.dateOfBirth',
              option: {
                label: 'Date of Birth',
                hint: 'DD/MM/YYYY',
              },
            },
            {
              type: 'international-phone-number',
              valueDestination: 'entity.data.additionalInfo.mainRepresentative.phone',
              option: {
                label: 'Phone number',
              },
            },
            {
              id: 'next-page-button',
              type: 'button',
              uiDefinition: {
                classNames: ['align-right', 'padding-top-10'],
              },
              availableOn: [
                {
                  type: 'json-logic',
                  value: availableOnButtonRule,
                },
              ],
              option: {
                text: 'Continue',
              },
            },
          ],
        },
      ],
    },
  ],
  actions: [
    {
      type: 'definitionPlugin',
      pluginName: 'update_end_user',
      dispatchOn: {
        uiEvents: [{ event: 'onClick', uiElementName: 'next-page-button' }],
        rules: [
          {
            type: 'json-logic',
            value: availableOnButtonRule,
          },
        ],
      },
    },
    {
      type: 'definitionEvent',
      event: 'next',
      dispatchOn: {
        uiEvents: [{ event: 'onClick', uiElementName: 'next-page-button' }],
        rules: [
          {
            type: 'json-logic',
            value: availableOnButtonRule,
          },
        ],
      },
    },
  ],
};
