export const defaultContextSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    entity: {
      type: 'object',
      properties: {
        type: {
          enum: ['individual', 'business'],
        },
        data: {
          type: 'object',
          properties: {
            additionalInfo: {
              type: 'object',
            },
          },
          additionalProperties: true,
        },
        ballerineEntityId: {
          type: 'string',
        },
        id: {
          type: 'string',
        },
      },
      required: ['type'],
      anyOf: [
        {
          required: ['id'],
        },
        {
          required: ['ballerineEntityId'],
        },
      ],
      additionalProperties: false,
    },
    documents: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          category: {
            type: 'string',
            transform: ['trim', 'toLowerCase'],
          },
          type: {
            type: 'string',
            transform: ['trim', 'toLowerCase'],
          },
          issuer: {
            type: 'object',
            properties: {
              type: {
                type: 'string',
              },
              name: {
                type: 'string',
              },
              country: {
                type: 'string',
                transform: ['trim', 'toUpperCase'],
              },
              city: {
                type: 'string',
              },
              additionalInfo: {
                type: 'object',
              },
            },
            required: ['country'],
            additionalProperties: false,
          },
          issuingVersion: {
            type: 'integer',
          },
          decision: {
            type: 'object',
            properties: {
              status: {
                type: 'string',
                enum: ['new', 'pending', 'revision', 'approved', 'rejected'],
              },
              rejectionReason: {
                anyOf: [
                  {
                    type: 'string',
                  },
                  {
                    type: 'string',
                    enum: [
                      'Suspicious document',
                      'Document does not match customer profile',
                      'Potential identity theft',
                      'Fake or altered document',
                      'Document on watchlist or blacklist',
                    ],
                  },
                ],
              },
              revisionReason: {
                anyOf: [
                  {
                    type: 'string',
                  },
                  {
                    type: 'string',
                    enum: [
                      'Wrong document',
                      'Fake document',
                      'Spam',
                      'Ownership mismatch - Name',
                      'Ownership mismatch - National ID',
                      'Unknown document type',
                      'Bad image quality',
                      'Missing page',
                      'Invalid document',
                      'Expired document',
                      'Unreadable document',
                      'Blurry image',
                      'Other',
                    ],
                  },
                ],
              },
            },
            additionalProperties: false,
          },
          version: {
            type: 'integer',
          },
          pages: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                ballerineFileId: {
                  type: 'string',
                },
                provider: {
                  type: 'string',
                  enum: ['gcs', 'http', 'stream', 'base64', 'ftp'],
                },
                uri: {
                  type: 'string',
                  format: 'uri',
                },
                type: {
                  enum: ['pdf', 'png', 'jpg'],
                },
                data: {
                  type: 'string',
                },
                metadata: {
                  type: 'object',
                  properties: {
                    side: {
                      type: 'string',
                    },
                    pageNumber: {
                      type: 'string',
                    },
                  },
                  additionalProperties: false,
                },
              },
              required: ['provider', 'uri', 'type'],
              additionalProperties: false,
            },
          },
          properties: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
                format: 'email',
              },
              expiryDate: {
                type: 'string',
                format: 'date',
              },
              idNumber: {
                type: 'string',
                format: 'regex',
              },
            },
          },
        },
        required: ['category', 'type', 'issuer', 'pages', 'properties'],
        additionalProperties: false,
      },
    },
  },
  required: ['entity', 'documents'],
};
